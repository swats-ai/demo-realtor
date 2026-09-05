"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { VideoSource } from "@/data/listings";

/**
 * VideoPoster — poster con botón de play custom encima. Al pulsar abre un
 * lightbox a pantalla completa y reproduce el video: iframe para YouTube y
 * Vimeo, <video> nativo con controles para archivos locales. Escape y el
 * botón cierran; el foco vuelve al botón de play.
 */
export function VideoPoster({
  video,
  poster,
  title,
  label = "Play video",
  className,
  aspectClassName = "aspect-video",
  rounded = "rounded-2xl",
}: {
  video: VideoSource;
  /** Poster explícito; si no, se usa el del `video` (o miniatura de YouTube). */
  poster?: string;
  /** Título accesible del video. */
  title: string;
  /** Texto bajo el botón de play. */
  label?: string;
  className?: string;
  aspectClassName?: string;
  rounded?: string;
}) {
  const [open, setOpen] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const playBtn = playRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      playBtn?.focus();
    };
  }, [open]);

  const posterSrc =
    poster ??
    ("poster" in video && video.poster ? video.poster : undefined) ??
    (video.provider === "youtube" ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : undefined);

  return (
    <>
      <div className={cn("group relative overflow-hidden bg-ink-2", aspectClassName, rounded, className)}>
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        <button
          ref={playRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${label}: ${title}`}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 text-bone"
        >
          <span className="relative grid size-20 place-items-center rounded-full bg-bone/95 text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110 sm:size-24">
            <span aria-hidden className="absolute inset-0 rounded-full border border-bone/60 transition-transform duration-700 group-hover:scale-[1.35] group-hover:opacity-0" />
            <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current sm:size-8" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
          <span className="font-display text-lg italic [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]">{label}</span>
        </button>
      </div>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="fixed inset-0 z-[100] flex flex-col bg-ink text-bone animate-[fade-up_0.25s_ease-out_both]"
              onClick={(e) => e.target === e.currentTarget && setOpen(false)}
            >
              <div className="flex items-center justify-between px-5 py-4 sm:px-8">
                <p className="font-display truncate pr-4 text-lg italic text-bone/85">{title}</p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-bone/40 transition hover:bg-bone hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
                <div className="aspect-video w-full max-w-[100rem] max-h-full overflow-hidden rounded-xl bg-black shadow-2xl">
                  {video.provider === "youtube" ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : video.provider === "vimeo" ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`}
                      title={title}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <video src={video.src} poster={video.poster} controls autoPlay playsInline className="h-full w-full">
                      <track kind="captions" />
                    </video>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
