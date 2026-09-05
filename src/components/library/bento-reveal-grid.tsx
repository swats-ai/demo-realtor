import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./container";
import { SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

export type BentoRevealItem = {
  title: string;
  description: string;
  /** Tags que aparecen como pills amber arriba al hacer hover. */
  tags?: string[];
  /** Imagen que se revela (fade + scale) al hacer hover. */
  image?: string;
  alt?: string;
  /** Convierte la card en enlace y muestra el botón de flecha. */
  href?: string;
  external?: boolean;
  /** Icono en pastilla amber (para cards chicas sin imagen; sustituye la flecha). */
  icon?: ReactNode;
  /** Ancho/alto en celdas del grid (desktop). Default 1×1. */
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
};

const colClasses: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};
const rowClasses: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
};

// Transición firma del original: entrada/salida lenta con easing expo in-out.
const revealEase = "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.83,0,0.17,1)]";

function Card({ item }: { item: BentoRevealItem }) {
  const external = item.external ?? (!!item.href && /^https?:/.test(item.href));

  const inner = (
    <div className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-md border border-bone/10 bg-ink-2 p-6 sm:p-7">
      {/* Imagen que se revela al hover */}
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={item.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover opacity-0 [transform:scale(1.08)] group-hover:opacity-100 group-hover:[transform:scale(1)]",
              revealEase,
            )}
          />
          {/* Tinte de acento + oscurecido inferior para legibilidad */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 opacity-0 mix-blend-multiply group-hover:opacity-100",
              revealEase,
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-amber/25 opacity-0 mix-blend-overlay group-hover:opacity-100",
              revealEase,
            )}
          />
        </>
      ) : null}

      {/* Tags: aparecen desde arriba al hover */}
      {item.tags?.length ? (
        <ul
          className={cn(
            "pointer-events-none absolute left-6 top-6 z-10 flex flex-wrap gap-2 opacity-0 [transform:translateY(-8px)] group-hover:opacity-100 group-hover:[transform:translateY(0)] sm:left-7 sm:top-7",
            revealEase,
          )}
        >
          {item.tags.map((t) => (
            <li
              key={t}
              className="rounded-md bg-amber px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-wide text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Título — anclado abajo, con los tags absolute arriba sin encimarse */}
      <h3 className="font-display relative z-10 max-w-[14ch] text-balance text-3xl font-extrabold leading-[0.98] text-bone sm:text-4xl">
        {item.title}
      </h3>

      {/* Pie: descripción + botón flecha o icono */}
      <div className="relative z-10 mt-5 flex items-end justify-between gap-4">
        <p className="max-w-[24ch] text-sm leading-relaxed text-bone/70">{item.description}</p>
        {item.icon ? (
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-amber text-ink [&>svg]:size-5">
            {item.icon}
          </span>
        ) : item.href ? (
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-bone text-ink transition-colors duration-500 group-hover:bg-amber">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </div>
    </div>
  );

  const spanCls = cn(colClasses[item.colSpan ?? 1], rowClasses[item.rowSpan ?? 1]);

  return item.href ? (
    <Link
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("block h-full", spanCls)}
    >
      {inner}
    </Link>
  ) : (
    <div className={cn("h-full", spanCls)}>{inner}</div>
  );
}

/**
 * BentoRevealGrid — retícula bento donde cada cuadro revela una imagen de
 * fondo al hacer hover (patrón template Boedoxol, sección "My specialties in
 * design & motion"): cards oscuras con título display grande y descripción;
 * al pasar el mouse, una imagen entra con fade + scale (easing expo), un
 * tinte de acento la matiza, y unos pills de tags aparecen deslizándose desde
 * arriba. Cards con `href` muestran botón de flecha (que se tiñe de acento);
 * las chicas sin imagen usan un `icon` en pastilla amber. Layout configurable
 * por celda (colSpan 1–4 / rowSpan 1–2). 100% CSS, sin JavaScript.
 */
export function BentoRevealGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = 4,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: BentoRevealItem[];
  /** Columnas en desktop. */
  columns?: 3 | 4;
}) {
  const lgCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <section className="bg-ink py-20 sm:py-24">
      <Container>
        {title ? (
          <SectionHeading tone="bone" eyebrow={eyebrow} title={title} intro={intro} className="mb-12" />
        ) : null}
        <div className={cn("grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2", lgCols)}>
          {items.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
