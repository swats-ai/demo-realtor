import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * PageHero — cabecera de páginas interiores: banda pino con foto tenue,
 * línea en cursiva, H1 grande en Fraunces y párrafo. Ocupa ~60vh para que
 * el header transparente tenga fondo oscuro debajo.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
  compact = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
  align?: "left" | "center";
}) {
  return (
    <section className={cn("relative flex items-end overflow-hidden bg-ink text-bone", compact ? "min-h-[24rem] pt-32 pb-12" : "min-h-[60vh] pt-40 pb-16 sm:pb-20")}>
      {image ? (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        </>
      ) : (
        <div aria-hidden className="grain absolute inset-0 opacity-[0.12]" />
      )}
      <div className={cn("relative mx-auto w-full max-w-[100rem] px-5 sm:px-8", align === "center" && "text-center")}>
        {eyebrow ? <p className="eyebrow text-amber-soft">{eyebrow}</p> : null}
        <h1 className={cn("font-display mt-4 max-w-4xl text-balance text-[2.8rem] font-medium leading-[1.02] tracking-[-0.015em] sm:text-[3.8rem] lg:text-[5rem]", align === "center" && "mx-auto")}>
          {title}
        </h1>
        {intro ? (
          <p className={cn("mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-bone/85 sm:text-xl", align === "center" && "mx-auto")}>{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
