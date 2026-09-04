/* ============================================================
   LAPAK — lapisan data toko online UMKM
   Sumber data: Google Sheets (CSV via gviz) atau data contoh.
   ============================================================ */

export interface Product {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  satuan: string;
  stok: number;
  badge?: string;
  deskripsi?: string;
  foto?: string;
}

export interface ShopInfo {
  namaToko: string;
  tagline: string;
  whatsapp: string;
  alamat: string;
  jamBuka: string;
  pengumuman: string[];
  gratisAntarMin: number;
}

export interface CartLine {
  product: Product;
  qty: number;
}

export interface CheckoutForm {
  nama: string;
  alamat: string;
  catatan: string;
  metode: "COD" | "Transfer";
}

export interface SheetConfig {
  produkUrl: string;
  tokoUrl: string;
}

/* ---------------- foto contoh ---------------- */
const IMG = {
  talam:
    "https://image.qwenlm.ai/generated-images/64d800df-ce00-4b6c-b588-52073bbdb25e/_result.png",
  donat:
    "https://image.qwenlm.ai/generated-images/7d3237a0-fc22-4864-87fa-821555b88ffe/_result.png",
  jeruk:
    "https://image.qwenlm.ai/generated-images/7c96dad4-e519-4fcd-9256-889d2b43ded6/_result.png",
  pisang:
    "https://image.qwenlm.ai/generated-images/63cda3f8-d30b-4ce0-857c-402928039240/_result.png",
  sayurSop:
    "https://image.qwenlm.ai/generated-images/5c1ca2d6-c27f-48d5-880b-408e0369c5c8/_result.png",
  kangkung:
    "https://image.qwenlm.ai/generated-images/549cd1d0-ded8-45a4-84a7-ce1c80a01874/_result.png",
  geprek:
    "https://image.qwenlm.ai/generated-images/29094d88-c113-400c-bbe6-ecdf2b020e56/_result.png",
  gado:
    "https://image.qwenlm.ai/generated-images/f3d64d53-9baf-4786-9458-ab3f8ad9121f/_result.png",
};

export const HERO_IMAGES = { geprek: IMG.geprek, talam: IMG.talam, jeruk: IMG.jeruk };

/* ---------------- data contoh ---------------- */
export const DEMO_SHOP: ShopInfo = {
  namaToko: "Lapak Bu Sari",
  tagline:
    "Kue subuh, buah & sayur segar, lauk rumahan — pesan pagi ini, sampai sebelum makan siang.",
  whatsapp: "6281234567890",
  alamat: "Jl. Melati No. 12, Sleman, Yogyakarta",
  jamBuka: "06.00–21.00",
  pengumuman: [
    "Buka setiap hari 06.00–21.00 WIB",
    "Gratis antar min. belanja Rp50.000 (radius 5 km)",
    "Terima pesanan tampah & nasi kotak untuk acara — H-2 ya!",
    "Pesan lewat WhatsApp, bisa bayar di tempat (COD)",
  ],
  gratisAntarMin: 50000,
};

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "kue-talam-pandan",
    nama: "Kue Talam Pandan",
    kategori: "Kue & Jajanan",
    harga: 5000,
    satuan: "per potong",
    stok: 24,
    badge: "Best Seller",
    deskripsi: "Dikukus subuh, lapisan pandan wangi di atas santan gurih. Lembut banget.",
    foto: IMG.talam,
  },
  {
    id: "donat-kampung",
    nama: "Donat Kampung Gula",
    kategori: "Kue & Jajanan",
    harga: 3500,
    satuan: "per pcs",
    stok: 30,
    badge: "Baru",
    deskripsi: "Empuk kentang asli, taburan gula halus. Ada topping cokelat juga.",
    foto: IMG.donat,
  },
  {
    id: "jeruk-medan",
    nama: "Jeruk Medan Manis",
    kategori: "Buah Segar",
    harga: 26000,
    satuan: "per kg",
    stok: 18,
    badge: "Manis!",
    deskripsi: "Panen minggu ini, manis berair. Cocok untuk jus atau buah meja.",
    foto: IMG.jeruk,
  },
  {
    id: "pisang-cavendish",
    nama: "Pisang Cavendish",
    kategori: "Buah Segar",
    harga: 18500,
    satuan: "per sisir",
    stok: 12,
    deskripsi: "Matang pas, manis tanpa semprotan. Sisir besar isi 12–14 buah.",
    foto: IMG.pisang,
  },
  {
    id: "paket-sayur-sop",
    nama: "Paket Sayur Sop",
    kategori: "Sayur Segar",
    harga: 15000,
    satuan: "per paket",
    stok: 15,
    badge: "Hemat",
    deskripsi: "Wortel, buncis, kentang, kol, seledri + bumbu. Tinggal cemplung!",
    foto: IMG.sayurSop,
  },
  {
    id: "kangkung-bayam",
    nama: "Kangkung & Bayam Ikat",
    kategori: "Sayur Segar",
    harga: 4000,
    satuan: "per ikat",
    stok: 0,
    deskripsi: "Petik pagi dari kebun sendiri. Stok besok pagi ya, sudah dipesan tetangga.",
    foto: IMG.kangkung,
  },
  {
    id: "nasi-ayam-geprek",
    nama: "Nasi Ayam Geprek",
    kategori: "Makanan",
    harga: 18000,
    satuan: "per porsi",
    stok: 25,
    badge: "Favorit",
    deskripsi: "Ayam kriuk digeprek sambal bawang level 1–5. Nasi hangat + lalapan.",
    foto: IMG.geprek,
  },
  {
    id: "gado-gado-siram",
    nama: "Gado-Gado Siram",
    kategori: "Makanan",
    harga: 15000,
    satuan: "per porsi",
    stok: 20,
    deskripsi: "Sayur rebus, lontong, telur, bumbu kacang ulek dadakan. Plus kerupuk.",
    foto: IMG.gado,
  },
];

/* ---------------- template Google Sheets ---------------- */
export const TEMPLATE_PRODUK_CSV = `nama,kategori,harga,satuan,stok,badge,deskripsi,foto
Kue Talam Pandan,Kue & Jajanan,5000,per potong,25,Best Seller,Lembut gurih santan & pandan asli,
Pisang Goreng Crispy,Kue & Jajanan,2500,per pcs,40,,Renyah di luar lembut di dalam,
Jeruk Medan Manis,Buah Segar,26000,per kg,30,Manis!,Panen minggu ini,https://link-gambar-langsung.jpg
Paket Sayur Sop,Sayur Segar,15000,per paket,15,Hemat,Isi wortel buncis kentang kol seledri,
Nasi Ayam Geprek,Makanan,18000,per porsi,25,Favorit,Sambal bawang level 1-5,`;

export const TEMPLATE_TOKO_CSV = `kunci,nilai
nama_toko,Lapak Bu Sari
tagline,Kue subuh & sayur segar antar sampai rumah
whatsapp,6281234567890
alamat,"Jl. Melati No. 12, Sleman, Yogyakarta"
jam_buka,06.00-21.00
gratis_antar_min,50000
pengumuman,Buka setiap hari 06.00-21.00 | Gratis antar min. Rp50.000 | Terima pesanan acara H-2`;

/* ---------------- util kecil ---------------- */
export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatRupiah(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* abaikan */
  }
}

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ---------------- parser CSV ---------------- */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      field = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else if (c !== "\r") {
      field += c;
    }
  }
  row.push(field);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  return rows;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const pick = (row: string[], header: string[], names: string[]): string => {
  const i = header.findIndex((h) => names.includes(h));
  if (i < 0) return "";
  return (row[i] ?? "").trim();
};

export function productsFromCSV(text: string): Product[] {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const header = rows[0].map(norm);
  const iNama = header.findIndex((h) =>
    ["nama", "name", "produk", "product", "judul"].includes(h)
  );
  if (iNama < 0) return [];

  const out: Product[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const nama = (row[iNama] ?? "").trim();
    if (!nama) continue;
    const stokRaw = pick(row, header, ["stok", "stock", "jumlah"]);
    const hargaRaw = pick(row, header, ["harga", "price", "hargajual"]);
    out.push({
      id: slug(nama) + "-" + r,
      nama,
      kategori: pick(row, header, ["kategori", "category", "jenis"]) || "Lainnya",
      harga: parseInt(hargaRaw.replace(/[^\d]/g, ""), 10) || 0,
      satuan: pick(row, header, ["satuan", "unit", "kemasan"]) || "per pcs",
      stok: stokRaw === "" ? 10 : parseInt(stokRaw.replace(/[^\d]/g, ""), 10) || 0,
      badge: pick(row, header, ["badge", "label", "tag"]) || undefined,
      deskripsi: pick(row, header, ["deskripsi", "desk", "description", "desc", "keterangan"]) || undefined,
      foto: pick(row, header, ["foto", "photo", "gambar", "image", "fotourl", "imageurl", "urlfoto"]) || undefined,
    });
  }
  return out;
}

export function shopFromCSV(text: string): Partial<ShopInfo> {
  const rows = parseCSV(text);
  const out: Partial<ShopInfo> = {};
  for (const row of rows) {
    const key = norm(row[0] ?? "");
    const val = (row[1] ?? "").trim();
    if (!key || !val) continue;
    if (["kunci", "key", "nama"].includes(key)) continue; // lewati baris judul
    switch (key) {
      case "namatoko":
      case "toko":
        out.namaToko = val;
        break;
      case "tagline":
      case "slogan":
        out.tagline = val;
        break;
      case "whatsapp":
      case "wa":
      case "nohp":
      case "telepon":
      case "nomorwa":
        out.whatsapp = val;
        break;
      case "alamat":
      case "address":
        out.alamat = val;
        break;
      case "jambuka":
      case "jam":
      case "jamoperasional":
        out.jamBuka = val;
        break;
      case "gratisantarmin":
      case "mingratisantar":
      case "minimalantar":
      case "gratisantar": {
        const n = parseInt(val.replace(/[^\d]/g, ""), 10);
        if (n > 0) out.gratisAntarMin = n;
        break;
      }
      case "pengumuman":
      case "announcement":
      case "tikber":
      case "beritajalan":
        out.pengumuman = val.split("|").map((s) => s.trim()).filter(Boolean);
        break;
    }
  }
  return out;
}

/* ---------------- koneksi Google Sheets ---------------- */
export function parseSheetUrl(input: string): { id: string; gid: string } | null {
  const s = input.trim();
  if (!s) return null;
  const idMatch = s.match(/\/d\/([a-zA-Z0-9-_]{10,})/);
  const gidMatch = s.match(/[#&?]gid=(\d+)/);
  if (idMatch) return { id: idMatch[1], gid: gidMatch?.[1] ?? "0" };
  if (/^[a-zA-Z0-9-_]{10,}$/.test(s)) return { id: s, gid: gidMatch?.[1] ?? "0" };
  return null;
}

async function fetchSheetCSV(id: string, gid: string): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const text = await res.text();
    if (!res.ok || /^\s*</.test(text)) {
      throw new Error(
        "Google Sheet tidak dapat dibaca. Pastikan akses berbagi disetel: “Siapa saja yang memiliki link → Pelihat”."
      );
    }
    return text;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("Permintaan terlalu lama. Periksa koneksi lalu coba lagi.");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProductsFromSheet(url: string): Promise<Product[]> {
  const parsed = parseSheetUrl(url);
  if (!parsed) throw new Error("Link Google Sheet tidak valid. Tempel link lengkap dari browser HP-mu.");
  const text = await fetchSheetCSV(parsed.id, parsed.gid);
  const products = productsFromCSV(text);
  if (products.length === 0) {
    throw new Error(
      "Sheet terbaca tapi tidak ada produk. Pastikan baris pertama adalah judul kolom (nama, kategori, harga, …)."
    );
  }
  return products;
}

export async function fetchShopFromSheet(url: string): Promise<Partial<ShopInfo>> {
  const parsed = parseSheetUrl(url);
  if (!parsed) return {};
  const text = await fetchSheetCSV(parsed.id, parsed.gid);
  return shopFromCSV(text);
}

/* ---------------- status buka / tutup ---------------- */
export function openStatus(jamBuka: string): { open: boolean; label: string } {
  const m = jamBuka.match(/(\d{1,2})[.:](\d{2})\s*[-–—]\s*(\d{1,2})[.:](\d{2})/);
  if (!m) return { open: true, label: jamBuka || "Buka setiap hari" };
  const start = +m[1] * 60 + +m[2];
  const end = +m[3] * 60 + +m[4];
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const open = cur >= start && cur < end;
  const fmt = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}.${String(t % 60).padStart(2, "0")}`;
  return {
    open,
    label: open ? `Buka · sampai ${fmt(end)}` : `Tutup · buka ${fmt(start)}`,
  };
}

/* ---------------- WhatsApp ---------------- */
const waDigits = (wa: string) => wa.replace(/\D/g, "");

export function waHref(shop: ShopInfo, text: string): string {
  return `https://wa.me/${waDigits(shop.whatsapp)}?text=${encodeURIComponent(text)}`;
}

export function buildOrderMessage(
  shop: ShopInfo,
  lines: CartLine[],
  form: CheckoutForm,
  subtotal: number,
  freeDelivery: boolean
): string {
  const sep = "------------------------";
  const itemLines = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.product.nama}\n    ${l.qty} x ${formatRupiah(l.product.harga)} = ${formatRupiah(
          l.qty * l.product.harga
        )}`
    )
    .join("\n");
  return [
    `*PESANAN BARU — ${shop.namaToko}*`,
    sep,
    itemLines,
    sep,
    `*Total: ${formatRupiah(subtotal)}*`,
    `Ongkir: ${freeDelivery ? "GRATIS (min. belanja terpenuhi)" : "dihitung saat konfirmasi"}`,
    "",
    `*Nama:* ${form.nama}`,
    `*Alamat:* ${form.alamat}`,
    form.catatan ? `*Catatan:* ${form.catatan}` : "",
    `*Pembayaran:* ${form.metode === "COD" ? "COD (bayar di tempat)" : "Transfer"}`,
    "",
    "Mohon dikonfirmasi ya, terima kasih!",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}
