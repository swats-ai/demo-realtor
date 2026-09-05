"use client";

import { useEffect, useRef } from "react";

/**
 * AutoplayVideo — <video> de fondo con autoplay confiable. React no serializa
 * el atributo `muted` en el SSR (issue histórico), así que el navegador
 * bloquea el autoplay al parsear; aquí forzamos muted + play() por ref al
 * montar. Siempre loop, silenciado e inline.
 */
export function AutoplayVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {
      /* políticas de autoplay: si falla, queda el poster */
    });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
