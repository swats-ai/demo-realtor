import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { EditorialSplit } from "@/components/library/editorial-split";
import { CrossDividerGrid } from "@/components/library/cross-divider-grid";
import { StatsStrip } from "@/components/library/stats-strip";
import { ScrollGrowShowcase } from "@/components/library/scroll-grow-showcase";
import { MediaDiptych } from "@/components/library/media-diptych";
import { ButtonLink } from "@/components/library/ui";
import { AgentCard } from "@/components/site/agent-card";
import { Testimonials } from "@/components/site/testimonials";
import { img } from "@/data/images";
import { agents } from "@/data/agents";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sabine & Oak is a four-agent boutique brokerage on Sabine Street in Austin. Small on purpose, fluent in eight neighborhoods, and honest about the ninth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sabine & Oak"
        title="Small on purpose. Fluent in every street."
        intro="Four agents, one office, twenty-one years of Austin closings. We built a brokerage that fits in a room because that is where the real conversations happen."
        image={img.streetOaks}
        imageAlt="A street lined with mature live oaks in Central Austin"
      />

      <EditorialSplit
        eyebrow="The founder"
        title="Marisol grew up three blocks from the office."
        image={img.marisol}
        imageAlt="Marisol Reyes, broker and founder"
        imagePos="object-top"
        stat={{ value: "612", label: "closings, every one of them walked in person first" }}
        ctas={[{ label: "Work with Marisol", href: "/contact" }]}
      >
        <p>
          On a street that has been renamed twice since. She got her license in 2005, opened Sabine &amp; Oak in 2012, and has turned down three offers to sell the firm to larger brokerages, the last one over a very good lunch.
        </p>
        <p>
          The name is a street and a tree: the Sabine Street office, and the live oaks that shade most of the neighborhoods we work in. The logic is simple. Know the block. Respect what was here first. Do not rush.
        </p>
      </EditorialSplit>

      <section aria-labelledby="values" className="bg-ink py-20 text-bone sm:py-28">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-amber-soft">How we work</p>
            <h2 id="values" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] sm:text-[3rem]">
              Four things we will not compromise on.
            </h2>
          </div>
          <div className="mt-12">
            <CrossDividerGrid
              cols={4}
              items={[
                { title: "One partner, start to keys", body: "You work with the agent you met, not a coordinator you did not. That person prices, shows, negotiates and answers the 10pm text." },
                { title: "We walk it before we price it", body: "Every listing is walked in person, at ten in the morning when the light is honest, before a number is ever discussed." },
                { title: "The word no", body: "If a house is wrong for you, we say so before you make an offer. If a price is wrong for the market, we say so before you list." },
                { title: "The boring weeks matter most", body: "Option periods, appraisals, repair credits, walk-throughs. Deals are won and lost there, and that is where we spend our attention." },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="team" className="bg-paper py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-amber-deep">The team</p>
            <h2 id="team" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
              Four people. Eight neighborhoods. One phone number.
            </h2>
          </div>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {agents.map((a) => (
              <li key={a.slug}>
                <AgentCard agent={a} />
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${a.name} focus areas`}>
                  {a.focus.map((f) => (
                    <li key={f} className="rounded-full border border-ink/15 px-3 py-1 text-[0.8rem] text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <StatsStrip
              tone="light"
              stats={[
                { value: "2005", label: "first closing" },
                { value: "4", label: "agents, no assistants" },
                { value: "$1.2B", label: "in homes sold" },
                { value: "8", label: "neighborhoods we know by heart" },
              ]}
            />
          </div>
        </div>
      </section>

      <ScrollGrowShowcase
        eyebrow="Why Austin"
        title="A city that still fits under its trees."
        lead="Austin doubled while we watched. What did not change: the oaks, the springs, the porches, and the habit of knowing your neighbors. We sell the houses. The city sells itself."
        image={img.austinRiver}
        imageAlt="A river running through a green valley at dawn"
        aside={{
          image: img.oakTree,
          alt: "A single live oak in a field",
          text: "The Treaty Oak on Baylor Street is roughly five hundred years old. It predates the city by about four and a half of them.",
        }}
        logos={[{ text: "Austin Board of Realtors" }, { text: "TREC" }, { text: "Luxury Portfolio" }, { text: "Preservation Austin" }]}
      />

      <MediaDiptych
        eyebrow="A day at the office"
        title="Walk through Sabine Street with us."
        big={{
          kind: "video",
          video: { provider: "file", src: "/video/tour.mp4", poster: img.office },
          title: "Inside the Sabine & Oak office",
          label: "Play the tour",
        }}
        small={{ kind: "image", src: img.coffee, alt: "Coffee on a café table by a window" }}
        bigPosition="top"
        stats={[
          { value: "9am", label: "first coffee, first walk-through" },
          { value: "6pm", label: "last showing, most days" },
        ]}
        ctas={[{ label: "Come say hello", href: "/contact" }]}
        secondary={
          <p className="max-w-xl text-pretty text-[1.05rem] leading-relaxed text-bone/80">
            The office is on the second floor of a 1920s building with the original windows and a coffee machine that cost more than the furniture. Drop in. Someone is always there.
          </p>
        }
      >
        <p>
          Two rooms, one long table and a wall of neighborhood maps. It is where we price, where we argue about offers, and where clients sit when they want the real answer.
        </p>
      </MediaDiptych>

      <Testimonials eyebrow="In their words" title="What it is like to work with us." items={testimonials} />

      <section className="bg-paper py-20 text-center sm:py-28">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
            Ready when you are. Slow is fine.
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Most of our clients talk to us a year before they move. That first coffee is free, and it is never a pitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Book a first conversation</ButtonLink>
            <ButtonLink href="/listings" tone="ghost-light">Browse homes</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
