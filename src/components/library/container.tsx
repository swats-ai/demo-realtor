import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Container — ancho de contenido estándar de todas las secciones
 * (max 78rem + padding lateral responsivo).
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[100rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
