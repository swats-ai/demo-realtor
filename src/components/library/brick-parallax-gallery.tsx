"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";
import { Lightbox, useLightbox } from "@/components/site/lightbox";

export type BrickPhoto = { src: string; alt?: string; caption?: string };

function Row({
  photos,
  index,
  progress,
  shift,
  offset,
  onOpen,
}: {
  photos: BrickPhoto[];
  index: number;
  progress: MotionValue<number>;
  shift: number;
  /** Índice global de la primera foto de la fila (para el lightbox). */
  offset: number;
  onOpen: (i: number) => void;
}) {
  // Filas nones (1ª, 3ª… → index par) viajan a la derecha; pares a la izquierda.
  const dir = index % 2 === 0 ? 1 : -1;
  const x = useTransform(progress, [0, 1], [-shift * dir, shift * dir]);
  // Aparejo de ladrillo: las filas pares se corren media celda (ancho + gap)
  // para que sus fotos caigan en medio de las uniones de la fila anterior.
  const brickOffset = index % 2 === 1 ? "calc((26rem + 2.5rem) / -2)" : undefined;

  return (
    <motion.div
      style={{ x, marginLeft: brickOffset }}
      className="flex justify-center gap-10"
    >
      {photos.map((p, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(offset + i)}
          aria-label={`Open photo: ${p.alt ?? `photo ${offset + i + 1}`}`}
          className="group relative aspect-[4/3] w-[26rem] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-ink-2"
        >
          <Image
            src={p.src}
            alt={p.alt ?? ""}
            fill
            sizes="26rem"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </button>
      ))}
    </motion.div>
  );
}

/**
 * BrickParallaxGallery — galería de bloques en aparejo de ladrillo: n filas
 * (configurable) de fotos separadas por un gap generoso en ambos ejes; cada
 * fila par se corre media celda para que sus fotos caigan en medio de las
 * uniones de la fila anterior. Al hacer scroll las filas viajan en parallax
 * horizontal: las nones a la derecha y las pares a la izquierda.
 *
 * Adaptación: cada foto es un botón que abre el Lightbox a pantalla completa.
 *
 * Las filas DEBEN ser más anchas que el viewport (mete suficientes fotos por
 * fila): la sección las recorta (overflow-hidden) y el desplazamiento revela
 * fotos por los costados sin dejar nunca huecos en blanco. Celdas de 26rem +
 * gap 2.5rem — cada fila debe desbordar al menos `shift` px por lado.
 */
export function BrickParallaxGallery({
  photos,
  rows = 3,
  shift = 90,
  className,
}: {
  photos: BrickPhoto[];
  /** Número de filas; las fotos se reparten en orden, equilibradas. */
  rows?: number;
  /** Recorrido del parallax en px por lado. */
  shift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lb = useLightbox();
  const perRow = Math.ceil(photos.length / rows);
  const chunks = Array.from({ length: rows }, (_, i) =>
    photos.slice(i * perRow, (i + 1) * perRow),
  ).filter((c) => c.length);

  return (
    <section
      ref={ref}
      className={cn("overflow-hidden bg-paper py-16 sm:py-20", className)}
    >
      <div className="space-y-10">
        {chunks.map((row, i) => (
          <Row
            key={i}
            photos={row}
            index={i}
            progress={scrollYProgress}
            shift={shift}
            offset={i * perRow}
            onOpen={lb.open}
          />
        ))}
      </div>
      <Lightbox
        items={photos.map((p) => ({ src: p.src, alt: p.alt ?? "", caption: p.caption }))}
        index={lb.index}
        onClose={lb.close}
        onIndexChange={lb.setIndex}
      />
    </section>
  );
}
