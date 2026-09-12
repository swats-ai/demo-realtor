import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpotlightImageCarousel } from "@/components/library/spotlight-image-carousel";
import { ButtonLink } from "@/components/library/ui";
import { VideoPoster } from "@/components/site/video-poster";
import { AgentCard } from "@/components/site/agent-card";
import { ContactForm } from "@/components/site/forms";
import { ListingCard } from "@/components/site/listing-card";
import { getListing, listings, formatPrice, statusLabel } from "@/data/listings";
import { getAgent } from "@/data/agents";
import { getNeighborhood } from "@/data/neighborhoods";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return {};
  return {
    title: `${l.name}, ${l.neighborhood}`,
    description: l.headline,
    openGraph: { images: [{ url: l.hero }] },
  };
}

export default async function ListingPage({ params }: PageProps<"/listings/[slug]">) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) notFound();
  const agent = getAgent(l.agentSlug)!;
  const hood = l.neighborhoodSlug ? getNeighborhood(l.neighborhoodSlug) : undefined;
  const related = listings.filter((x) => x.slug !== l.slug && x.status !== "sold").slice(0, 3);

  const facts: { label: string; value: string }[] = [
    { label: "Bedrooms", value: String(l.beds) },
    { label: "Bathrooms", value: String(l.baths) },
    { label: "Square feet", value: l.sqft.toLocaleString("en-US") },
    ...(l.lot ? [{ label: "Lot", value: l.lot }] : []),
    { label: "Built", value: String(l.year) },
    { label: "Type", value: l.type === "condo" ? "Condo" : l.type === "land" ? "Land" : "Single family" },
  ];

  return (
    <>
      {/* Cabecera oscura con la foto principal */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink text-bone">
        <Image src={l.hero} alt={l.heroAlt} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto w-full max-w-[100rem] px-5 pb-14 pt-40 sm:px-8 sm:pb-20">
          <nav aria-label="Breadcrumb" className="text-[0.9rem] text-bone/70">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/listings" className="hover:text-bone">Homes</Link></li>
              <li aria-hidden>/</li>
              <li>
                {l.neighborhoodSlug ? (
                  <Link href={`/neighborhoods#${l.neighborhoodSlug}`} className="hover:text-bone">{l.neighborhood}</Link>
                ) : (
                  <span>{l.neighborhood}</span>
                )}
              </li>
            </ol>
          </nav>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span
                className={cn(
                  "inline-block rounded-full px-3 py-1 text-[0.8rem] font-semibold",
                  l.status === "for-sale" && "bg-bone text-ink",
                  l.status === "pending" && "bg-rec text-ink",
                  l.status === "sold" && "bg-amber text-ink",
                  l.status === "coming-soon" && "bg-amber text-ink",
                )}
              >
                {statusLabel[l.status]}
              </span>
              <h1 className="font-display mt-5 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.015em] sm:text-[3.6rem] lg:text-[4.5rem]">
                {l.name}
              </h1>
              <p className="mt-3 text-lg text-bone/85 sm:text-xl">
                {l.address}, {l.neighborhood}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="font-display text-[2.6rem] font-medium leading-none tracking-[-0.01em] sm:text-[3.2rem]">{formatPrice(l.price)}</p>
              <p className="mt-2 text-bone/75">
                {l.beds} bd, {l.baths} ba, {l.sqft.toLocaleString("en-US")} sq ft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section aria-label="Photo gallery" className="bg-paper pt-6 sm:pt-10">
        <SpotlightImageCarousel images={l.gallery} />
      </section>

      {/* Cuerpo */}
      <section className="bg-paper py-12 sm:py-20">
        <div className="mx-auto grid w-full max-w-[100rem] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_24rem] lg:gap-20">
          <div className="min-w-0">
            <p className="font-display text-balance text-[1.7rem] leading-[1.25] text-ink sm:text-[2.2rem]">{l.headline}</p>
            <div className="mt-8 max-w-3xl space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              {l.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-bone px-5 py-5">
                  <dt className="text-[0.85rem] text-ink-soft">{f.label}</dt>
                  <dd className="font-display mt-1 text-[1.6rem] font-medium leading-none text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="font-display mt-14 text-[1.8rem] font-medium text-ink">What stands out</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {l.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[1.02rem] text-ink-soft">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-deep" />
                  {f}
                </li>
              ))}
            </ul>

            {l.amenities?.length ? (
              <>
                <h2 className="font-display mt-14 text-[1.8rem] font-medium text-ink">Building amenities</h2>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {l.amenities.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[1.02rem] text-ink-soft">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-deep" />
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {l.video ? (
              <div className="mt-14">
                <h2 className="font-display text-[1.8rem] font-medium text-ink">Walk through it</h2>
                <p className="mt-2 text-ink-soft">A two-minute tour, filmed by us on a weekday morning.</p>
                <div className="mt-6">
                  <VideoPoster video={l.video} title={`Video tour of ${l.name}`} label="Play the tour" />
                </div>
              </div>
            ) : null}

            {hood ? (
              <div className="mt-14 rounded-2xl bg-paper-2 p-7 sm:p-10">
                <p className="eyebrow text-amber-deep">The neighborhood</p>
                <h2 className="font-display mt-2 text-[1.8rem] font-medium text-ink">{hood.name}</h2>
                <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{hood.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ink-soft">
                  <span>Median price {hood.medianPrice}</span>
                  <span>{hood.commute}</span>
                </div>
                <Link href={`/neighborhoods#${hood.slug}`} className="mt-5 inline-flex h-10 items-center font-display font-semibold text-amber-deep underline-offset-4 hover:underline">
                  More about {hood.name}
                </Link>
              </div>
            ) : null}
          </div>

          {/* Aside: agente + formulario, sticky */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-ink/10 bg-bone p-6 sm:p-8">
              <p className="eyebrow text-amber-deep">Listed by</p>
              <div className="mt-4">
                <AgentCard agent={agent} compact />
              </div>
              <h2 className="font-display mt-8 text-[1.5rem] font-medium leading-tight text-ink">
                {l.status === "sold" ? "Have a home like this one?" : "Ask about this home"}
              </h2>
              <ContactForm
                tone="light"
                submitLabel={l.status === "sold" ? "Talk about selling" : "Request a showing"}
                fields={[
                  { name: "name", label: "Full name", required: true, full: true, autoComplete: "name" },
                  { name: "email", label: "Email", type: "email", required: true, full: true, autoComplete: "email" },
                  { name: "phone", label: "Phone", type: "tel", full: true, autoComplete: "tel" },
                  { name: "message", label: l.status === "sold" ? "Tell us about your home" : "When would you like to see it?", type: "textarea", full: true },
                ]}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Formulario de contacto a pie de cada propiedad */}
      <section aria-labelledby="listing-contact" className="bg-ink text-bone">
        <div className="mx-auto grid w-full max-w-[100rem] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl">
            <p className="eyebrow text-amber">Get in touch</p>
            <h2 id="listing-contact" className="font-display mt-3 text-balance text-[2.2rem] font-medium leading-[1.04] sm:text-[3rem]">
              {l.status === "sold" ? "Thinking of selling a home like this?" : `Interested in ${l.name}?`}
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-bone/75">
              Send a note and {agent.name.split(" ")[0]} will get back to you personally, usually within one business day. No call center, no pressure.
            </p>
            <div className="mt-8 space-y-1 text-[0.95rem] text-bone/70">
              <p>{agent.name}, {agent.role}</p>
              <p>
                <a href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-bone">{agent.phone}</a>
                {" · "}
                <a href={`mailto:${agent.email}`} className="hover:text-bone">{agent.email}</a>
              </p>
            </div>
          </div>
          <div className="lg:pt-2">
            <ContactForm
              tone="dark"
              submitLabel={l.status === "sold" ? "Talk about selling" : "Request a showing"}
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "preferred", label: "Preferred contact", type: "select", options: ["Email", "Phone", "Text"] },
                { name: "message", label: l.status === "sold" ? "Tell us about your home" : `Ask about ${l.name}`, type: "textarea", full: true, required: true },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="more-homes" className="bg-paper-2 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="more-homes" className="font-display text-balance text-[2rem] font-medium leading-[1.05] text-ink sm:text-[2.6rem]">
              Three more worth a look.
            </h2>
            <ButtonLink href="/listings" tone="ghost-light">All homes</ButtonLink>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ListingCard listing={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
