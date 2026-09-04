import { openStatus, type ShopInfo } from "../lib/store";
import { IconBasket, IconCart, IconLeaf } from "./icons";

export default function Header({
  shop,
  cartCount,
  onOpenCart,
}: {
  shop: ShopInfo;
  cartCount: number;
  onOpenCart: () => void;
}) {
  const status = openStatus(shop.jamBuka);
  const tickerItems = [...shop.pengumuman, ...shop.pengumuman];

  return (
    <>
      {/* ===== Teks berjalan ala spanduk lapak ===== */}
      <div className="marquee-hover overflow-hidden border-b-2 border-ink bg-sun-400">
        <div className="flex w-max animate-marquee items-center">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap px-5 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-ink"
            >
              <IconLeaf className="h-3.5 w-3.5 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ===== Header lengket ===== */}
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <a href="#" className="flex items-center gap-2.5" aria-label={shop.namaToko}>
            <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-leaf-600 text-paper shadow-hard-sm transition-transform hover:-rotate-6">
              <IconBasket className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-wide">
                {shop.namaToko}
              </span>
              <span className="mt-0.5 hidden text-[11px] font-bold text-ink/50 sm:block">
                {status.open ? "Buka sekarang" : "Sedang tutup"} · pesan via WhatsApp
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-bold lg:flex">
            <a href="#katalog" className="transition-colors hover:text-chili-600">
              Katalog
            </a>
            <a href="#cara-pesan" className="transition-colors hover:text-chili-600">
              Cara Pesan
            </a>
            <a href="#pemilik" className="transition-colors hover:text-chili-600">
              Mode Pemilik
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span
              className={`hidden items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-extrabold md:flex ${
                status.open ? "" : "text-chili-600"
              }`}
            >
              <span
                className={`h-2 w-2 animate-blink rounded-full ${
                  status.open ? "bg-leaf-500" : "bg-chili-500"
                }`}
              />
              {status.label}
            </span>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 rounded-xl border-2 border-ink bg-leaf-600 px-4 py-2 text-sm font-extrabold text-paper shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-sm"
            >
              <IconCart className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -right-2 -top-2 grid h-6 w-6 animate-pop place-items-center rounded-full border-2 border-ink bg-sun-400 text-[11px] font-extrabold text-ink"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
