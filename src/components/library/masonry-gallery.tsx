"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { Lightbox, useLightbox } from "@/components/site/lightbox";

export type MasonryPhoto = {
  src: string;
  alt?: string;
  /** Clase de proporción de la foto (varíalas para el ritmo masonry). */
  aspect?: string;
  caption?: string;
};

/*
  Proporción alto/ancho a partir de la clase `aspect-*` de la foto.
  aspect-[4/5] → 1.25 · aspect-square → 1 · aspect-video → 0.5625 · default 3/4.
*/
function heightUnits(aspect?: string) {
  if (!aspect) return 4 / 3;
  const m = aspect.match(/aspect-\[(\d+)\/(\d+)\]/);
  if (m) return Number(m[2]) / Number(m[1]);
  if (aspect.includes("square")) return 1;
  if (aspect.includes("video")) return 9 / 16;
  return 4 / 3;
}

/* Nº de columnas según viewport (2 / 3 / 4). En SSR se asume el mayor. */
const queries = ["(min-width: 1280px)", "(min-width: 640px)"] as const;
function subscribe(cb: () => void) {
  const mqs = queries.map((q) => window.matchMedia(q));
  mqs.forEach((mq) => mq.addEventListener("change", cb));
  return () => mqs.forEach((mq) => mq.removeEventListener("change", cb));
}
function getCols() {
  if (window.matchMedia(queries[0]).matches) return 4;
  if (window.matchMedia(queries[1]).matches) return 3;
  return 2;
}

const GAP = 20; // px (gap-5)

/**
 * MasonryGallery — muro de fotos masonry BALANCEADO. A diferencia de la
 * versión CSS multi-columns de la librería (cuyas columnas terminan a alturas
 * distintas y dejan huecos al pie), aquí las fotos se reparten en N columnas
 * flex: cada columna llena exactamente la altura del conjunto y cada foto
 * crece en proporción a su aspecto, de modo que el muro cierra siempre en un
 * rectángulo completo. Reparto greedy a la columna más corta; la altura del
 * contenedor se mide con ResizeObserver (con aspect-ratio de respaldo en SSR).
 * Cada foto abre el Lightbox a pantalla completa.
 */
export function MasonryGallery({ photos, className }: { photos: MasonryPhoto[]; className?: string }) {
  const cols = useSyncExternalStore(subscribe, getCols, () => 4);
  const lb = useLightbox();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  // Reparto: las fotos más altas primero, cada una a la columna más corta
  // (heurística LPT: columnas casi iguales → mínimo estirado). Dentro de cada
  // columna se respeta el orden original.
  const layout = useMemo(() => {
    const columns: { idx: number; h: number }[][] = Array.from({ length: cols }, () => []);
    const sums = new Array(cols).fill(0);
    const items = photos.map((p, idx) => ({ idx, h: heightUnits(p.aspect) }));
    [...items]
      .sort((a, b) => b.h - a.h || a.idx - b.idx)
      .forEach((it) => {
        let s = 0;
        for (let j = 1; j < cols; j++) if (sums[j] < sums[s]) s = j;
        columns[s].push(it);
        sums[s] += it.h;
      });
    columns.forEach((c) => c.sort((a, b) => a.idx - b.idx));
    return { columns, maxSum: Math.max(...sums), maxCount: Math.max(...columns.map((c) => c.length)) };
  }, [photos, cols]);

  // Altura real: la columna más alta a su ancho medido, más sus gaps.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const colW = (el.clientWidth - (cols - 1) * GAP) / cols;
      setHeight(Math.round(layout.maxSum * colW + (layout.maxCount - 1) * GAP));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout, cols]);

  return (
    <>
      <div
        ref={ref}
        className={cn("grid", className)}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: GAP,
          height: height ?? undefined,
          aspectRatio: height ? undefined : `${cols} / ${layout.maxSum}`,
        }}
      >
        {layout.columns.map((column, c) => (
          <div key={c} className="flex min-h-0 flex-col" style={{ gap: GAP }}>
            {column.map(({ idx, h }) => {
              const p = photos[idx];
              return (
                <button
                  key={`${p.src}-${idx}`}
                  type="button"
                  onClick={() => lb.open(idx)}
                  aria-label={`Open photo: ${p.alt ?? `photo ${idx + 1}`}`}
                  style={{ flex: `${h} 1 0px` }}
                  className="group relative min-h-0 w-full cursor-zoom-in overflow-hidden rounded-xl bg-ink-2"
                >
                  <Image
                    src={p.src}
                    alt={p.alt ?? ""}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  {p.caption ? (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-left font-display text-base italic text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {p.caption}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <Lightbox
        items={photos.map((p) => ({ src: p.src, alt: p.alt ?? "", caption: p.caption }))}
        index={lb.index}
        onClose={lb.close}
        onIndexChange={lb.setIndex}
      />
    </>
  );
}
