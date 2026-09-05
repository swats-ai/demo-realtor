import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { VideoPoster } from "@/components/site/video-poster";
import type { VideoSource } from "@/data/listings";

export type SpotlightMedia =
  | { kind: "image"; src: string; alt?: string; /** Clase object-position. */ pos?: string }
  | {
      kind: "video";
      /** Local, YouTube o Vimeo: poster con botón de play; al pulsar se
       * reproduce en un lightbox a pantalla completa. */
      video: VideoSource;
      poster?: string;
      title: string;
      label?: string;
    };

function MediaFigure({ media }: { media: SpotlightMedia }) {
  if (media.kind === "video") {
    return (
      <VideoPoster
        video={media.video}
        poster={media.poster}
        title={media.title}
        label={media.label}
        className="shadow-[0_34px_80px_-30px_rgba(16,35,31,0.6)]"
      />
    );
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink-2 shadow-[0_34px_80px_-30px_rgba(16,35,31,0.6)]">
      <Image
        src={media.src}
        alt={media.alt ?? ""}
        fill
        sizes="(max-width: 1024px) 100vw, 44vw"
        className={cn("object-cover", media.pos)}
      />
    </div>
  );
}

/**
 * SpotlightBand — banda oscura de foco (patrón ryanserhant.com, sección
 * Speaking): la banda ink sangra hasta un borde del viewport pero queda
 * inset ~22% del otro lado, dejando ver el fondo claro de la página; una
 * tarjeta de media (video click-to-play o foto) se desborda sobre ese borde
 * de la banda, pisando la zona clara. Al otro lado, título grande en
 * mayúsculas, párrafos y botón pill claro. La banda admite una foto de
 * textura muy tenue (skyline en el original).
 *
 * `reverse` invierte el layout: banda sangrada a la izquierda e inset por la
 * derecha, media a la derecha y texto a la izquierda.
 */
export function SpotlightBand({
  eyebrow,
  title,
  children,
  cta,
  media,
  bgImage,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  /** Párrafos del bloque de texto. */
  children?: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
  /** Tarjeta desbordada: video click-to-play o foto. */
  media: SpotlightMedia;
  /** Textura de la banda (se pinta al ~12%). */
  bgImage?: string;
  reverse?: boolean;
}) {
  return (
    <section className="relative bg-paper">
      {/* Banda ink: full-bleed hacia un lado, inset del otro */}
      <div
        className={cn(
          "absolute inset-y-0 overflow-hidden bg-ink",
          reverse ? "left-0 right-0 lg:right-[22%]" : "left-0 right-0 lg:left-[22%]",
        )}
      >
        {bgImage ? (
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="80vw"
            className="object-cover opacity-[0.12]"
          />
        ) : null}
      </div>

      <div className="relative mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20",
            reverse && "lg:grid-cols-[1.1fr_1fr]",
          )}
        >
          {/* Media desbordada sobre el borde inset de la banda */}
          <div className={cn(reverse && "lg:order-last")}>
            <MediaFigure media={media} />
          </div>

          {/* Texto sobre la banda */}
          <div className="text-bone">
            {eyebrow ? <p className="eyebrow text-amber-soft">{eyebrow}</p> : null}
            <h2 className="font-display mt-3 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h2>
            {children ? (
              <div className="mt-5 max-w-xl space-y-4 text-pretty text-[1.05rem] leading-relaxed text-bone/80">
                {children}
              </div>
            ) : null}
            {cta ? (
              <div className="mt-8">
                <a
                  href={cta.href}
                  {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 rounded-full bg-bone px-7 py-3.5 font-display text-[0.95rem] font-bold text-ink transition hover:-translate-y-0.5 hover:bg-amber-soft"
                >
                  {cta.label}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
