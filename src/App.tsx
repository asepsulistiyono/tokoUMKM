import { useCallback, useEffect, useMemo, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Guide from "./components/Guide";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { IconCheck } from "./components/icons";
import OwnerPanel from "./components/OwnerPanel";
import {
  buildOrderMessage,
  DEMO_PRODUCTS,
  DEMO_SHOP,
  fetchProductsFromSheet,
  fetchShopFromSheet,
  loadJSON,
  saveJSON,
  waHref,
  type CartLine,
  type CheckoutForm,
  type Product,
  type SheetConfig,
  type ShopInfo,
} from "./lib/store";

export default function App() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [shop, setShop] = useState<ShopInfo>(DEMO_SHOP);
  const [source, setSource] = useState<"demo" | "sheet">("demo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cfg, setCfg] = useState<SheetConfig | null>(() =>
    loadJSON<SheetConfig | null>("lapak.sheetCfg", null)
  );
  const [cart, setCart] = useState<Record<string, number>>(() =>
    loadJSON<Record<string, number>>("lapak.cart", {})
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast({ id: Date.now(), msg });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => saveJSON("lapak.cart", cart), [cart]);

  /* ---------- sambungkan Google Sheets ---------- */
  const connect = useCallback(
    async (c: SheetConfig) => {
      if (!c.produkUrl.trim()) {
        setError("Tempel dulu link Google Sheet tab Produk di kolom atas.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const prods = await fetchProductsFromSheet(c.produkUrl);
        let mergedShop: ShopInfo = DEMO_SHOP;
        if (c.tokoUrl.trim()) {
          try {
            const extra = await fetchShopFromSheet(c.tokoUrl);
            mergedShop = { ...DEMO_SHOP, ...extra };
          } catch {
            /* identitas tetap pakai bawaan */
          }
        }
        setProducts(prods);
        setShop(mergedShop);
        setSource("sheet");
        setCfg(c);
        saveJSON("lapak.sheetCfg", c);
        setCart((prev) => {
          const next: Record<string, number> = {};
          for (const k of Object.keys(prev)) {
            if (prods.some((p) => p.id === k)) next[k] = prev[k];
          }
          return next;
        });
        showToast(`Terhubung! ${prods.length} produk dimuat dari Google Sheets.`);
      } catch (e) {
        setSource("demo");
        setProducts(DEMO_PRODUCTS);
        setShop(DEMO_SHOP);
        setError(e instanceof Error ? e.message : "Gagal memuat Google Sheet.");
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  const resetDemo = useCallback(() => {
    setCfg(null);
    saveJSON("lapak.sheetCfg", null);
    setProducts(DEMO_PRODUCTS);
    setShop(DEMO_SHOP);
    setSource("demo");
    setError(null);
    showToast("Kembali ke data contoh.");
  }, [showToast]);

  /* Sambung otomatis bila pernah tersimpan */
  useEffect(() => {
    if (cfg?.produkUrl) void connect(cfg);
    // hanya saat aplikasi pertama dibuka
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- keranjang ---------- */
  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart, products]
  );

  const cartCount = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.qty * l.product.harga, 0);
  const freeDelivery = shop.gratisAntarMin > 0 && subtotal >= shop.gratisAntarMin;

  const mulaiDari = useMemo(
    () =>
      products.reduce(
        (m, p) => (p.stok > 0 && p.harga > 0 ? Math.min(m, p.harga) : m),
        Number.POSITIVE_INFINITY
      ),
    [products]
  );

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => ({ ...prev, [p.id]: Math.min(p.stok, (prev[p.id] ?? 0) + 1) }));
    showToast(`${p.nama} masuk keranjang`);
  }, [showToast]);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else {
        const prod = products.find((p) => p.id === id);
        next[id] = Math.min(qty, prod?.stok ?? qty);
      }
      return next;
    });
  }, [products]);

  const handleCheckout = useCallback(
    (form: CheckoutForm) => {
      if (lines.length === 0) return;
      const msg = buildOrderMessage(shop, lines, form, subtotal, freeDelivery);
      window.open(waHref(shop, msg), "_blank", "noopener");
      setDrawerOpen(false);
      showToast("Pesanan siap — tekan kirim di WhatsApp ya!");
    },
    [lines, shop, subtotal, freeDelivery, showToast]
  );

  const scrollToKatalog = useCallback(() => {
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Header shop={shop} cartCount={cartCount} onOpenCart={() => setDrawerOpen(true)} />

      <main>
        <Hero
          shop={shop}
          productCount={products.length}
          mulaiDari={mulaiDari}
          onShop={scrollToKatalog}
        />
        <Catalog products={products} cart={cart} onAdd={addToCart} onSetQty={setQty} />
        <Guide shop={shop} />
        <OwnerPanel
          cfg={cfg}
          source={source}
          loading={loading}
          error={error}
          productCount={products.length}
          onConnect={(c) => void connect(c)}
          onReset={resetDemo}
          onToast={showToast}
        />
      </main>

      <Footer shop={shop} />

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lines={lines}
        onSetQty={setQty}
        shop={shop}
        onCheckout={handleCheckout}
      />

      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-6 left-1/2 z-[80] flex animate-rise items-center gap-2.5 rounded-full border-2 border-sun-400 bg-ink py-2 pl-2.5 pr-5 text-sm font-bold text-paper shadow-hard"
          role="status"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf-500">
            <IconCheck className="h-3.5 w-3.5 text-paper" />
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
