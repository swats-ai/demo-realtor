"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Header — full-width fijo. Transparente con texto claro sobre el hero;
 * al hacer scroll pasa a caliza translúcida con texto pino. El contenido
 * interior respeta el mismo max-width del body (100rem). En móvil abre un
 * panel a pantalla completa con los enlaces en Fraunces.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al navegar (sin efecto: se deriva del cambio de ruta).
  const [openPath, setOpenPath] = useState(pathname);
  if (open && openPath !== pathname) {
    setOpen(false);
    setOpenPath(pathname);
  }
  // Bloquea el scroll del body mientras el menú está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500",
        solid ? "bg-paper/90 text-ink shadow-[0_1px_0_rgba(16,35,31,0.08)] backdrop-blur-md" : "bg-transparent text-bone",
        open && "bg-ink text-bone",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[100rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center px-4 text-[0.95rem] font-medium transition-colors",
                      "after:absolute after:inset-x-4 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                      active && "after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden text-[0.95rem] font-medium xl:inline-flex xl:h-11 xl:items-center xl:px-2"
          >
            {site.phone}
          </a>
          <Link
            href="/contact"
            className={cn(
              "hidden h-11 items-center rounded-full px-5 font-display text-[0.95rem] font-semibold transition sm:inline-flex hover:-translate-y-0.5",
              solid ? "bg-ink text-bone hover:bg-ink-2" : "bg-bone text-ink hover:bg-amber-soft",
            )}
          >
            Talk to us
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpenPath(pathname);
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-current/30 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panel móvil */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ink text-bone lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto w-full max-w-[100rem] px-5 py-8 sm:px-8">
          <ul className="divide-y divide-bone/10">
            {nav.map((item, idx) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href} style={{ animationDelay: `${idx * 50}ms` }} className={open ? "animate-fade-up" : ""}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="font-display flex items-center justify-between py-5 text-[2rem] font-medium leading-none"
                  >
                    {item.label}
                    {active ? <span aria-hidden className="size-2 rounded-full bg-amber-soft" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-bone/80">
            <a href={site.phoneHref} className="text-lg">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="text-lg">{site.email}</a>
            <Link href="/contact" className="mt-4 inline-flex h-12 w-fit items-center rounded-full bg-amber px-6 font-display font-semibold text-ink">
              Talk to us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
