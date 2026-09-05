import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { Eyebrow, ArrowLink } from "./ui";
import { cn } from "@/lib/cn";

export type BlogPost = {
  title: string;
  href: string;
  image: string;
  alt?: string;
  category?: string;
  /** Fecha o meta corta (p. ej. "12 Ago 2026 · 5 min"). */
  meta?: string;
  /** Extracto (solo se muestra en el featured). */
  excerpt?: string;
};

function CategoryDate({
  category,
  meta,
  tone = "light",
}: {
  category?: string;
  meta?: string;
  tone?: "light" | "dark";
}) {
  if (!category && !meta) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {category ? (
        <span className="rounded-full bg-amber px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-wide text-ink">
          {category}
        </span>
      ) : null}
      {meta ? (
        <span
          className={cn(
            "font-mono text-[0.7rem] uppercase tracking-[0.12em]",
            tone === "dark" ? "text-bone/60" : "text-ink-soft",
          )}
        >
          {meta}
        </span>
      ) : null}
    </div>
  );
}

/**
 * FeaturedAsideBlog — sección de blog con el post destacado A UN LADO en vez
 * de arriba (patrón tema DotLife): cabecera con eyebrow + título y enlace
 * "ver todos"; debajo, dos columnas — el post FEATURED grande (foto, categoría,
 * meta, título grande, extracto, read-more) ocupa un lado, y una lista
 * vertical de posts secundarios compactos (miniatura + categoría/meta +
 * título, separados por hairlines) el otro. `featuredSide` cambia el lado.
 * Server component.
 */
export function FeaturedAsideBlog({
  eyebrow,
  title,
  link,
  featured,
  posts,
  featuredSide = "left",
}: {
  eyebrow?: string;
  title?: string;
  /** Enlace "ver todos" junto al título. */
  link?: { label: string; href: string };
  /** Post destacado. */
  featured: BlogPost;
  /** Posts secundarios de la lista lateral. */
  posts: BlogPost[];
  featuredSide?: "left" | "right";
}) {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        {(eyebrow || title || link) && (
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              {title ? (
                <h2 className="font-display mt-3 text-balance text-3xl font-extrabold leading-[1.05] text-ink sm:text-4xl">
                  {title}
                </h2>
              ) : null}
            </div>
            {link ? <ArrowLink href={link.href}>{link.label}</ArrowLink> : null}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Featured */}
          <Link
            href={featured.href}
            className={cn("group flex flex-col", featuredSide === "right" && "lg:order-last")}
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-ink-2">
              <Image
                src={featured.image}
                alt={featured.alt ?? featured.title}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <CategoryDate category={featured.category} meta={featured.meta} />
              <h3 className="font-display mt-4 text-balance text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-amber-deep sm:text-3xl">
                {featured.title}
              </h3>
              {featured.excerpt ? (
                <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-amber-deep">
                Read more
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* Lista lateral */}
          <div className="flex flex-col divide-y divide-ink/10">
            {posts.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className={cn("group flex gap-5 py-5", i === 0 && "pt-0")}
              >
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-ink-2 sm:w-36">
                  <Image
                    src={p.image}
                    alt={p.alt ?? p.title}
                    fill
                    sizes="9rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 self-center">
                  <CategoryDate category={p.category} meta={p.meta} />
                  <h4 className="font-display mt-2 text-balance text-lg font-bold leading-snug text-ink transition-colors group-hover:text-amber-deep">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
