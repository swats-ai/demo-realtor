"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "./ui";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  image: string;
  /** Clase `object-position` para encuadrar la foto del slide. */
  pos?: string;
  /** Línea en cursiva sobre el título (aquí: el barrio). */
  eyebrow: string;
  title: string;
  text: string;
  /** Etiqueta corta del slide para los aria-labels de las flechas. */
  navLabel?: string;
  /** Enlace opcional propio del slide (p. ej. la ficha del listing). */
  href?: string;
};

/**
 * HeroSliderMinimal — hero de home a viewport completo (100vh) con slider por
 * crossfade y controles mínimos. Adaptación de la librería (lucero): la
 * sección pasa de 860px fijos a `.hero-vh`, el copy se ancla abajo a la
 * izquierda, se añade una barra de progreso del auto-avance que se reinicia
 * por slide, pausa con hover/focus, y respeta prefers-reduced-motion (sin
 * auto-avance).
 */
export function HeroSliderMinimal({
  slides,
  cta,
  intervalMs = 6500,
}: {
  slides: HeroSlide[];
  /** Botón fijo bajo el copy (no cambia por slide). */
  cta?: { label: string; href: string };
  /** Auto-avance; pasa 0 para desactivarlo. */
  intervalMs?: number;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = slides.length;
  const go = useCallback((n: number) => setI((c) => (c + n + count) % count), [count]);

  const cur = slides[i];
  const prev = slides[(i - 1 + count) % count];
  const next = slides[(i + 1) % count];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const autoplay = !!intervalMs && !paused && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setI((c) => (c + 1) % count), intervalMs);
    return () => clearInterval(t);
  }, [count, intervalMs, autoplay]);

  return (
    <section
      data-hero
      aria-roledescription="carousel"
      aria-label="Featured homes"
      className="hero-vh relative bg-ink text-bone"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Capa de fotos (recortada) */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              idx === i ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={idx !== i}
          >
            <Image
              src={s.image}
              alt=""
              fill
              priority={idx === 0}
              sizes="100vw"
              className={cn(
                "object-cover transition-transform duration-[7000ms] ease-linear",
                idx === i ? "scale-[1.06]" : "scale-100",
                s.pos,
              )}
            />
          </div>
        ))}
        {/* Velo para legibilidad del copy */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
      </div>

      {/* Copy (anclado abajo a la izquierda) */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[100rem] flex-col justify-end px-5 pb-28 pt-32 sm:px-8 sm:pb-32 lg:pb-36">
        <div className="max-w-3xl [text-shadow:0_1px_28px_rgba(0,0,0,0.45)]">
          <div className="grid">
            {slides.map((s, idx) => (
              <div
                key={idx}
                aria-hidden={idx !== i}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-700",
                  idx === i
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0",
                )}
              >
                <p className="eyebrow text-amber-soft">{s.eyebrow}</p>
                {idx === 0 ? (
                  <h1 className="font-display mt-4 text-balance text-[clamp(2.4rem,min(4.6vw,7vh),5.2rem)] font-medium leading-[1.02] tracking-[-0.015em]">
                    {s.title}
                  </h1>
                ) : (
                  <p className="font-display mt-4 text-balance text-[clamp(2.4rem,min(4.6vw,7vh),5.2rem)] font-medium leading-[1.02] tracking-[-0.015em]">
                    {s.title}
                  </p>
                )}
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/90 sm:text-xl">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {cta ? <ButtonLink href={cta.href}>{cta.label}</ButtonLink> : null}
            {cur.href ? (
              <ButtonLink href={cur.href} tone="ghost-dark">
                See this home
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>

      {/* Controles: contador + flechas + progreso */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex w-full max-w-[100rem] items-end justify-between gap-5 px-5 pb-8 sm:px-8">
          <div className="hidden items-center gap-3 sm:flex">
            {slides.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.navLabel ?? s.title}`}
                aria-current={idx === i ? "true" : undefined}
                className="pointer-events-auto group relative h-8 w-14 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bone/35 transition-colors group-hover:bg-bone/70" />
                {idx === i ? (
                  <span
                    key={`${i}-${autoplay}`}
                    style={{ ["--hero-interval" as string]: `${intervalMs}ms` }}
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bone",
                      autoplay ? "animate-hero-progress" : "",
                    )}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[0.78rem] tracking-[0.18em] text-bone/85 tabular-nums">
              {String(i + 1).padStart(2, "0")}
              <span className="text-bone/45"> / {String(count).padStart(2, "0")}</span>
            </span>
            <div className="pointer-events-auto flex gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={`Previous: ${prev.navLabel ?? prev.title}`}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-bone/45 text-bone backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={`Next: ${next.navLabel ?? next.title}`}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-bone/45 text-bone backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
