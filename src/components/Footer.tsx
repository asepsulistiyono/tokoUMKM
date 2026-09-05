import { waHref, type ShopInfo } from "../lib/store";
import { IconBasket, IconClock, IconPin, IconWhatsApp } from "./icons";

export default function Footer({ shop }: { shop: ShopInfo }) {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-leaf-950 text-paper">
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-leaf-700 bg-leaf-600">
                <IconBasket className="h-5 w-5 text-paper" />
              </span>
              <p className="font-display text-2xl text-sun-400">{shop.namaToko}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-leaf-100/65">
              {shop.tagline}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-sun-400">
              Jam &amp; Lokasi
            </p>
            <ul className="mt-4 space-y-3 text-sm font-medium text-leaf-100/80">
              <li className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sun-400" />
                Setiap hari · {shop.jamBuka} WIB
              </li>
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sun-400" />
                {shop.alamat}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-sun-400">
              Pesan &amp; Tanya
            </p>
            <p className="mt-4 text-sm font-medium text-leaf-100/65">
              Paling cepat dibalas saat jam buka.
            </p>
            <a
              href={waHref(shop, `Halo ${shop.namaToko}!`)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-max items-center gap-2.5 rounded-xl border-2 border-leaf-700 bg-leaf-600 px-5 py-2.5 text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-leaf-500"
            >
              <IconWhatsApp className="h-4.5 w-4.5" />
              Chat WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-leaf-800 pt-6 text-xs font-semibold text-leaf-100/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {shop.namaToko} — UMKM Indonesia naik kelas.
          </p>
          <p>Katalog tersinkron Google Sheets · Pesanan masuk via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
