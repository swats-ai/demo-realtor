"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export type LightboxItem = { src: string; alt: string; caption?: string };

/**
 * Lightbox — visor de fotos a pantalla completa. Diálogo modal accesible:
 * role="dialog" + aria-modal, foco atrapado dentro, Escape cierra, flechas
 * navegan, swipe en touch, scroll del body bloqueado. Se monta con portal en
 * <body> para escapar de cualquier `overflow: hidden` de las secciones.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  /** Índice abierto; `null` = cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;
  const count = items.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => {
      if (index === null) return;
      onIndexChange((index + n + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Foco, teclado y scroll-lock mientras está abierto.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose, go]);

  // Solo se abre tras una interacción del usuario, así que `document` existe.
  if (!open) return null;
  const item = items[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}: ${item.alt}`}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-bone backdrop-blur-sm animate-[fade-up_0.25s_ease-out_both]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-mono text-[0.8rem] tracking-[0.18em] tabular-nums text-bone/80">
          {String(index + 1).padStart(2, "0")}
          <span className="text-bone/45"> / {String(count).padStart(2, "0")}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-bone/40 transition hover:bg-bone hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Imagen */}
      <div className="relative min-h-0 flex-1 px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div key={index} className="relative h-full w-full animate-[fade-up_0.35s_ease-out_both]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bone/40 bg-ink/40 backdrop-blur transition hover:bg-bone hover:text-ink sm:left-6"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bone/40 bg-ink/40 backdrop-blur transition hover:bg-bone hover:text-ink sm:right-6"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : null}
      </div>

      {/* Pie */}
      <div className={cn("px-5 py-5 text-center sm:px-8", !item.caption && !item.alt && "py-3")}>
        <p className="font-display text-lg italic text-bone/85">{item.caption ?? item.alt}</p>
      </div>
    </div>,
    document.body,
  );
}

/** Estado mínimo para abrir un Lightbox desde cualquier galería. */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  return {
    index,
    open: (i: number) => setIndex(i),
    close: () => setIndex(null),
    setIndex,
  };
}
