import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BrickParallaxGallery } from "@/components/library/brick-parallax-gallery";
import { MasonryGallery } from "@/components/library/masonry-gallery";
import { img } from "@/data/images";
import { galleries } from "@/data/galleries";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Exteriors, living spaces, kitchens, porches and the city itself. Photographs from Sabine & Oak listings, all clickable to full screen.",
};

export default function GalleryPage() {
  const brick = galleries.flatMap((g) => g.photos.slice(0, 3)).map((p) => ({ src: p.src, alt: p.alt }));
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Fifty rooms, ten porches and one river."
        intro="Photographs from homes we have listed, shot at ten in the morning when the light tells the truth. Click any photo to see it full screen."
        image={img.livingHigh}
        imageAlt="A bright living room with tall windows"
        compact
      >
        <nav aria-label="Gallery sections" className="mt-8 flex flex-wrap gap-2">
          {galleries.map((g) => (
            <a key={g.slug} href={`#${g.slug}`} className="inline-flex h-10 items-center rounded-full border border-bone/35 px-4 text-[0.9rem] text-bone transition hover:bg-bone hover:text-ink">
              {g.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <BrickParallaxGallery photos={brick} rows={2} />

      {galleries.map((g, i) => (
        <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-title`} className={cn("scroll-mt-24 py-16 sm:py-24", i % 2 === 0 ? "bg-paper" : "bg-paper-2")}>
          <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 id={`${g.slug}-title`} className="font-display text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
                  {g.name}
                </h2>
                <p className="mt-3 text-lg text-ink-soft">{g.intro}</p>
              </div>
              <p className="text-[0.95rem] text-ink-soft">{g.photos.length} photos</p>
            </div>
            <MasonryGallery photos={g.photos} />
          </div>
        </section>
      ))}
    </>
  );
}
