import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";
import { ButtonLink, Eyebrow } from "./ui";
import { VideoPoster } from "@/components/site/video-poster";
import type { VideoSource } from "@/data/listings";
import { cn } from "@/lib/cn";

/**
 * Contenido de cada recuadro del díptico: foto, video o tile de texto sólido.
 */
export type DiptychMedia =
  | { kind: "image"; src: string; alt?: string; /** Clase object-position. */ pos?: string }
  | {
      kind: "video";
      /** Local, YouTube o Vimeo: poster + play, se reproduce en lightbox. */
      video: VideoSource;
      poster?: string;
      title: string;
      label?: string;
    }
  | { kind: "text"; eyebrow?: string; title: string; body?: string };

export type DiptychStat = { value: string; label: string };

/*
  Fusión (patrón tonyrobbins.com): los dos recuadros se tocan esquina con
  esquina en diagonal, y cada uno lleva un overlay de gradiente que funde su
  contenido en el color de acento justo en la esquina de contacto — el acento
  es la soldadura que los une y difumina uno dentro del otro. En móvil los
  recuadros se apilan y los gradientes pasan a verticales.
  El recuadro de la fila superior funde su esquina inferior (derecha en
  desktop); el de la fila inferior, su esquina superior (izquierda).
*/
const fuseUpper =
  "pointer-events-none absolute inset-0 [background:linear-gradient(to_bottom,transparent_50%,var(--color-amber))] md:[background:linear-gradient(to_right_bottom,transparent_70%,var(--color-amber)_90%)]";
const fuseLower =
  "pointer-events-none absolute inset-0 [background:linear-gradient(to_top,transparent_50%,var(--color-amber))] md:[background:linear-gradient(to_left_top,transparent_70%,var(--color-amber)_90%)]";

function MediaBox({
  media,
  tone,
  aspectClassName,
  fuse,
}: {
  media: DiptychMedia;
  tone: "dark" | "light";
  aspectClassName: string;
  /** Fila del recuadro: decide hacia qué esquina funde su gradiente. */
  fuse: "upper" | "lower";
}) {
  const fuseClass = fuse === "upper" ? fuseUpper : fuseLower;
  // La esquina de contacto va sin radio: su color se continúa con el parche
  // del GooJoint sin costura, y el menisco lo dibujan los círculos del joint.
  const junction = fuse === "upper" ? "md:rounded-br-none" : "md:rounded-tl-none";

  if (media.kind === "text") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-center overflow-hidden rounded-2xl p-8 sm:p-10",
          junction,
          aspectClassName,
          tone === "dark" ? "bg-amber text-ink" : "bg-ink text-bone",
        )}
      >
        {/* En el tile amber el overlay es invisible (amber sobre amber),
            igual que en el original; en el tile ink suelda la esquina. */}
        {tone === "light" ? <div aria-hidden className={fuseClass} /> : null}
        <div className="relative">
          {media.eyebrow ? (
            <p className={cn("eyebrow", tone === "dark" ? "text-ink/60" : "text-amber-soft")}>
              {media.eyebrow}
            </p>
          ) : null}
          <p className="font-display mt-3 text-balance text-2xl font-bold leading-tight sm:text-3xl">
            {media.title}
          </p>
          {media.body ? (
            <p className={cn("mt-3 text-base leading-relaxed", tone === "dark" ? "text-ink/80" : "text-bone/80")}>
              {media.body}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <div className={cn("relative w-full", aspectClassName)}>
        <VideoPoster
          video={media.video}
          poster={media.poster}
          title={media.title}
          label={media.label}
          aspectClassName="absolute inset-0"
          rounded={cn("rounded-2xl", junction)}
        />
        <div aria-hidden className={cn(fuseClass, "pointer-events-none rounded-2xl", junction)} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-ink-2",
        junction,
        aspectClassName,
      )}
    >
      <Image
        src={media.src}
        alt={media.alt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        className={cn("object-cover", media.pos)}
      />
      <div aria-hidden className={fuseClass} />
    </div>
  );
}

/**
 * GooJoint — el cuello de "queso fundido" que suelda los dos recuadros
 * (mecanismo exacto del original): un parche amber de 80×80 centrado en la
 * esquina de unión, recortado por dos círculos del color del fondo de la
 * sección en los cuadrantes libres. Lo que queda del parche rellena los
 * notches de los radios de ambos recuadros y forma un menisco cóncavo — las
 * dos "gotas" quedan conectadas por un cuello líquido. Se pinta después del
 * recuadro chico y antes del grande en el DOM: cubre la esquina (ya fundida a
 * amber sólido por el gradiente) del chico y queda bajo el radio del grande.
 */
function GooJoint({
  corner,
  dark,
}: {
  /** Esquina del recuadro grande donde ocurre la unión. */
  corner: "top-left" | "bottom-right";
  dark: boolean;
}) {
  const holeBg = dark ? "bg-ink" : "bg-paper";
  return (
    <div
      aria-hidden
      className={cn(
        "absolute hidden h-20 w-20 bg-amber md:block",
        corner === "top-left"
          ? "left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          : "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
      )}
    >
      <div className={cn("absolute h-20 w-20 -translate-y-1/2 translate-x-1/2 rounded-full", holeBg)} />
      <div className={cn("absolute h-20 w-20 -translate-x-1/2 translate-y-1/2 rounded-full", holeBg)} />
    </div>
  );
}

/**
 * MediaDiptych — sección de dos recuadros redondeados fusionados (adaptación
 * del patrón tonyrobbins.com): uno grande (2/3, aspect-video) y uno chico
 * (1/3) en filas opuestas, tocándose esquina con esquina en diagonal. Cada
 * recuadro funde su contenido en el color de acento justo en la esquina de
 * contacto mediante un overlay de gradiente — el acento suelda los dos
 * recuadros y una media se difumina dentro de la otra. El título y el
 * contenido (stats en grid de 2, párrafos, botones pill) ocupan las celdas
 * complementarias.
 *
 * Cada recuadro acepta foto, video (autoplay muted loop, botón glass centrado
 * opcional) o un tile de texto sólido — cualquier combinación.
 *
 * Dos layouts con `bigPosition`:
 * - `"bottom"` (la sección "Expert guidance" de TR): fila 1 = chico
 *   (izquierda, pegado abajo) + título · fila 2 = contenido + grande.
 * - `"top"` (la sección "Do you have a hunger" de TR): título full-width ·
 *   fila 1 = grande + contenido · fila 2 = `secondary` opcional + chico
 *   (derecha).
 */
export function MediaDiptych({
  eyebrow,
  title,
  big,
  small,
  bigPosition = "bottom",
  tone = "dark",
  stats,
  children,
  ctas,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  /** Recuadro grande (2/3 del ancho). */
  big: DiptychMedia;
  /** Recuadro chico (1/3 del ancho), soldado en diagonal al grande. */
  small: DiptychMedia;
  /** Posición del recuadro grande: fila de abajo o de arriba. */
  bigPosition?: "top" | "bottom";
  tone?: "dark" | "light";
  /** Cifras en grid de 2 columnas dentro de la columna de contenido. */
  stats?: DiptychStat[];
  /** Párrafos de la columna de contenido. */
  children?: ReactNode;
  /** Botones pill bajo el texto. */
  ctas?: { label: string; href: string; external?: boolean }[];
  /** Solo con bigPosition="top": contenido de la celda 2/3 junto al chico. */
  secondary?: ReactNode;
}) {
  const dark = tone === "dark";

  const content = (
    <div>
      {stats?.length ? (
        <div className="grid grid-cols-2 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1 text-balance">
              <p className={cn("font-display text-3xl font-bold", dark ? "text-amber-soft" : "text-amber-deep")}>
                {s.value}
              </p>
              <p className={cn("text-base font-medium leading-tight", dark ? "text-bone/80" : "text-ink-soft")}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {children ? (
        <div
          className={cn(
            "space-y-4 text-pretty text-[1.05rem] leading-relaxed",
            !!stats?.length && "mt-6",
            dark ? "text-bone/80" : "text-ink-soft",
          )}
        >
          {children}
        </div>
      ) : null}
      {ctas?.length ? (
        <div className="mt-7 flex flex-wrap gap-3">
          {ctas.map((c) => (
            <ButtonLink
              key={c.label}
              href={c.href}
              external={c.external}
              tone={dark ? "amber" : "ink"}
            >
              {c.label}
            </ButtonLink>
          ))}
        </div>
      ) : null}
    </div>
  );

  const bigAspect = "aspect-square md:aspect-video";
  const smallAspect = "aspect-video";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20",
        dark ? "bg-ink text-bone" : "bg-paper text-ink",
      )}
    >
      <Container>
        {bigPosition === "bottom" ? (
          <>
            {/* Fila 1 — chico (izquierda, pegado abajo) + título.
                Sin padding en la celda del recuadro: su esquina inferior
                derecha debe tocar la superior izquierda del grande. */}
            <div className="flex flex-col items-stretch md:flex-row">
              <div className="relative z-10 flex h-auto w-full items-end md:w-1/3">
                <MediaBox media={small} tone={tone} aspectClassName={smallAspect} fuse="upper" />
              </div>
              <div className="relative z-10 order-first flex w-full items-center py-5 md:order-last md:w-2/3 md:p-10">
                <div>
                  {eyebrow ? <Eyebrow tone={dark ? "bone" : "amber"}>{eyebrow}</Eyebrow> : null}
                  <h2 className="font-display mt-3 text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                    {title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Espaciador solo-móvil entre los recuadros apilados */}
            <div aria-hidden className="h-5 md:hidden" />

            {/* Fila 2 — contenido + grande */}
            <div className="flex flex-col md:flex-row">
              <div className="relative z-10 order-last w-full py-5 md:order-first md:w-1/3 md:p-10 md:pl-0">
                {content}
              </div>
              <div className="relative w-full md:w-2/3">
                <GooJoint corner="top-left" dark={dark} />
                <MediaBox media={big} tone={tone} aspectClassName={bigAspect} fuse="lower" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Título full-width arriba */}
            {eyebrow ? <Eyebrow tone={dark ? "bone" : "amber"}>{eyebrow}</Eyebrow> : null}
            <h2 className="font-display mb-8 mt-3 max-w-4xl text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[3.2rem] md:mb-12">
              {title}
            </h2>

            {/* Fila 1 — grande + contenido */}
            <div className="flex flex-col md:flex-row">
              <div className="relative flex w-full items-end md:w-2/3">
                <GooJoint corner="bottom-right" dark={dark} />
                <MediaBox media={big} tone={tone} aspectClassName={bigAspect} fuse="upper" />
              </div>
              <div className="relative z-10 order-first w-full py-5 md:order-last md:w-1/3 md:p-10 md:pr-0">
                {content}
              </div>
            </div>

            <div aria-hidden className="h-5 md:hidden" />

            {/* Fila 2 — secondary + chico (derecha, bajo la esquina del grande) */}
            <div className="flex flex-col md:flex-row">
              <div className="relative z-10 flex h-auto w-full md:order-last md:ml-auto md:w-1/3">
                <MediaBox media={small} tone={tone} aspectClassName={smallAspect} fuse="lower" />
              </div>
              {secondary ? (
                <div className="relative z-10 order-last flex w-full flex-col justify-center py-5 md:order-first md:w-2/3 md:p-10 md:pl-0">
                  {secondary}
                </div>
              ) : null}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
