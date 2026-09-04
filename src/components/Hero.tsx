import type { CSSProperties } from "react";
import {
  formatRupiah,
  HERO_IMAGES,
  openStatus,
  waHref,
  type ShopInfo,
} from "../lib/store";
import {
  IconArrowDown,
  IconBasket,
  IconBike,
  IconClock,
  IconLeaf,
  IconPin,
  IconWhatsApp,
} from "./icons";
import { SmartImg } from "./ui";

export default function Hero({
  shop,
  productCount,
  mulaiDari,
  onShop,
}: {
  shop: ShopInfo;
  productCount: number;
  mulaiDari: number;
  onShop: () => void;
}) {
  const status = openStatus(shop.jamBuka);

  return (
    <section className="relative overflow-hidden">
      {/* Latar ambient: bintik + lingkaran pasar */}
      <div className="bg-dots pointer-events-none absolute right-0 top-0 h-[430px] w-[430px] opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-leaf-100" />
      <div className="pointer-events-none absolute -bottom-24 right-[-6rem] h-72 w-72 rounded-full bg-sun-200/70" />
      <svg
        className="pointer-events-none absolute left-[46%] top-8 hidden w-40 text-chili-500/70 lg:block"
        viewBox="0 0 160 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12 Q 14 2 26 12 T 50 12 T 74 12 T 98 12 T 122 12 T 146 12 T 158 12"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 lg:grid-cols-12 lg:pb-28 lg:pt-16">
        {/* -------- Kiri: kata-kata lapak -------- */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-xs font-extrabold shadow-hard-sm ${
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
            <span className="rounded-full border-2 border-ink bg-sprout px-3.5 py-1.5 text-xs font-extrabold">
              {productCount} macam produk hari ini
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.7rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
            Segar dari dapur &amp; kebun,{" "}
            <span className="relative -mx-1 inline-block -rotate-1 border-2 border-ink bg-sun-400 px-2 shadow-hard-sm">
              meluncur
            </span>{" "}
            ke rumahmu hari ini juga.
          </h1>

          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-ink/70">
            {shop.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onShop}
              className="flex items-center gap-2.5 rounded-xl border-2 border-ink bg-leaf-600 px-6 py-3.5 font-extrabold text-paper shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-sm"
            >
              <IconBasket className="h-5 w-5" />
              Mulai Belanja
              <IconArrowDown className="h-4 w-4" />
            </button>
            <a
              href={waHref(shop, `Halo ${shop.namaToko}! Saya mau tanya soal pesanan.`)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-xl border-2 border-ink bg-white px-6 py-3.5 font-extrabold shadow-hard transition-all hover:-translate-y-1 hover:bg-leaf-50 hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-sm"
            >
              <IconWhatsApp className="h-5 w-5 text-leaf-600" />
              Tanya via WhatsApp
            </a>
          </div>

          {/* Info lapak: satu strip, bukan kartu-kartuan */}
          <div className="mt-10 flex flex-col divide-y-2 divide-ink overflow-hidden rounded-xl border-2 border-ink bg-white shadow-hard sm:flex-row sm:divide-x-2 sm:divide-y-0">
            {[
              { icon: IconClock, label: "Jam buka", value: `${shop.jamBuka} WIB` },
              { icon: IconPin, label: "Alamat lapak", value: shop.alamat },
              {
                icon: IconBike,
                label: "Gratis antar",
                value: `min. ${formatRupiah(shop.gratisAntarMin)}`,
              },
            ].map((it) => (
              <div key={it.label} className="flex flex-1 items-center gap-3 px-5 py-3.5">
                <it.icon className="h-5 w-5 shrink-0 text-leaf-600" />
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/45">
                    {it.label}
                  </p>
                  <p className="truncate text-sm font-bold">{it.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------- Kanan: kolase foto ala kartu pos -------- */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5">
          <div
            className="animate-floaty"
            style={{ "--rot": "2deg" } as CSSProperties}
          >
            <SmartImg
              src={HERO_IMAGES.geprek}
              alt="Nasi ayam geprek sambal bawang"
              className="aspect-square w-full rotate-2 rounded-[20px] border-[3px] border-ink object-cover shadow-hard-lg"
            />
            <span className="absolute bottom-4 left-4 -rotate-2 rounded-lg border-2 border-ink bg-white px-3 py-1.5 text-[11px] font-extrabold shadow-hard-sm">
              Mulai{" "}
              <span className="text-chili-600">
                {Number.isFinite(mulaiDari) ? formatRupiah(mulaiDari) : "Rp0"}
              </span>
            </span>
          </div>

          <div
            className="animate-floaty absolute -left-6 -top-9 w-36 sm:-left-10 sm:w-44"
            style={{ "--rot": "-8deg", animationDelay: "0.7s" } as CSSProperties}
          >
            <SmartImg
              src={HERO_IMAGES.talam}
              alt="Kue talam pandan"
              className="aspect-square w-full -rotate-[8deg] rounded-2xl border-[3px] border-ink object-cover shadow-hard"
            />
            <span className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 border border-ink/20 bg-sun-400/90" />
          </div>

          <div
            className="animate-floaty absolute -bottom-8 -right-4 w-32 sm:-right-8 sm:w-40"
            style={{ "--rot": "7deg", animationDelay: "1.4s" } as CSSProperties}
          >
            <SmartImg
              src={HERO_IMAGES.jeruk}
              alt="Jeruk medan manis"
              className="aspect-square w-full rotate-[7deg] rounded-[16px] border-[3px] border-ink object-cover shadow-hard"
            />
            <span className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-6 border border-ink/20 bg-chili-100/95" />
          </div>

          {/* Stiker berputar */}
          <div className="absolute -top-10 right-0 z-10 h-28 w-28 sm:-right-6">
            <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
              <defs>
                <path
                  id="circ"
                  d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                  fill="none"
                />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#ffc531" stroke="#1c2a21" strokeWidth="2.5" />
              <circle cx="60" cy="60" r="30" fill="#fbfdf4" stroke="#1c2a21" strokeWidth="2.5" />
              <text fontSize="11.5" fontWeight="800" letterSpacing="2.6" fill="#1c2a21">
                <textPath href="#circ">SEGAR · HALAL · HOMEMADE ·</textPath>
              </text>
            </svg>
            <IconLeaf className="absolute inset-0 m-auto h-8 w-8 text-leaf-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
