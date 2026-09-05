import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";
import { Eyebrow, ButtonLink } from "./ui";
import { cn } from "@/lib/cn";

/**
 * EditorialSplit — split editorial sencillo (patrón zilker351, sección "Every
 * acre, for every one"): columna de texto con eyebrow, título grande en el
 * color de acento, párrafos y hasta dos botones (sólido + ghost); al lado,
 * foto 4:5 con esquinas muy redondeadas y una tarjeta de stat flotante —
 * número display grande + texto pequeño — solapando la esquina inferior
 * izquierda de la foto. `reverse` pone la foto a la izquierda.
 */
export function EditorialSplit({
  eyebrow,
  title,
  children,
  ctas,
  image,
  imageAlt = "",
  imagePos,
  stat,
  reverse = false,
  background = "paper",
}: {
  eyebrow?: string;
  /** Título grande (se pinta en amber-deep, como el ember del original). */
  title: string;
  /** Párrafos de la columna de texto. */
  children: ReactNode;
  /** Botones (ideal 1–2; `ghost` para el secundario). */
  ctas?: { label: string; href: string; ghost?: boolean; external?: boolean }[];
  /** Foto 4:5 de la otra columna. */
  image: string;
  imageAlt?: string;
  /** Clase object-position de la foto. */
  imagePos?: string;
  /** Tarjeta flotante: cifra display + texto pequeño. */
  stat?: { value: string; label: string };
  /** Foto a la izquierda. */
  reverse?: boolean;
  background?: "paper" | "paper-2";
}) {
  return (
    <section className={cn("py-20 sm:py-28", background === "paper" ? "bg-paper" : "bg-paper-2")}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={cn(reverse && "lg:order-last")}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className="font-display mt-4 text-balance text-[2.1rem] font-bold leading-[1.05] text-amber-deep sm:text-[3rem]">
              {title}
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft [&>p:first-child]:text-[1.1rem]">
              {children}
            </div>
            {ctas?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((c) => (
                  <ButtonLink
                    key={c.label}
                    href={c.href}
                    external={c.external}
                    tone={c.ghost ? "ghost-light" : "amber"}
                  >
                    {c.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 38rem"
                className={cn("object-cover", imagePos)}
              />
            </div>
            {stat ? (
              <div
                className={cn(
                  "absolute -bottom-6 max-w-[14rem] rounded-2xl border border-ink/10 bg-bone p-5 shadow-[0_30px_60px_-24px_rgba(16,35,31,0.4)]",
                  reverse ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8",
                )}
              >
                <div className="font-display text-3xl font-bold text-amber-deep">{stat.value}</div>
                <p className="mt-1 text-sm leading-snug text-ink-soft">{stat.label}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
