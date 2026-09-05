import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { BentoRevealGrid } from "@/components/library/bento-reveal-grid";
import { ButtonLink } from "@/components/library/ui";
import { img } from "@/data/images";
import { neighborhoods } from "@/data/neighborhoods";
import { listings } from "@/data/listings";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "Eight Austin neighborhoods we know by heart: Bouldin Creek, Travis Heights, Clarksville, Mueller, East Austin, Tarrytown, Westlake Hills and the Hill Country.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        eyebrow="Neighborhoods"
        title="Eight places we would tell a friend to live."
        intro="Austin has a hundred neighborhoods. We work in the ones we can describe street by street, and we say so when a house is outside them."
        image={img.austinBridge}
        imageAlt="A downtown street at dusk"
      />

      <BentoRevealGrid
        eyebrow="At a glance"
        title="Hover a neighborhood. Then scroll for the long version."
        columns={4}
        items={neighborhoods.map((n, i) => ({
          title: n.name,
          description: n.hook,
          tags: [n.medianPrice, n.commute],
          image: n.image,
          alt: n.alt,
          href: `#${n.slug}`,
          colSpan: i === 0 || i === 5 ? 2 : 1,
        }))}
      />

      {neighborhoods.map((n, i) => {
        const homes = listings.filter((l) => l.neighborhoodSlug === n.slug);
        const reverse = i % 2 === 1;
        return (
          <section
            key={n.slug}
            id={n.slug}
            aria-labelledby={`${n.slug}-title`}
            className={cn("scroll-mt-24 py-16 sm:py-24", i % 2 === 0 ? "bg-paper" : "bg-paper-2")}
          >
            <div className="mx-auto grid w-full max-w-[100rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
              <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-2", reverse && "lg:order-last")}>
                <Image src={n.image} alt={n.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="eyebrow text-amber-deep">{n.hook}</p>
                <h2 id={`${n.slug}-title`} className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
                  {n.name}
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-[1.08rem] leading-relaxed text-ink-soft">{n.description}</p>
                <dl className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-[0.85rem] text-ink-soft">Median price</dt>
                    <dd className="font-display mt-1 text-[1.6rem] font-medium leading-none text-ink">{n.medianPrice}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] text-ink-soft">Commute</dt>
                    <dd className="font-display mt-1 text-[1.6rem] font-medium leading-none text-ink">{n.commute.split(" to ")[0]}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-[0.85rem] text-ink-soft">Feels like</dt>
                    <dd className="mt-1 text-[0.95rem] leading-snug text-ink">{n.vibe.join(", ")}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {homes.length ? (
                    <ButtonLink href={`/listings/${homes[0].slug}`} tone="ink">
                      {homes.length === 1 ? "See our listing here" : `See ${homes.length} listings here`}
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="/contact" tone="ink">Ask about {n.name}</ButtonLink>
                  )}
                  <Link href="/contact" className="inline-flex h-11 items-center font-display font-semibold text-amber-deep underline-offset-4 hover:underline">
                    Book a neighborhood walk
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
