import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";
import { Eyebrow, ButtonLink } from "./ui";
import { cn } from "@/lib/cn";

export type ProcessStep = {
  /** Icono en el círculo (ReactNode SVG). */
  icon?: ReactNode;
  /** Etiqueta mono (p. ej. "Step — 01"). */
  label?: string;
  title: string;
  description: string;
};

/**
 * StepsMediaBand — banda oscura "cómo funciona" (patrón tema Lifeon, sección
 * "How It Work"): fila superior con columna de texto (eyebrow + título con
 * remate en acento + párrafo + CTA) y una foto redondeada al lado; debajo,
 * una fila de N columnas de pasos, cada una con icono en círculo, etiqueta
 * mono "Step — 0X", título y descripción, separadas por hairlines verticales
 * de gradiente. Todo dentro de una banda ink redondeada.
 */
export function StepsMediaBand({
  eyebrow,
  title,
  highlight,
  children,
  cta,
  image,
  imageAlt = "",
  steps,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  /** Remate del título en acento. */
  highlight?: string;
  /** Párrafo(s) de la columna de texto. */
  children?: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
  /** Foto de la fila superior. */
  image: string;
  imageAlt?: string;
  /** Pasos (ideal 3–4). */
  steps: ProcessStep[];
  /** Foto a la izquierda. */
  reverse?: boolean;
}) {
  return (
    <section className="bg-paper py-10">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-bone sm:px-10 sm:py-16 lg:px-14">
          {/* Fila superior: texto + foto */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn(reverse && "lg:order-last")}>
              {eyebrow ? <Eyebrow tone="bone">{eyebrow}</Eyebrow> : null}
              <h2 className="font-display mt-4 text-balance text-4xl font-extrabold leading-[1.02] sm:text-5xl">
                {title}
                {highlight ? <> <span className="text-amber-soft">{highlight}</span></> : null}
              </h2>
              {children ? (
                <div className="mt-5 max-w-xl space-y-4 text-pretty text-lg leading-relaxed text-bone/75">
                  {children}
                </div>
              ) : null}
              {cta ? (
                <div className="mt-8">
                  <ButtonLink href={cta.href} external={cta.external} tone="amber">
                    {cta.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-2">
              <Image src={image} alt={imageAlt} fill sizes="(min-width:1024px) 44vw, 100vw" className="object-cover" />
            </div>
          </div>

          {/* Fila de pasos */}
          <div className="mt-14 grid gap-y-10 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  "relative px-0 sm:px-8",
                  i > 0 && "sm:border-bone/10 lg:border-l",
                  i > 0 && i % 2 === 1 && "sm:border-l",
                  i === 2 && "sm:border-l-0 lg:border-l",
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-bone/10 text-amber-soft [&>svg]:size-6">
                    {s.icon}
                  </span>
                  <div>
                    {s.label ? (
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-amber-soft">
                        {s.label}
                      </p>
                    ) : null}
                    <h3 className="font-display mt-1 text-xl font-bold leading-tight text-bone">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-bone/70">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
