import { waHref, type ShopInfo } from "../lib/store";
import { IconArrowRight, IconInfo } from "./icons";
import { Reveal, SectionHeading } from "./ui";

const STEPS = [
  {
    no: "01",
    judul: "Pilih & masukkan keranjang",
    isi: "Jelajahi rak katalog, tekan tombol “Keranjang”, lalu atur jumlahnya. Semua harga sudah jelas di depan.",
  },
  {
    no: "02",
    judul: "Kirim pesanan via WhatsApp",
    isi: "Isi nama & alamat, tekan “Pesan via WhatsApp”. Daftar pesananmu otomatis tersusun rapi di chat — tinggal kirim.",
  },
  {
    no: "03",
    judul: "Terima & bayar",
    isi: "Pilih COD (bayar di tempat) atau transfer. Pesanan diantar sesuai jam buka, sehangat mungkin.",
  },
];

export default function Guide({ shop }: { shop: ShopInfo }) {
  return (
    <section
      id="cara-pesan"
      className="relative scroll-mt-20 overflow-hidden border-y-[3px] border-ink bg-leaf-950 text-paper"
    >
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[22px] border-leaf-800" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Reveal>
          <SectionHeading dark kicker="Gampang banget" title={`Cara Pesan di ${shop.namaToko}`} />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 130}>
              <div className="relative">
                {i < STEPS.length - 1 && (
                  <IconArrowRight className="absolute -right-7 top-7 hidden h-6 w-6 text-sun-400 md:block" />
                )}
                <p
                  className="font-display text-6xl leading-none text-transparent"
                  style={{ WebkitTextStroke: "2px #ffc531" }}
                >
                  {s.no}
                </p>
                <h3 className="mt-3.5 font-display text-2xl">{s.judul}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-leaf-100/70">
                  {s.isi}
                </p>

                {i === 1 && (
                  <div className="mt-5 space-y-2">
                    <div className="ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm border border-leaf-500 bg-leaf-700 px-3.5 py-2 text-xs font-medium">
                      Kak, nasi geprek 2 ya — sambalnya level 3
                    </div>
                    <div className="w-fit max-w-[88%] rounded-xl rounded-bl-sm bg-white px-3.5 py-2 text-xs font-semibold text-ink">
                      Siap! Total Rp36.000, meluncur sebelum zuhur ya
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-xl border-2 border-leaf-700 bg-leaf-900 p-5 sm:flex-row sm:items-center sm:p-6">
            <IconInfo className="h-7 w-7 shrink-0 text-sun-400" />
            <p className="text-sm font-medium leading-relaxed text-leaf-100/85">
              Mau pesan untuk acara — tampah kue, nasi kotak, buah parsel? Kabari lewat
              WhatsApp minimal <b className="text-sun-400">H-2</b> supaya dapur dan kebun
              sempat menyiapkan yang paling segar.{" "}
              <a
                href={waHref(shop, `Halo ${shop.namaToko}! Saya mau pesan untuk acara.`)}
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-sun-400 underline decoration-2 underline-offset-4 transition-colors hover:text-sun-300"
              >
                Chat sekarang
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
