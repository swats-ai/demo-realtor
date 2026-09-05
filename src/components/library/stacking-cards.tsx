"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type StackingCardItem = {
  /** Pill pequeño a la izquierda (p. ej. un estado o un conteo). */
  pill?: string;
  /** Etiqueta secundaria con punto, junto al pill. */
  meta?: string;
  /** Etiqueta pequeña en mayúsculas sobre el título. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Filas de datos pequeños con bullet. */
  facts?: { text: string }[];
  image: string;
  alt?: string;
  href?: string;
  cta?: string;
  external?: boolean;
};

const TOP_BASE = 96; // px por debajo del header sticky
const PEEK = 20; // offset por tarjeta para que las anteriores asomen arriba

/**
 * StackingCards — tarjetas que se apilan con el scroll (efecto "Tether").
 * Cada tarjeta es sticky cerca del top con un offset incremental, de modo que
 * al scrollear la siguiente sube y se apila sobre la anterior — que asoma por
 * arriba y se escala ligeramente (framer-motion) al ser cubierta. Layout
 * split: detalles a un lado, foto al otro.
 *
 * ⚠️ El sticky se rompe si CUALQUIER ancestro tiene `overflow: hidden`.
 */
export function StackingCards({ items }: { items: StackingCardItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {items.map((it, i) => (
        <StackCard
          key={`${i}-${it.title}`}
          item={it}
          i={i}
          total={items.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StackCard({
  item,
  i,
  total,
  progress,
}: {
  item: StackingCardItem;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const coverPoint = (i + 1) / total;
  const scale = useTransform(progress, [coverPoint - 1 / total, coverPoint], [1, 0.92]);
  const isLast = i === total - 1;
  const external = item.external ?? (!!item.href && /^https?:/.test(item.href));

  return (
    <div className="sticky" style={{ top: `${TOP_BASE + i * PEEK}px` }}>
      <motion.article
        style={isLast ? undefined : { scale }}
        className="mb-6 origin-top overflow-hidden rounded-[1.75rem] border border-ink/10 bg-bone shadow-[0_34px_80px_-40px_rgba(16,35,31,0.55)]"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* Detalles */}
          <div className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-12">
            {item.pill || item.meta ? (
              <div className="flex items-center gap-3 font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em]">
                {item.pill ? (
                  <span className="rounded-full bg-amber/15 px-3 py-1 text-amber-deep">
                    {item.pill}
                  </span>
                ) : null}
                {item.meta ? (
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    {item.meta}
                  </span>
                ) : null}
              </div>
            ) : null}

            {item.eyebrow ? (
              <span className="eyebrow mt-5 text-amber-deep">{item.eyebrow}</span>
            ) : null}
            <h3 className="font-display mt-2 text-[1.7rem] font-bold leading-[1.05] text-ink sm:text-[2.3rem]">
              {item.title}
            </h3>
            {item.body ? (
              <p className="mt-3 max-w-md text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            ) : null}

            {item.facts?.length ? (
              <ul className="mt-5 space-y-2 text-[0.98rem] text-ink-soft">
                {item.facts.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {f.text}
                  </li>
                ))}
              </ul>
            ) : null}

            {item.href && item.cta ? (
              <div className="mt-7">
                <a
                  href={item.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 font-display text-sm font-bold text-ink shadow-[0_12px_30px_-12px_rgba(47,168,146,0.8)] transition hover:-translate-y-0.5 hover:bg-amber-soft"
                >
                  {item.cta}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            ) : null}
          </div>

          {/* Foto */}
          <div className="relative order-1 min-h-[15rem] lg:order-2 lg:min-h-[25rem]">
            <Image
              src={item.image}
              alt={item.alt ?? item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
