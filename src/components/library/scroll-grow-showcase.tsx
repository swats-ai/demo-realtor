"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type ShowcaseLogo = { src: string; alt: string } | { text: string };

/** Bloque que se revela (fade + slide-up) según el progreso del scroll. */
function Reveal({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  /** [inicio, fin] del progreso (0..1) en el que aparece. */
  range: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [40, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollGrowShowcase — sección de "manifiesto" con imagen que crece al scroll
 * (patrón template Boedoxol, sección "An enduring architecture"): un tramo
 * alto fija (sticky) una tarjeta de imagen que ESCALA de pequeña a full-bleed
 * conforme se scrollea, mientras la foto interior se mueve en parallax dentro
 * del recorte. Sobre ella se revela — en cascada por el mismo scroll — el
 * título gigante, un párrafo, y un aside con imagen chica + texto; al pie, un
 * marquee de logos en loop. Motor: framer-motion useScroll + useTransform.
 */
export function ScrollGrowShowcase({
  eyebrow,
  title,
  lead,
  aside,
  image,
  imageAlt = "",
  logos,
}: {
  eyebrow?: string;
  title: string;
  /** Párrafo destacado (columna izquierda). */
  lead?: string;
  /** Bloque secundario derecha: imagen chica + texto. */
  aside?: { image?: string; alt?: string; text: string };
  /** Foto principal que crece y hace parallax. */
  image: string;
  imageAlt?: string;
  /** Logos del marquee inferior (imágenes o wordmarks de texto). */
  logos?: ShowcaseLogo[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // La tarjeta escala de 0.86 a 1 en la primera mitad del recorrido.
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.55], [40, 24]);
  // La foto interior recorre en parallax (va sobredimensionada con scale-110).
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    // El tramo alto crea la distancia de scroll; la tarjeta se fija dentro.
    <section ref={ref} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden p-3 sm:p-6">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden bg-ink-2"
        >
          {/* Foto con parallax interno */}
          <motion.div style={{ y: imgY }} className="absolute inset-0 [transform:scale(1.12)]">
            <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          {/* Tinte para legibilidad del texto */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/60" />

          {/* Contenido revelado */}
          <div className="relative flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div>
              {eyebrow ? (
                <Reveal progress={scrollYProgress} range={[0.04, 0.24]}>
                  <p className="eyebrow text-bone/80">{eyebrow}</p>
                </Reveal>
              ) : null}
              <Reveal progress={scrollYProgress} range={[0.06, 0.32]}>
                <h2 className="font-display mt-4 max-w-[16ch] text-balance text-[2.6rem] font-extrabold leading-[0.95] text-bone sm:text-6xl lg:text-[5.5rem]">
                  {title}
                </h2>
              </Reveal>
            </div>

            <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
              {lead ? (
                <Reveal progress={scrollYProgress} range={[0.24, 0.5]}>
                  <p className="max-w-xl text-pretty text-lg leading-relaxed text-bone/90 sm:text-xl">
                    {lead}
                  </p>
                </Reveal>
              ) : (
                <div />
              )}
              {aside ? (
                <Reveal
                  progress={scrollYProgress}
                  range={[0.32, 0.58]}
                  className="flex flex-col items-end gap-4 text-right"
                >
                  {aside.image ? (
                    <div className="relative aspect-[4/3] w-44 overflow-hidden rounded-xl sm:w-56">
                      <Image src={aside.image} alt={aside.alt ?? ""} fill sizes="14rem" className="object-cover" />
                    </div>
                  ) : null}
                  <p className="max-w-xs text-sm leading-relaxed text-bone/85">{aside.text}</p>
                </Reveal>
              ) : null}
            </div>

            {/* Marquee de logos */}
            {logos?.length ? (
              <Reveal progress={scrollYProgress} range={[0.4, 0.62]} className="overflow-hidden">
                <div className="flex w-max animate-marquee items-center gap-16 opacity-80">
                  {[...logos, ...logos].map((logo, i) => (
                    <span key={i} className="shrink-0">
                      {"src" in logo ? (
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={140}
                          height={36}
                          className="h-7 w-auto object-contain brightness-0 invert"
                        />
                      ) : (
                        <span className="font-display text-2xl font-bold text-bone">{logo.text}</span>
                      )}
                    </span>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
