import Image from "next/image";
import { Eyebrow } from "./ui";
import { cn } from "@/lib/cn";

import { ContactForm, type FormField } from "@/components/site/forms";

export type { FormField };

/**
 * ImageFormBand — banda de captación con foto full-bleed + formulario glass
 * al lado (patrón tema Lifeon, sección "Book Appointment"): una foto cubre
 * toda la banda oscura redondeada; sobre un costado, un panel de vidrio
 * (blur + borde translúcido) con pill de eyebrow, título con remate en
 * acento, y un formulario en grid de 2 columnas (textarea y submit a ancho
 * completo). El formulario es solo UI hasta pasarle `formAction`.
 */
export function ImageFormBand({
  image,
  imageAlt = "",
  side = "right",
  eyebrow,
  title,
  highlight,
  fields,
  submitLabel = "Send message",
  intro,
}: {
  /** Foto de fondo full-bleed. */
  image: string;
  imageAlt?: string;
  /** Lado del panel de formulario. */
  side?: "left" | "right";
  eyebrow?: string;
  title: string;
  /** Remate del título en acento. */
  highlight?: string;
  fields: FormField[];
  submitLabel?: string;
  /** Párrafo bajo el título. */
  intro?: string;
}) {
  return (
    <section className="bg-paper py-10">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink">
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-ink/70" />

          <div className={cn("relative flex p-5 sm:p-8 lg:p-12", side === "right" ? "justify-end" : "justify-start")}>
            <div className="w-full max-w-xl rounded-3xl border border-bone/15 bg-ink/40 p-7 backdrop-blur-md sm:p-10">
              {eyebrow ? <Eyebrow tone="bone">{eyebrow}</Eyebrow> : null}
              <h2 className="font-display mt-4 text-balance text-3xl font-extrabold leading-[1.05] text-bone sm:text-4xl">
                {title}
                {highlight ? <> <span className="text-amber-soft">{highlight}</span></> : null}
              </h2>

              {intro ? <p className="mt-4 text-[1rem] leading-relaxed text-bone/80">{intro}</p> : null}
              <ContactForm fields={fields} submitLabel={submitLabel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
