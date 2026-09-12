import { HeroSliderMinimal } from "@/components/library/hero-slider-minimal";
import { EditorialSplit } from "@/components/library/editorial-split";
import { AnimatedStatsStrip } from "@/components/library/stats-strip";
import { StackingCards } from "@/components/library/stacking-cards";
import { ExpandingCards } from "@/components/library/expanding-cards";
import { SpotlightBand } from "@/components/library/spotlight-band";
import { BrickParallaxGallery } from "@/components/library/brick-parallax-gallery";
import { StepsMediaBand } from "@/components/library/steps-media-band";
import { FeaturedAsideBlog } from "@/components/library/featured-aside-blog";
import { NewsletterBand } from "@/components/library/newsletter-band";
import { ImageFormBand } from "@/components/library/image-form-band";
import { ArrowLink } from "@/components/library/ui";
import { Marquee } from "@/components/site/marquee";
import { Testimonials } from "@/components/site/testimonials";
import { ChatIcon, CompassIcon, KeyIcon } from "@/components/site/icons";
import { img } from "@/data/images";
import { featuredListings, formatPrice, statusLabel } from "@/data/listings";
import { neighborhoods } from "@/data/neighborhoods";
import { testimonials } from "@/data/testimonials";
import { homeGallery } from "@/data/galleries";
import { posts, formatDate } from "@/data/posts";

export default function HomePage() {
  const slides = [
    ...featuredListings.map((l) => ({
      image: l.hero,
      eyebrow: `${l.neighborhood}, ${formatPrice(l.price)}`,
      title: l.headline,
      text: l.description[0].split(". ").slice(0, 1).join(". ") + ".",
      navLabel: l.name,
      href: `/listings/${l.slug}`,
    })),
    {
      image: "/home/hero-new-construction.jpg",
      eyebrow: "New construction, Austin",
      title: "Brand-new brick, a two-car garage and room to grow.",
      text: "A freshly built home on a quiet Austin street, ready for its first morning.",
      navLabel: "New construction",
      href: "/listings",
    },
  ];

  return (
    <>
      <HeroSliderMinimal slides={slides} cta={{ label: "Browse all homes", href: "/listings" }} />

      <Marquee label="Neighborhoods we work in" items={neighborhoods.map((n) => n.name)} />

      <EditorialSplit
        eyebrow="Who we are"
        title="We say no to nine houses so you can say yes to one."
        image={img.marisol}
        imageAlt="Marisol Reyes, broker and founder, on the porch of a Bouldin Creek bungalow"
        imagePos="object-top"
        stat={{ value: "21 yrs", label: "walking Austin's streets before pricing a single one of them" }}
        ctas={[
          { label: "Meet the team", href: "/about" },
          { label: "Our neighborhoods", href: "/neighborhoods", ghost: true },
        ]}
      >
        <p>
          Sabine &amp; Oak is a boutique brokerage of four agents and one very good coffee machine, on Sabine Street in the heart of Austin. We are small on purpose.
        </p>
        <p>
          Every client works with a partner, not a team lead. Every listing is walked, priced and photographed by the person who will sell it. And every buyer hears the word no from us before they ever hear it from a lender.
        </p>
      </EditorialSplit>

      <section aria-labelledby="numbers" className="bg-paper pb-8">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <h2 id="numbers" className="sr-only">By the numbers</h2>
          <AnimatedStatsStrip
            stats={[
              { target: 612, label: "homes closed since 2005" },
              { target: 11, label: "median days on market, 2026" },
              { target: 103, suffix: "%", label: "average sale to list price" },
              { target: 96, suffix: "%", label: "of clients who send us a friend" },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="featured" className="bg-paper py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-amber-deep">Featured this month</p>
              <h2 id="featured" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
                Four homes we would buy ourselves.
              </h2>
            </div>
            <ArrowLink href="/listings">See all homes</ArrowLink>
          </div>
          <StackingCards
            items={featuredListings.map((l) => ({
              pill: statusLabel[l.status],
              meta: l.neighborhood,
              eyebrow: formatPrice(l.price),
              title: l.name,
              body: l.headline,
              facts: [
                { text: `${l.beds} bedrooms, ${l.baths} baths, ${l.sqft.toLocaleString("en-US")} square feet` },
                { text: `${l.address}${l.lot ? `, ${l.lot}` : ""}` },
                { text: `Built ${l.year}` },
              ],
              image: l.hero,
              alt: l.heroAlt,
              href: `/listings/${l.slug}`,
              cta: "See the home",
            }))}
          />
        </div>
      </section>

      <ExpandingCards
        eyebrow="Where"
        title="Pick a street. We know the one next to it too."
        intro="Eight neighborhoods we work in most, and the reason people stay in each one."
        items={neighborhoods.slice(0, 5).map((n) => ({
          title: n.name,
          desc: n.hook + " " + n.vibe.join(", ") + ". " + n.commute + ".",
          href: `/neighborhoods#${n.slug}`,
          cta: "Explore",
          image: n.image,
          alt: n.alt,
        }))}
        footerText="Three more, and the whole Hill Country, on the neighborhoods page."
        footerCta={{ label: "All neighborhoods", href: "/neighborhoods" }}
      />

      <SpotlightBand
        eyebrow="Watch"
        title="Two minutes on how we work"
        media={{
          kind: "video",
          video: { provider: "youtube", id: "aqz-KE-bpKQ" },
          poster: img.meetingTable,
          title: "How Sabine & Oak works with buyers and sellers",
          label: "Play the film",
        }}
        bgImage={img.austinSkyline}
        cta={{ label: "Start a conversation", href: "/contact" }}
      >
        <p>
          No scripts, no pressure, no twelve-person team you will never meet. Marisol explains what a boutique brokerage actually does differently, and why it matters most in the weeks nobody talks about: the option period, the appraisal, the last walk-through.
        </p>
      </SpotlightBand>

      <section aria-labelledby="gallery" className="bg-paper pt-20 sm:pt-28">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-amber-deep">From our listings</p>
              <h2 id="gallery" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
                Rooms we have had the privilege to hand over.
              </h2>
            </div>
            <ArrowLink href="/gallery">Full gallery</ArrowLink>
          </div>
        </div>
        {/* Galería a sangre: las filas desbordan el viewport y viajan en parallax */}
        <BrickParallaxGallery photos={homeGallery} rows={2} className="pb-20 sm:pb-28" />
      </section>

      <StepsMediaBand
        eyebrow="How it works"
        title="Buying with us, in three unhurried steps."
        image={img.signing}
        imageAlt="Client and agent reviewing documents at a wooden table"
        cta={{ label: "Book a first conversation", href: "/contact" }}
        steps={[
          {
            icon: <ChatIcon />,
            label: "Step 1",
            title: "We listen first",
            description: "An hour over coffee, no houses. What you need, what you think you want, and what your budget really is once taxes and insurance are honest.",
          },
          {
            icon: <CompassIcon />,
            label: "Step 2",
            title: "We tour with intent",
            description: "Six homes, not sixteen. We walk each one before you do, so the tour is about how it feels, not whether the roof leaks.",
          },
          {
            icon: <KeyIcon />,
            label: "Step 3",
            title: "We close it properly",
            description: "Inspection strategy, appraisal gaps, repair credits and the final walk-through. The boring part is where we earn our fee.",
          },
        ]}
      >
        <p>
          Most of what a good agent does happens after you fall in love with a house. Here is the shape of the whole thing, start to keys.
        </p>
      </StepsMediaBand>

      <Testimonials eyebrow="In their words" title="Clients, unedited." items={testimonials.slice(0, 3)} />

      <FeaturedAsideBlog
        eyebrow="The Journal"
        title="Notes from the field."
        link={{ label: "All articles", href: "/blog" }}
        featured={{
          title: posts[0].title,
          href: `/blog/${posts[0].slug}`,
          image: posts[0].image,
          alt: posts[0].alt,
          category: posts[0].category,
          meta: `${formatDate(posts[0].date)}, ${posts[0].readingTime}`,
          excerpt: posts[0].excerpt,
        }}
        posts={posts.slice(1, 5).map((p) => ({
          title: p.title,
          href: `/blog/${p.slug}`,
          image: p.image,
          alt: p.alt,
          category: p.category,
          meta: `${formatDate(p.date)}, ${p.readingTime}`,
        }))}
      />

      <NewsletterBand
        title="One letter a month. What sold, what did not, and why."
        highlight="No listings spam. Just the market, explained by people who work in it."
        image={img.theo}
        imageAlt="Theo Lindqvist reviewing a floor plan"
        note="Unsubscribe any time. We never share your address."
      >
        <p>
          Theo writes it. Marisol edits it. It goes out on the first, and it is the only email you will get from us that you did not ask for directly.
        </p>
      </NewsletterBand>

      <ImageFormBand
        image={img.frontDoor}
        imageAlt="A lit front entrance of a house at dusk"
        eyebrow="Say hello"
        title="Tell us what you are looking for."
        intro="Or what you are letting go of. Either way, a person replies within a business day."
        fields={[
          { name: "name", label: "Full name", required: true, autoComplete: "name" },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "interest", label: "I am looking to", type: "select", options: ["Buy", "Sell", "Both", "Just talk"] },
          { name: "message", label: "Tell us a little more", type: "textarea", full: true },
        ]}
        submitLabel="Send message"
      />

    </>
  );
}
