import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { ImageFormBand } from "@/components/library/image-form-band";
import { CrossDividerGrid } from "@/components/library/cross-divider-grid";
import { img } from "@/data/images";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/site/agent-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, write or drop by the Sabine Street office. A person replies within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with coffee. Decide later."
        intro="Most clients talk to us a year before they move. The first conversation is free, unhurried and never a pitch."
        image={img.coffee}
        imageAlt="Coffee on a café table by a window"
        compact
      />

      <ImageFormBand
        image={img.livingWarm}
        imageAlt="A warm living room with pine floors"
        side="left"
        eyebrow="Write to us"
        title="Tell us what you are looking for."
        intro="Or what you are letting go of. Either way, one of the four of us replies within a business day."
        fields={[
          { name: "name", label: "Full name", required: true, autoComplete: "name" },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "interest", label: "I am looking to", type: "select", options: ["Buy", "Sell", "Both", "Just talk"] },
          { name: "timeline", label: "Timeline", type: "select", options: ["This month", "This year", "Next year", "No idea yet"] },
          { name: "agent", label: "Prefer a specific agent?", type: "select", options: agents.map((a) => a.name) },
          { name: "message", label: "Tell us a little more", type: "textarea", full: true },
        ]}
        submitLabel="Send message"
      />

      <section aria-labelledby="visit" className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-[100rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-amber-deep">Visit</p>
            <h2 id="visit" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
              Second floor, original windows, very good coffee.
            </h2>
            <address className="mt-8 space-y-6 text-[1.05rem] not-italic leading-relaxed text-ink-soft">
              <p>
                <span className="block font-semibold text-ink">Office</span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p>
                <span className="block font-semibold text-ink">Phone</span>
                <a href={site.phoneHref} className="underline-offset-4 hover:underline">{site.phone}</a>
              </p>
              <p>
                <span className="block font-semibold text-ink">Email</span>
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">{site.email}</a>
              </p>
              <p>
                <span className="block font-semibold text-ink">Hours</span>
                {site.hours}. Showings by appointment on Sundays.
              </p>
            </address>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-2 lg:aspect-auto lg:min-h-[28rem]">
            <Image src={img.austinSkyline} alt="Austin skyline across Lady Bird Lake at dusk" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <a
              href="https://maps.google.com/?q=1204+Sabine+St+Austin+TX+78701"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-6 inline-flex h-11 items-center rounded-full bg-bone px-5 font-display font-semibold text-ink transition hover:bg-amber-soft"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="people" className="bg-paper-2 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <h2 id="people" className="font-display text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
            Or call one of us directly.
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {agents.map((a) => (
              <li key={a.slug} className="rounded-2xl border border-ink/10 bg-bone p-5">
                <AgentCard agent={a} compact />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq" className="bg-paper py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <h2 id="faq" className="font-display text-balance text-[2.2rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-[3rem]">
            Things people ask before they call.
          </h2>
          <div className="mt-10">
            <CrossDividerGrid
              tone="light"
              cols={3}
              items={[
                { title: "Do you charge buyers?", body: "Our buyer fee is disclosed in writing before the first tour and is most often paid from the seller's side at closing. No surprises, no fine print." },
                { title: "Will you sell outside your eight neighborhoods?", body: "Yes, if we can do it well. If a home is somewhere we do not know street by street, we will tell you and refer you to someone who does." },
                { title: "How fast do you reply?", body: "Within one business day by email, and usually within the hour by text during office hours. The 10pm text is answered too, more often than we admit." },
                { title: "Can we just talk, no commitment?", body: "That is how most of our relationships start. Coffee is on us, and nobody follows up unless you ask them to." },
                { title: "Do you handle rentals?", body: "Not as a rule. We keep a short list of property managers we trust and will introduce you." },
                { title: "What about relocation?", body: "Priya runs a full relocation practice: school maps, neighborhood walks over video, and a first week of introductions once you land." },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
