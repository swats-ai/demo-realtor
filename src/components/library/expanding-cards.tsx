"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "./ui";

export type ExpandingCardItem = {
  title: string;
  desc: string;
  href?: string;
  cta?: string;
  image: string;
  alt: string;
};

/**
 * ExpandingCards — acordeón horizontal de hover en una sola fila. Todos los
 * items comparten la fila, cada uno con foto de fondo. Solo una tarjeta está
 * expandida a la vez: las colapsadas muestran el título rotado 90°; al hover
 * la tarjeta crece, el título rota de vuelta y el texto + CTA aparecen en
 * fade. En móvil se apilan en vertical (acordeón por tap).
 */
export function ExpandingCards({
  eyebrow,
  title,
  intro,
  items,
  footerText,
  footerCta,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ExpandingCardItem[];
  /** Línea de cierre centrada bajo las tarjetas. */
  footerText?: string;
  footerCta?: { label: string; href: string };
}) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto w-full max-w-[100rem] px-5 sm:px-8">
        <SectionHeading
          tone="bone"
          align="center"
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />
      </div>
      <div className="relative mt-12 w-full px-3 sm:px-5">
        <div className="flex h-[52rem] flex-col gap-3 lg:h-[30rem] lg:flex-row">
          {items.map((item, i) => {
            const expanded = i === active;
            return (
              <div
                key={item.title}
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                aria-label={item.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="relative min-h-14 min-w-0 cursor-pointer overflow-hidden rounded-[1.4rem] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] lg:min-h-0"
                style={{ flexGrow: expanded ? 6 : 1, flexBasis: 0 }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    expanded ? "scale-100" : "scale-110"
                  }`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <h3
                    className={`font-display origin-bottom-left whitespace-nowrap text-lg font-bold text-bone will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] sm:text-xl ${
                      expanded ? "rotate-0" : "lg:-rotate-90 lg:translate-x-1"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      expanded
                        ? "grid-rows-[1fr] opacity-100 delay-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="mt-3 max-w-xl text-[1rem] leading-7 text-bone/85">
                        {item.desc}
                      </p>
                      {item.href && item.cta && (
                        <Link
                          href={item.href}
                          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-2.5 font-display text-sm font-bold text-ink transition-colors hover:bg-amber-soft"
                        >
                          {item.cta}
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {(footerText || footerCta) && (
          <div className="mt-12 flex flex-col items-center gap-5 text-center">
            {footerText && (
              <p className="font-display text-xl font-bold text-bone sm:text-2xl">
                {footerText}
              </p>
            )}
            {footerCta && (
              <Link
                href={footerCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 font-display text-sm font-bold text-ink transition-colors hover:bg-amber-soft"
              >
                {footerCta.label}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
