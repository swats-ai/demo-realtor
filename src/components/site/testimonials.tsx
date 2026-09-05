import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

/**
 * Testimonials — pared de citas en Fraunces. Sin carrusel: tres columnas
 * legibles de una vez, con retrato pequeño y el barrio de la operación.
 */
export function Testimonials({ items, title, eyebrow }: { items: Testimonial[]; title: string; eyebrow?: string }) {
  return (
    <section className="bg-paper-2 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow text-amber-deep">{eyebrow}</p> : null}
          <h2 className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">{title}</h2>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <li key={t.name} className="flex flex-col">
              <blockquote className="flex-1">
                <p className="font-display text-pretty text-[1.35rem] leading-[1.35] text-ink sm:text-[1.5rem]">
                  <span aria-hidden className="text-amber-deep">“</span>
                  {t.quote}
                  <span aria-hidden className="text-amber-deep">”</span>
                </p>
              </blockquote>
              <figure className="mt-6 flex items-center gap-4">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-ink-2">
                  <Image src={t.image} alt="" fill sizes="3rem" className="object-cover" />
                </span>
                <figcaption className="leading-tight">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="mt-0.5 text-[0.9rem] text-ink-soft">{t.detail}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
