import { useState } from "react";
import {
  copyToClipboard,
  TEMPLATE_PRODUK_CSV,
  TEMPLATE_TOKO_CSV,
  type SheetConfig,
} from "../lib/store";
import {
  IconAlert,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconExternal,
  IconLink,
  IconPencil,
  IconRefresh,
} from "./icons";
import { Reveal } from "./ui";

const KOLOM_PRODUK = ["nama", "kategori", "harga", "satuan", "stok", "badge", "deskripsi", "foto"];
const KOLOM_TOKO = [
  "nama_toko",
  "tagline",
  "whatsapp",
  "alamat",
  "jam_buka",
  "gratis_antar_min",
  "pengumuman",
];

export default function OwnerPanel({
  cfg,
  source,
  loading,
  error,
  productCount,
  onConnect,
  onReset,
  onToast,
}: {
  cfg: SheetConfig | null;
  source: "demo" | "sheet";
  loading: boolean;
  error: string | null;
  productCount: number;
  onConnect: (cfg: SheetConfig) => void;
  onReset: () => void;
  onToast: (msg: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const [produkUrl, setProdukUrl] = useState(cfg?.produkUrl ?? "");
  const [tokoUrl, setTokoUrl] = useState(cfg?.tokoUrl ?? "");
  const [copied, setCopied] = useState<"" | "produk" | "toko">("");

  const copy = async (which: "produk" | "toko") => {
    const ok = await copyToClipboard(which === "produk" ? TEMPLATE_PRODUK_CSV : TEMPLATE_TOKO_CSV);
    if (ok) {
      setCopied(which);
      onToast(
        which === "produk"
          ? "Template produk disalin — tempel di Google Sheets!"
          : "Template tab Toko disalin!"
      );
      setTimeout(() => setCopied(""), 2200);
    } else {
      onToast("Gagal menyalin — salin manual dari panduan ya.");
    }
  };

  const chip =
    source === "sheet" ? (
      <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-leaf-100 px-3 py-1 text-xs font-extrabold text-leaf-800">
        <span className="h-2 w-2 animate-blink rounded-full bg-leaf-500" />
        Terhubung · {productCount} produk
      </span>
    ) : (
      <span className="rounded-full border-2 border-ink bg-sprout px-3 py-1 text-xs font-extrabold text-ink/70">
        Mode data contoh
      </span>
    );

  return (
    <section id="pemilik" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-[20px] border-[3px] border-dashed border-ink bg-white shadow-hard">
            {/* Kepala panel */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={open}
            >
              <span className="flex items-center gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun-400 shadow-hard-sm">
                  <IconPencil className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-xl leading-tight sm:text-2xl">
                    Mode Pemilik — Edit Produk lewat HP
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-ink/55">
                    Sambungkan Google Sheets; begitu disimpan, etalase ini ikut berubah.
                  </span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden sm:block">{chip}</span>
                <IconChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {open && (
              <div className="grid border-t-[3px] border-dashed border-ink lg:grid-cols-2">
                {/* ----- Kiri: sambungkan sheet ----- */}
                <div className="space-y-4 p-5 sm:p-6">
                  <h3 className="flex items-center gap-2.5 font-extrabold">
                    <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-ink text-sm text-paper">
                      1
                    </span>
                    Sambungkan Google Sheet-mu
                  </h3>

                  <div className="grid gap-3">
                    <label className="grid gap-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                        Link Google Sheet — tab Produk
                      </span>
                      <input
                        value={produkUrl}
                        onChange={(e) => setProdukUrl(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/…"
                        className="w-full rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-semibold placeholder:text-ink/25 focus:border-leaf-600 focus:outline-none"
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                        Link tab Toko — opsional (nama toko, WA, pengumuman)
                      </span>
                      <input
                        value={tokoUrl}
                        onChange={(e) => setTokoUrl(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/…#gid=12345"
                        className="w-full rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-semibold placeholder:text-ink/25 focus:border-leaf-600 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="rounded-xl border-2 border-ink bg-sun-100 p-3.5 text-[13px] font-medium leading-relaxed">
                    <b>Cara dari HP:</b> buka Google Sheets → tombol{" "}
                    <b>Bagikan</b> → ubah jadi{" "}
                    <b>“Siapa saja yang memiliki link”</b> → <b>Salin link</b> → tempel di
                    atas → tekan Sambungkan.
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => onConnect({ produkUrl, tokoUrl })}
                      disabled={loading}
                      className="flex items-center gap-2 rounded-xl border-2 border-ink bg-leaf-600 px-5 py-2.5 text-sm font-extrabold text-paper shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
                          Memuat…
                        </>
                      ) : (
                        <>
                          <IconLink className="h-4 w-4" />
                          Sambungkan &amp; Muat
                        </>
                      )}
                    </button>
                    {source === "sheet" && (
                      <>
                        <button
                          onClick={() => onConnect({ produkUrl, tokoUrl })}
                          disabled={loading}
                          className="flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-sm font-extrabold shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-sprout disabled:opacity-60"
                        >
                          <IconRefresh className="h-4 w-4" />
                          Muat Ulang
                        </button>
                        <button
                          onClick={onReset}
                          className="rounded-xl border-2 border-transparent px-4 py-2.5 text-sm font-bold text-ink/50 underline decoration-2 underline-offset-4 transition-colors hover:text-chili-600"
                        >
                          Kembali ke data contoh
                        </button>
                      </>
                    )}
                  </div>

                  {loading && (
                    <p className="flex items-center gap-2 text-sm font-bold text-leaf-700">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-leaf-300 border-t-leaf-700" />
                      Mengambil data terbaru dari Google Sheet…
                    </p>
                  )}
                  {error && !loading && (
                    <div className="flex items-start gap-2.5 rounded-xl border-2 border-chili-500 bg-chili-50 p-3.5 text-[13px] font-semibold leading-relaxed text-chili-700">
                      <IconAlert className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  {source === "sheet" && !error && !loading && (
                    <p className="flex items-center gap-2 text-sm font-bold text-leaf-700">
                      <IconCheck className="h-4 w-4" />
                      Terhubung! Etalase menampilkan isi Google Sheet-mu.
                    </p>
                  )}
                </div>

                {/* ----- Kanan: format kolom & template ----- */}
                <div className="space-y-4 border-t-[3px] border-dashed border-ink bg-leaf-50 p-5 sm:p-6 lg:border-l-[3px] lg:border-t-0">
                  <h3 className="flex items-center gap-2.5 font-extrabold">
                    <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-ink text-sm text-paper">
                      2
                    </span>
                    Atur format di Sheet
                  </h3>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                      Kolom tab Produk — baris 1 adalah judul ini:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {KOLOM_PRODUK.map((k) => (
                        <code
                          key={k}
                          className="rounded-md border-2 border-ink bg-white px-2 py-0.5 text-xs font-extrabold"
                        >
                          {k}
                        </code>
                      ))}
                    </div>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-ink/55">
                      Baris berikutnya = produkmu. <b>harga</b> cukup angka,{" "}
                      <b>stok</b> 0 berarti habis, <b>badge</b> mis. “Best Seller”,{" "}
                      <b>foto</b> boleh kosong (kartu tetap cantik).
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                      Tab Toko — dua kolom: kunci &amp; nilai
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {KOLOM_TOKO.map((k) => (
                        <code
                          key={k}
                          className="rounded-md border-2 border-ink bg-white px-2 py-0.5 text-xs font-extrabold"
                        >
                          {k}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2.5">
                    <button
                      onClick={() => copy("produk")}
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-sun-400 py-2.5 text-sm font-extrabold shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5"
                    >
                      {copied === "produk" ? (
                        <>
                          <IconCheck className="h-4 w-4" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <IconCopy className="h-4 w-4" /> Salin Template — Tab Produk
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copy("toko")}
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-white py-2.5 text-sm font-extrabold shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-sun-100 hover:shadow-hard active:translate-y-0.5"
                    >
                      {copied === "toko" ? (
                        <>
                          <IconCheck className="h-4 w-4" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <IconCopy className="h-4 w-4" /> Salin Template — Tab Toko
                        </>
                      )}
                    </button>
                    <a
                      href="https://sheets.new"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-white py-2.5 text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-sprout"
                    >
                      <IconExternal className="h-4 w-4" />
                      Buat Google Sheet Baru
                    </a>
                  </div>

                  <p className="text-xs font-medium leading-relaxed text-ink/55">
                    <b>Soal foto:</b> pakai link gambar langsung (berakhiran .jpg/.png) —
                    bisa unggah gratis ke postimages.org lalu salin “direct link”-nya ke
                    kolom foto.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
