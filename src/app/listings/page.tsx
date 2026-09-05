import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ListingsGrid } from "@/components/site/listings-grid";
import { ImageFormBand } from "@/components/library/image-form-band";
import { img } from "@/data/images";
import { listings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Homes for sale",
  description: "Current Sabine & Oak listings across Central Austin, Westlake and the Hill Country, plus recent sales.",
};

export default function ListingsPage() {
  const forSale = listings.filter((l) => l.status === "for-sale").length;
  return (
    <>
      <PageHero
        eyebrow="Homes"
        title="Every home we represent, and a few we just sold."
        intro={`${forSale} homes available today across Central Austin, Westlake and the Hill Country. Each one walked, priced and photographed by the agent who will sell it.`}
        image={img.blackModern}
        imageAlt="A white home on a wide green lot under a big Texas sky"
        compact
      />
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <ListingsGrid listings={listings} />
        </div>
      </section>
      <ImageFormBand
        image={img.keys}
        imageAlt="A set of house keys on a wooden table"
        side="left"
        eyebrow="Not seeing it?"
        title="Tell us the street. We will call when it lists."
        intro="Roughly a third of our sales never reach the public market. Tell us what you want and we will keep an eye out."
        fields={[
          { name: "name", label: "Full name", required: true, autoComplete: "name" },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
          { name: "neighborhood", label: "Neighborhood", type: "select", options: ["Bouldin Creek", "Travis Heights", "Clarksville", "Mueller", "East Austin", "Tarrytown", "Westlake Hills", "Hill Country", "Anywhere central"] },
          { name: "budget", label: "Budget", type: "select", options: ["Under $750K", "$750K to $1.5M", "$1.5M to $3M", "Over $3M"] },
          { name: "message", label: "Anything else we should know", type: "textarea", full: true },
        ]}
        submitLabel="Keep me posted"
      />
    </>
  );
}
