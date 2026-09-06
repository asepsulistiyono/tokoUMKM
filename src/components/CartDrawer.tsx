import { useEffect, useState, type FormEvent } from "react";
import { formatRupiah, type CartLine, type CheckoutForm, type ShopInfo } from "../lib/store";
import {
  IconBike,
  IconCart,
  IconClose,
  IconMinus,
  IconPlus,
  IconTrash,
  IconWhatsApp,
} from "./icons";
import { SmartImg } from "./ui";

export default function CartDrawer({
  open,
  onClose,
  lines,
  onSetQty,
  shop,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onSetQty: (id: string, qty: number) => void;
  shop: ShopInfo;
  onCheckout: (form: CheckoutForm) => void;
}) {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [metode, setMetode] = useState<CheckoutForm["metode"]>("COD");
  const [err, setErr] = useState("");

  const subtotal = lines.reduce((a, l) => a + l.qty * l.product.harga, 0);
  const itemCount = lines.reduce((a, l) => a + l.qty, 0);
  const minAntar = shop.gratisAntarMin;
  const free = minAntar > 0 && subtotal >= minAntar;
  const sisa = Math.max(0, minAntar - subtotal);
  const pct = minAntar > 0 ? Math.min(100, (subtotal / minAntar) * 100) : 100;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setErr("");
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !alamat.trim()) {
      setErr("Isi nama dan alamat dulu ya, biar kurir tidak nyasar.");
      return;
    }
    onCheckout({ nama: nama.trim(), alamat: alamat.trim(), catatan: catatan.trim(), metode });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-ink/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* HP: panel naik dari bawah · Layar besar: panel geser dari kanan */}
      <aside
        className={`fixed z-50 flex flex-col border-[3px] border-ink bg-paper transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
          inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[20px] border-b-0
          sm:inset-x-auto sm:bottom-0 sm:right-0 sm:top-0 sm:h-dvh sm:max-h-none sm:max-w-md sm:rounded-none sm:border-y-0 sm:border-r-0
          ${
            open
              ? "translate-y-0 sm:translate-x-0"
              : "translate-y-full sm:translate-y-0 sm:translate-x-full"
          }`}
        role="dialog"
        aria-label="Keranjang belanja"
      >
        {/* pegangan panel (HP) */}
        <div className="flex justify-center border-b-2 border-ink/10 py-2 sm:hidden">
          <span className="h-1.5 w-14 rounded-full bg-ink/20" />
        </div>

        <header className="flex h-14 shrink-0 items-center justify-between border-b-[3px] border-ink bg-sun-400 px-4 sm:h-16 sm:px-5">
          <h2 className="flex items-center gap-2.5 font-display text-lg sm:text-xl">
            Keranjang
            {itemCount > 0 && (
              <span className="rounded-full border-2 border-ink bg-white px-2 py-0.5 text-xs font-extrabold">
                {itemCount} item
              </span>
            )}
          </h2>
          <div className="flex items-center gap-3">
            {lines.length > 0 && (
              <p className="font-display text-base sm:text-lg">{formatRupiah(subtotal)}</p>
            )}
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-white shadow-hard-sm transition-transform hover:rotate-90"
              aria-label="Tutup keranjang"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>
        </header>

        {lines.length === 0 ? (
          <div className="grid min-h-0 flex-1 place-items-center overflow-y-auto p-8 text-center">
            <div>
              <IconCart className="mx-auto h-16 w-16 text-ink/15" />
              <p className="mt-4 font-display text-2xl">Masih kosong nih…</p>
              <p className="mx-auto mt-1.5 max-w-[240px] text-sm font-medium text-ink/55">
                Yuk isi dengan kue hangat dan sayur segar dari lapak.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl border-2 border-ink bg-leaf-600 px-6 py-3 text-sm font-extrabold text-paper shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-lg"
              >
                Mulai Belanja
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Daftar belanjaan — bagian ini yang di-scroll */}
            <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3 sm:p-4">
              {lines.map((l) => (
                <div
                  key={l.product.id}
                  className="flex items-center gap-2.5 rounded-xl border-2 border-ink bg-white p-2.5 shadow-hard-sm sm:gap-3 sm:p-3"
                >
                  <SmartImg
                    src={l.product.foto}
                    alt={l.product.nama}
                    className="h-14 w-14 shrink-0 rounded-lg border-2 border-ink object-cover sm:h-16 sm:w-16"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-extrabold sm:text-sm">
                      {l.product.nama}
                    </p>
                    <p className="text-[11px] font-semibold text-ink/50 sm:text-xs">
                      {formatRupiah(l.product.harga)} {l.product.satuan}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1">
                      <button
                        onClick={() => onSetQty(l.product.id, l.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-md border-2 border-ink bg-sprout transition-all hover:bg-sun-200 active:scale-90"
                        aria-label={`Kurangi ${l.product.nama}`}
                      >
                        <IconMinus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-extrabold">{l.qty}</span>
                      <button
                        onClick={() => onSetQty(l.product.id, l.qty + 1)}
                        disabled={l.qty >= l.product.stok}
                        className="grid h-7 w-7 place-items-center rounded-md border-2 border-ink bg-sprout transition-all hover:bg-sun-200 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Tambah ${l.product.nama}`}
                      >
                        <IconPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="text-[13px] font-extrabold sm:text-sm">
                      {formatRupiah(l.qty * l.product.harga)}
                    </p>
                    <button
                      onClick={() => onSetQty(l.product.id, 0)}
                      className="text-ink/35 transition-colors hover:text-chili-600"
                      aria-label={`Hapus ${l.product.nama}`}
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulir pesanan — menempel di bawah, tidak ikut hilang saat scroll */}
            <form
              onSubmit={submit}
              className="max-h-[52dvh] shrink-0 space-y-3 overflow-y-auto border-t-[3px] border-ink bg-white p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:max-h-none sm:space-y-3.5 sm:p-5"
            >
              {minAntar > 0 && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                    {free ? (
                      <span className="flex items-center gap-1.5 text-leaf-700">
                        <IconBike className="h-4 w-4" />
                        Gratis antar diterapkan!
                      </span>
                    ) : (
                      <span className="text-ink/60">
                        Tambah <b className="text-chili-600">{formatRupiah(sisa)}</b> lagi →
                        gratis antar
                      </span>
                    )}
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-sprout">
                    <div
                      className={`h-full transition-all duration-500 ${
                        free ? "bg-leaf-500" : "bg-sun-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Subtotal</p>
                  <p className="text-[11px] font-semibold text-ink/45">
                    ongkir dikonfirmasi via WA
                  </p>
                </div>
                <p className="font-display text-xl sm:text-2xl">{formatRupiah(subtotal)}</p>
              </div>

              <div className="grid gap-2">
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama kamu *"
                  className="w-full rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-sm font-semibold placeholder:text-ink/30 focus:border-leaf-600 focus:outline-none"
                />
                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat lengkap pengantaran *"
                  rows={2}
                  className="w-full resize-none rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-sm font-semibold placeholder:text-ink/30 focus:border-leaf-600 focus:outline-none"
                />
                <input
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Catatan (opsional) — mis. sambal dipisah"
                  className="w-full rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-sm font-semibold placeholder:text-ink/30 focus:border-leaf-600 focus:outline-none"
                />
                <div className="flex gap-2">
                  {(["COD", "Transfer"] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMetode(m)}
                      className={`flex-1 rounded-xl border-2 border-ink py-2.5 text-sm font-extrabold transition-all ${
                        metode === m
                          ? "bg-leaf-600 text-paper shadow-hard-sm"
                          : "bg-white hover:bg-sprout"
                      }`}
                    >
                      {m === "COD" ? "COD (di tempat)" : "Transfer"}
                    </button>
                  ))}
                </div>
              </div>

              {err && (
                <p className="text-xs font-bold text-chili-600" role="alert">
                  {err}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-ink bg-chili-500 py-3.5 font-extrabold text-paper shadow-hard transition-all hover:-translate-y-0.5 hover:bg-chili-600 hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-sm"
              >
                <IconWhatsApp className="h-5 w-5" />
                Pesan via WhatsApp
              </button>
            </form>
          </>
        )}
      </aside>
    </>
  );
}
