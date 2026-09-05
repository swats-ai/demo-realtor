"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDragCarousel, dragTrackClassName } from "./use-drag-carousel";
import { cn } from "@/lib/cn";
import { Lightbox, useLightbox } from "@/components/site/lightbox";

export type SpotlightImage = { src: string; alt?: string };

/**
 * SpotlightImageCarousel — carrusel de imágenes con foco central (patrón
 * usmicro, slider de las páginas de producto): la imagen activa ocupa el 70%
 * del ancho, centrada, con la anterior y la siguiente asomando ~15% por cada
 * lado ATENUADAS (40% de opacidad); clicar un peek navega hacia esa imagen.
 * Infinito con scroll nativo — drag con mouse, trackpad/touch — más flechas,
 * dots pill y navegación por teclado (← →). Imágenes 16:9 redondeadas; la
 * activa proyecta sombra profunda.
 */
export function SpotlightImageCarousel({
  images,
  intervalMs = 0,
  className,
}: {
  images: SpotlightImage[];
  /** Auto-avance en ms; 0 = manual (default). */
  intervalMs?: number;
  /** Clases extra del wrapper (p. ej. fondo de banda). */
  className?: string;
}) {
  const n = images.length;
  const slides = [...images, ...images, ...images]; // 3 copias para el loop
  // activa 70% + 2 peeks de 15% en desktop; casi full-width en móvil
  const [cfg, setCfg] = useState({ visible: 100 / 70, full: 1 });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setCfg(w >= 1024 ? { visible: 100 / 70, full: 1 } : { visible: 1.12, full: 1 });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const lb = useLightbox();
  const { trackRef, cur, go, setPaused, trackProps } = useDragCarousel({
    count: n,
    visible: cfg.visible,
    full: cfg.full,
    intervalMs,
  });

  // Navega a un slide concreto del DOM (peeks clicables y dots).
  const goToDom = (domIdx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slot = el.clientWidth / cfg.visible;
    const peek = (el.clientWidth - slot) / 2;
    el.scrollTo({ left: domIdx * slot - peek, behavior: "smooth" });
  };

  // Teclado ← → (solo con el lightbox cerrado, que tiene sus propias teclas)
  const lbOpen = lb.index !== null;
  useEffect(() => {
    if (lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lbOpen]);

  return (
    <div
      className={cn("py-2", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Padding vertical DENTRO del track (scroll container): la sombra de la
          imagen activa se pinta dentro del área scrolleable y el overflow-x
          no la recorta. */}
      <div ref={trackRef} {...trackProps} className={cn(dragTrackClassName, "pb-16 pt-4")}>
        {slides.map((img, i) => {
          const active = i % n === cur;
          return (
            <div
              key={i}
              className="shrink-0 px-2.5"
              style={{ width: `${100 / cfg.visible}%` }}
              onClick={() => !active && goToDom(i)}
            >
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                aria-label={active ? `Open photo: ${img.alt ?? `photo ${(i % n) + 1}`}` : `Go to photo ${(i % n) + 1}`}
                onClick={() => active && lb.open(i % n)}
                className={cn(
                  "relative block aspect-video w-full overflow-hidden rounded-2xl bg-ink-2 transition-[opacity,box-shadow] duration-400",
                  active
                    ? "cursor-zoom-in opacity-100 shadow-[0_30px_70px_-24px_rgba(16,35,31,0.5)]"
                    : "cursor-pointer opacity-40 hover:opacity-60",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 90vw, 70vw"
                  className="object-cover"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Flechas + dots */}
      {n > 1 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <ArrowButton dir="left" onClick={() => go(-1)} />
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToDom(n + i)}
                aria-label={`Photo ${i + 1}`}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all duration-300",
                  i === cur ? "w-6 bg-amber-deep" : "w-2 bg-ink/20 hover:bg-ink/35",
                )}
              />
            ))}
          </div>
          <ArrowButton dir="right" onClick={() => go(1)} />
        </div>
      )}
      <Lightbox
        items={images.map((im) => ({ src: im.src, alt: im.alt ?? "" }))}
        index={lb.index}
        onClose={lb.close}
        onIndexChange={lb.setIndex}
      />
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous photo" : "Next photo"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-bone text-ink shadow-sm transition hover:bg-paper-2"
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}
