import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Logo — marca (roble bajo un gablete, generada con Recraft V3 SVG vía
 * Replicate) + wordmark en Fraunces. La marca es un SVG usado como máscara
 * CSS, así que hereda `currentColor` y sirve en claro y oscuro.
 */
export function Logo({
  className,
  markClassName = "size-10",
  withText = true,
}: {
  className?: string;
  markClassName?: string;
  withText?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={cn("inline-flex items-center gap-3 text-current", className)}
    >
      <span aria-hidden className={cn("brand-mark shrink-0", markClassName)} />
      {withText ? (
        <span className="font-display text-[1.45rem] font-medium leading-none tracking-[-0.01em]">
          Sabine <span className="italic font-normal">&amp;</span> Oak
        </span>
      ) : null}
    </Link>
  );
}
