import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IconLeaf } from "./icons";

/* Muncul halus saat di-scroll ke layar */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* Judul seksi: kicker kecil + judul besar + coretan garis kuning */
export function SectionHeading({
  kicker,
  title,
  dark = false,
}: {
  kicker: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <p
        className={`flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] ${
          dark ? "text-sun-400" : "text-chili-600"
        }`}
      >
        <span className={`h-[3px] w-7 rounded-full ${dark ? "bg-sun-400" : "bg-chili-500"}`} />
        {kicker}
      </p>
      <h2
        className={`relative mt-3 inline-block font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
        <svg
          className="pointer-events-none absolute -bottom-3 left-0 h-3 w-full"
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M2 8 Q 12 3 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 118 8"
            fill="none"
            stroke="#ffc531"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </h2>
    </div>
  );
}

/* Foto produk dengan fallback cantik bila link rusak/kosong */
export function SmartImg({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) {
    return (
      <div className={`grid place-items-center bg-sprout ${className}`}>
        <div className="flex flex-col items-center gap-1.5 text-leaf-400">
          <IconLeaf className="h-10 w-10" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-leaf-600/70">
            Foto segera
          </span>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
