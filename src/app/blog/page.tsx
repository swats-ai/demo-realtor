import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { FeaturedAsideBlog } from "@/components/library/featured-aside-blog";
import { NewsletterBand } from "@/components/library/newsletter-band";
import { img } from "@/data/images";
import { posts, formatDate } from "@/data/posts";
import { getAgent } from "@/data/agents";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Notes from the field: how to read a listing, how to price a home, what changed in the Austin market this season, and a Saturday in Bouldin Creek.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="What we tell clients over coffee, written down."
        intro="Buying, selling, the market and the neighborhoods, from the four people who work in them every day. One or two a month, no filler."
        image={img.desk}
        imageAlt="A desk with a notebook, a coffee and a stack of papers"
        compact
      />

      <FeaturedAsideBlog
        eyebrow="Latest"
        title="Start here."
        featured={{
          title: featured.title,
          href: `/blog/${featured.slug}`,
          image: featured.image,
          alt: featured.alt,
          category: featured.category,
          meta: `${formatDate(featured.date)}, ${featured.readingTime}`,
          excerpt: featured.excerpt,
        }}
        posts={rest.slice(0, 4).map((p) => ({
          title: p.title,
          href: `/blog/${p.slug}`,
          image: p.image,
          alt: p.alt,
          category: p.category,
          meta: `${formatDate(p.date)}, ${p.readingTime}`,
        }))}
      />

      <section aria-labelledby="all-posts" className="bg-paper-2 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <h2 id="all-posts" className="font-display text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
            Every article
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((p) => {
              const author = getAgent(p.authorSlug);
              return (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-bone">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
                      <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.85rem] text-ink-soft">
                        <span className="italic text-amber-deep">{p.category}</span>, {formatDate(p.date)}
                      </p>
                      <h3 className="font-display mt-3 text-balance text-[1.45rem] font-medium leading-[1.2] text-ink transition-colors group-hover:text-amber-deep">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
                      <p className="mt-auto pt-5 text-[0.85rem] text-ink-soft">
                        {author?.name}, {p.readingTime}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <NewsletterBand
        title="Get the Journal by email."
        highlight="One letter a month, written by Theo and edited by Marisol."
        image={img.theo}
        imageAlt="Theo Lindqvist reviewing a floor plan"
        note="Unsubscribe any time. We never share your address."
      >
        <p>What sold, what did not, what the rates did and what we think comes next.</p>
      </NewsletterBand>
    </>
  );
}
