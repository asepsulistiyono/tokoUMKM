import { useMemo, useState } from "react";
import { formatRupiah, type Product } from "../lib/store";
import { IconMinus, IconPlus, IconSearch } from "./icons";
import { Reveal, SectionHeading, SmartImg } from "./ui";

type SortMode = "unggul" | "murah" | "mahal" | "nama";

export default function Catalog({
  products,
  cart,
  onAdd,
  onSetQty,
}: {
  products: Product[];
  cart: Record<string, number>;
  onAdd: (p: Product) => void;
  onSetQty: (id: string, qty: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [sort, setSort] = useState<SortMode>("unggul");

  const kategoris = useMemo(
    () => ["Semua", ...Array.from(new Set(products.map((p) => p.kategori)))],
    [products]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (kategori === "Semua" || p.kategori === kategori) &&
        (q === "" ||
          p.nama.toLowerCase().includes(q) ||
          p.kategori.toLowerCase().includes(q) ||
          (p.deskripsi ?? "").toLowerCase().includes(q))
    );
    if (sort === "murah") list = [...list].sort((a, b) => a.harga - b.harga);
    if (sort === "mahal") list = [...list].sort((a, b) => b.harga - a.harga);
    if (sort === "nama")
      list = [...list].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    return list;
  }, [products, query, kategori, sort]);

  return (
    <section id="katalog" className="relative scroll-mt-20 border-y-[3px] border-ink bg-sprout">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Katalog hari ini" title="Stok Lapak Pagi Ini" />
          <p className="pb-1 text-sm font-bold text-ink/55">
            Menampilkan {filtered.length} dari {products.length} produk
          </p>
        </Reveal>

        {/* Bilah alat: cari + kategori + urutkan */}
        <Reveal delay={90}>
          <div className="mt-9 flex flex-col gap-3 rounded-xl border-2 border-ink bg-paper p-3 shadow-hard sm:p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kue, sayur, lauk…"
                className="w-full rounded-full border-2 border-ink bg-white py-2.5 pl-11 pr-4 text-sm font-semibold placeholder:text-ink/30 transition-colors focus:border-chili-500 focus:outline-none"
                aria-label="Cari produk"
              />
            </div>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 lg:mx-0 lg:px-0">
              {kategoris.map((k) => (
                <button
                  key={k}
                  onClick={() => setKategori(k)}
                  className={`whitespace-nowrap rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-all ${
                    kategori === k
                      ? "-translate-y-0.5 bg-ink text-paper shadow-hard-sm"
                      : "bg-white hover:bg-sun-100"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="cursor-pointer rounded-full border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold focus:border-chili-500 focus:outline-none"
              aria-label="Urutkan produk"
            >
              <option value="unggul">Unggulan dulu</option>
              <option value="murah">Harga terendah</option>
              <option value="mahal">Harga tertinggi</option>
              <option value="nama">Nama A–Z</option>
            </select>
          </div>
        </Reveal>

        {/* Rak produk */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 6) * 55}>
              <ProductCard
                product={p}
                qty={cart[p.id] ?? 0}
                onAdd={() => onAdd(p)}
                onSetQty={(q) => onSetQty(p.id, q)}
              />
            </Reveal>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <IconSearch className="mx-auto h-12 w-12 text-ink/20" />
              <p className="mt-4 font-display text-2xl">Waduh, tidak ketemu…</p>
              <p className="mt-1 text-sm font-medium text-ink/55">
                Coba kata kunci lain, atau reset filternya.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setKategori("Semua");
                }}
                className="mt-5 rounded-full border-2 border-ink bg-ink px-5 py-2 text-sm font-bold text-paper shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-chili-600"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product: p,
  qty,
  onAdd,
  onSetQty,
}: {
  product: Product;
  qty: number;
  onAdd: () => void;
  onSetQty: (qty: number) => void;
}) {
  const habis = p.stok <= 0;
  const sisaTipis = !habis && p.stok <= 5;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border-2 border-ink bg-white shadow-hard transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hard-lg">
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
        <SmartImg
          src={p.foto}
          alt={p.nama}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06] ${
            habis ? "opacity-60 grayscale" : ""
          }`}
        />
        {p.badge && !habis && (
          <span className="absolute left-3 top-3 -rotate-6 rounded-md border-2 border-ink bg-sun-400 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider shadow-hard-sm transition-transform duration-300 group-hover:rotate-0">
            {p.badge}
          </span>
        )}
        {habis && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="-rotate-6 rounded-full border-2 border-paper bg-ink px-4 py-1.5 font-display text-sm tracking-[0.2em] text-paper">
              HABIS
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-leaf-600">
          {p.kategori}
        </p>
        <h3 className="font-display text-lg leading-tight">{p.nama}</h3>
        {p.deskripsi && (
          <p className="line-clamp-2 flex-1 text-[13px] font-medium leading-snug text-ink/60">
            {p.deskripsi}
          </p>
        )}

        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-lg leading-none">
              {formatRupiah(p.harga)}
            </span>
            <span className="text-xs font-semibold text-ink/45">{p.satuan}</span>
          </p>
          {sisaTipis && (
            <span className="text-[11px] font-extrabold text-chili-600">
              Sisa {p.stok}!
            </span>
          )}
        </div>

        <div className="mt-3">
          {habis ? (
            <div className="rounded-xl border-2 border-dashed border-ink/25 py-2.5 text-center text-[13px] font-bold text-ink/40">
              Stok habis — cek lagi besok ya
            </div>
          ) : qty === 0 ? (
            <button
              onClick={onAdd}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink bg-leaf-600 py-2.5 text-sm font-extrabold text-paper shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none"
            >
              <IconPlus className="h-4 w-4" />
              Keranjang
            </button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-xl border-2 border-ink bg-sun-100 shadow-hard-sm">
              <button
                onClick={() => onSetQty(qty - 1)}
                className="grid h-10 w-11 place-items-center transition-all hover:bg-sun-200 active:scale-90"
                aria-label={`Kurangi ${p.nama}`}
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span key={qty} className="animate-pop text-sm font-extrabold">
                {qty} di keranjang
              </span>
              <button
                onClick={() => onSetQty(qty + 1)}
                disabled={qty >= p.stok}
                className="grid h-10 w-11 place-items-center transition-all hover:bg-sun-200 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Tambah ${p.nama}`}
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
