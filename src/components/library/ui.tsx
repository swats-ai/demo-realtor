import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
  Primitivas compartidas por los componentes de sección.
  Copia las que necesite el componente que te lleves a un proyecto.
*/

/** Eyebrow — etiqueta mono en mayúsculas sobre los títulos de sección. */
export function Eyebrow({
  children,
  tone = "amber",
  className,
}: {
  children: ReactNode;
  /** `amber` sobre fondo claro · `bone` sobre fondo oscuro · `ink` neutro. */
  tone?: "amber" | "bone" | "ink";
  className?: string;
}) {
  const tones = {
    amber: "text-amber-deep",
    bone: "text-amber-soft",
    ink: "text-ink-soft",
  } as const;
  return <p className={cn("eyebrow", tones[tone], className)}>{children}</p>;
}

/**
 * SectionHeading — cabecera de sección estándar: eyebrow + título grande +
 * intro opcional. `tone="bone"` para bandas oscuras; `align="center"` para
 * secciones centradas.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "ink",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "ink" | "bone";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone === "bone" ? "bone" : "amber"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-display mt-3 text-balance text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-[2.75rem]",
          tone === "bone" ? "text-bone" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-pretty text-lg leading-relaxed",
            tone === "bone" ? "text-bone/75" : "text-ink-soft",
            align === "left" && "max-w-2xl",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-[0.95rem] font-bold transition hover:-translate-y-0.5";

/** ButtonLink — botón pill con flecha. 4 tonos para fondos claros/oscuros. */
export function ButtonLink({
  href,
  children,
  tone = "amber",
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "amber" | "ghost-dark" | "ghost-light" | "ink";
  external?: boolean;
  className?: string;
}) {
  const tones = {
    amber:
      "bg-amber text-ink shadow-[0_12px_30px_-12px_rgba(47,168,146,0.8)] hover:bg-amber-soft",
    "ghost-dark":
      "border border-bone/30 bg-bone/5 text-bone backdrop-blur hover:bg-bone/15",
    "ghost-light": "border border-ink/25 text-ink hover:bg-ink/5",
    ink: "bg-ink text-bone hover:bg-ink-2",
  } as const;
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const cls = cn(buttonBase, tones[tone], className);
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  return external ? (
    <a href={href} className={cls} {...props}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** ArrowLink — enlace de texto con flecha que se desliza al hover. */
export function ArrowLink({
  href,
  children,
  tone = "amber",
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "amber" | "bone";
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 font-display text-[0.95rem] font-bold",
    tone === "amber" ? "text-amber-deep hover:text-ink" : "text-amber-soft hover:text-bone",
    className,
  );
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
