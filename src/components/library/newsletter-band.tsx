import Image from "next/image";
import type { ReactNode } from "react";
import { NewsletterForm } from "@/components/site/forms";

/**
 * NewsletterBand — banda de suscripción (patrón vishen.com, sección "What
 * over a million people read to grow"): banda oscura con un glow radial de
 * acento arriba, un panel delineado cuyo borde y relleno se desvanecen hacia
 * abajo (mask), y dentro el título grande, un subrayado en bold, párrafo,
 * formulario de email con botón y nota de privacidad. A la derecha, el
 * retrato en tarjeta redondeada SOLAPA el panel y sobresale verticalmente de
 * él.
 *
 * El formulario es solo UI: pásale `formAction` cuando haya backend.
 */
export function NewsletterBand({
  title,
  highlight,
  children,
  image,
  imageAlt = "",
  placeholder = "Your email",
  buttonLabel = "Subscribe",
  note,
}: {
  title: string;
  /** Línea en bold bajo el título (el gancho del newsletter). */
  highlight?: string;
  /** Párrafo(s) bajo el highlight. */
  children?: ReactNode;
  /** Retrato/foto de la tarjeta derecha. */
  image: string;
  imageAlt?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Nota pequeña bajo el form (p. ej. privacidad). */
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      {/* Glow radial de acento */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(70%_90%_at_50%_0%,rgba(47,168,146,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[100rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-0">
        {/* Panel delineado que se desvanece hacia abajo */}
        <div className="relative p-8 sm:p-12 lg:pr-24">
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl border border-bone/25 bg-gradient-to-b from-bone/[0.07] to-transparent [mask-image:linear-gradient(to_bottom,#000_55%,transparent_96%)]"
          />
          <div className="relative">
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.05] text-bone sm:text-4xl lg:text-[2.9rem]">
              {title}
            </h2>
            {highlight ? (
              <p className="mt-5 max-w-xl text-pretty text-[1.08rem] font-bold leading-relaxed text-bone">
                {highlight}
              </p>
            ) : null}
            {children ? (
              <div className="mt-4 max-w-xl space-y-3 text-pretty text-[1.02rem] leading-relaxed text-bone/75">
                {children}
              </div>
            ) : null}

            <NewsletterForm placeholder={placeholder} buttonLabel={buttonLabel} />
            {note ? (
              <p className="mt-3 text-[0.82rem] text-bone/60">{note}</p>
            ) : null}
          </div>
        </div>

        {/* Retrato: solapa el panel y sobresale verticalmente */}
        <div className="relative z-10 lg:-ml-16 lg:-my-10">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_34px_80px_-30px_rgba(0,0,0,0.7)] lg:max-w-none">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 34vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
