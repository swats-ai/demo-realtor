import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type CrossDividerItem = {
  title: string;
  body: string;
  href?: string;
  cta?: string;
  image?: string;
  alt?: string;
};

// Hairlines de gradiente que se desvanecen en ambos extremos, de modo que al
// cruzarse en las intersecciones forman un "+" tenue.
const dH = "bg-gradient-to-r from-transparent via-amber/45 to-transparent";
const dV = "bg-gradient-to-b from-transparent via-amber/45 to-transparent";

function Dividers({ cols, n, vis }: { cols: number; n: number; vis: string }) {
  const rows = Math.ceil(n / cols);
  const hs = Array.from({ length: rows - 1 }, (_, k) => ((k + 1) / rows) * 100);
  const vs = Array.from({ length: cols - 1 }, (_, k) => ((k + 1) / cols) * 100);
  return (
    <>
      {hs.map((top) => (
        <span
          key={`h-${cols}-${top}`}
          style={{ top: `${top}%` }}
          className={`pointer-events-none absolute left-1/2 block h-px w-[80%] -translate-x-1/2 ${dH} ${vis}`}
          aria-hidden
        />
      ))}
      {vs.map((left) => (
        <span
          key={`v-${cols}-${left}`}
          style={{ left: `${left}%` }}
          className={`pointer-events-none absolute top-1/2 block h-[80%] w-px -translate-y-1/2 ${dV} ${vis}`}
          aria-hidden
        />
      ))}
    </>
  );
}

/**
 * CrossDividerGrid — grid abierto (sin cajas): las celdas se separan con
 * hairlines de gradiente que se cruzan formando un "+" en las intersecciones.
 * Funciona con cualquier número de items y con items solo-texto (imagen, href
 * y cta son opcionales). Responsivo: 1 / 2 / `cols` columnas.
 *
 * No pinta fondo propio: envuélvelo en la banda (clara u oscura) que toque y
 * elige `tone` acorde.
 */
export function CrossDividerGrid({
  items,
  cols = 4,
  tone = "dark",
}: {
  items: CrossDividerItem[];
  /** Columnas en desktop. */
  cols?: 2 | 3 | 4;
  /** `dark` = texto bone (banda oscura) · `light` = texto ink (banda clara). */
  tone?: "dark" | "light";
}) {
  const n = items.length;
  const lgCols = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[cols];
  return (
    <div className={`relative grid auto-rows-fr grid-cols-1 sm:grid-cols-2 ${lgCols}`}>
      <Dividers cols={1} n={n} vis="sm:hidden" />
      <Dividers cols={2} n={n} vis={cn("hidden sm:block", cols !== 2 && "lg:hidden")} />
      {cols !== 2 && <Dividers cols={cols} n={n} vis="hidden lg:block" />}

      {items.map((item) => {
        const external = !!item.href && /^https?:/.test(item.href);
        const inner = (
          <>
            {item.image ? (
              <div className="relative mb-5 h-40 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : null}
            <h3
              className={cn(
                "font-display text-[1.15rem] font-bold leading-snug",
                tone === "dark" ? "text-bone group-hover:text-amber-soft" : "text-ink group-hover:text-amber-deep",
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "mt-2.5 flex-1 text-[0.98rem] leading-relaxed",
                tone === "dark" ? "text-bone/75" : "text-ink-soft",
              )}
            >
              {item.body}
            </p>
            {item.href && item.cta ? (
              <span
                className={cn(
                  "mt-4 inline-flex items-center gap-2 font-display text-sm font-bold",
                  tone === "dark" ? "text-amber-soft" : "text-amber-deep",
                )}
              >
                {item.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            ) : null}
          </>
        );

        const className = "group relative flex flex-col p-7 lg:p-9";
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={className}
          >
            {inner}
          </Link>
        ) : (
          <div key={item.title} className={className}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
