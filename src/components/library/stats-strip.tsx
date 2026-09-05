"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type Stat = { value: string; label: string };

/**
 * StatsStrip — tira de "créditos" tipo mono (patrón lyngraft): cifras en
 * tipografía display grande sobre etiquetas mono estilo timecode, en una
 * retícula 2/4 columnas separada por hairlines. Estática — los valores son
 * strings, así que admite cualquier formato ("$15B", "94.7%", "195+").
 * `tone` alterna entre banda oscura (glass sobre ink) y clara (paper).
 */
export function StatsStrip({
  stats,
  tone = "dark",
  className,
}: {
  stats: Stat[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4",
        tone === "dark" ? "bg-bone/15" : "bg-ink/10",
        className,
      )}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col gap-1 px-6 py-5",
            tone === "dark" ? "bg-ink/60 backdrop-blur-sm" : "bg-paper",
          )}
        >
          <dt
            className={cn(
              "order-2 font-mono text-[0.68rem] uppercase leading-snug tracking-[0.16em]",
              tone === "dark" ? "text-bone/60" : "text-ink-soft",
            )}
          >
            {s.label}
          </dt>
          <dd
            className={cn(
              "order-1 font-display text-3xl font-extrabold sm:text-4xl",
              tone === "dark" ? "text-amber-soft" : "text-amber-deep",
            )}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type AnimatedStat = {
  /** Valor final del contador. */
  target: number;
  /** Prefijo pegado a la cifra (p. ej. "$"). */
  prefix?: string;
  /** Sufijo pegado a la cifra (p. ej. "+", "M"). */
  suffix?: string;
  label: string;
};

const DURATION_MS = 1600;

/**
 * AnimatedStatsStrip — la StatsStrip con contadores: misma retícula de
 * "créditos" (cifra display sobre etiqueta mono, hairlines), pero las cifras
 * cuentan de 0 al valor final con easing cuando la banda entra al viewport
 * (IntersectionObserver, una sola vez). Bajo prefers-reduced-motion salta
 * directo al valor final. Aquí el valor es numérico (target) con prefix/suffix
 * opcionales, porque hay que interpolar.
 */
export function AnimatedStatsStrip({
  stats,
  tone = "dark",
  className,
}: {
  stats: AnimatedStat[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLDListElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 de la animación

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let finalizer: ReturnType<typeof setTimeout> | null = null;
    let started = false;
    let t0 = 0;

    const finish = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      setProgress(1);
    };

    // Un solo frame: progreso derivado del tiempo real transcurrido (no de un
    // acumulador), así un frame perdido no descuadra la cuenta.
    const loop = () => {
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / DURATION_MS);
        // easeOutCubic — arranca rápido y asienta suave en el final
        setProgress(1 - Math.pow(1 - p, 3));
        raf = p < 1 ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (started) return;
      started = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      t0 = performance.now();
      loop();
      // RED DE SEGURIDAD: en móvil el rAF se ESTRANGULA durante el scroll (y en
      // pestañas en 2º plano se pausa) y puede dejar de dispararse antes de
      // llegar a 1 → el contador se queda a media cuenta (p.ej. "87" en vez de
      // "94"). Este timer garantiza el valor final pase lo que pase con el rAF.
      finalizer = setTimeout(finish, DURATION_MS + 200);
    };

    // Si el rAF quedó pausado con la pestaña oculta, al volver a ser visible:
    // si ya venció la duración saltamos al final; si no, reanudamos el bucle.
    const onVisibility = () => {
      if (!started || document.hidden || raf) return;
      if (performance.now() - t0 >= DURATION_MS) finish();
      else loop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        start();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (finalizer) clearTimeout(finalizer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <dl
      ref={ref}
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4",
        tone === "dark" ? "bg-ink-2" : "bg-paper",
        className,
      )}
    >
      {stats.map((s, i) => {
        const current = Math.round(s.target * progress);
        return (
          <div
            key={s.label}
            // Sin justify-center: todas las cifras anclan al mismo padding
            // superior y quedan en la misma línea horizontal aunque la
            // etiqueta de abajo se vaya a 2 líneas.
            className="relative flex flex-col items-center gap-2 px-6 py-10 text-center sm:py-14"
          >
            {/* Separador: hairline amber con pico en el centro, desvanecido
                hacia arriba y hacia abajo. En 2 columnas (móvil) solo entre
                la 1ª y 2ª de cada fila; en 4 columnas, entre todas. */}
            {i > 0 ? (
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-5 left-0 w-px bg-gradient-to-b from-transparent via-amber to-transparent",
                  i % 2 === 0 && "hidden sm:block",
                )}
              />
            ) : null}
            <dt
              className={cn(
                "order-2 font-mono text-[0.68rem] uppercase leading-snug tracking-[0.16em]",
                tone === "dark" ? "text-bone/60" : "text-ink-soft",
              )}
            >
              {s.label}
            </dt>
            <dd
              className={cn(
                "order-1 font-display text-4xl font-extrabold tabular-nums sm:text-5xl lg:text-6xl",
                tone === "dark" ? "text-amber-soft" : "text-amber-deep",
              )}
            >
              {s.prefix}
              {current.toLocaleString("en-US")}
              {s.suffix}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
