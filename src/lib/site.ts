/* Identidad y datos globales del sitio. */

export const site = {
  name: "Sabine & Oak",
  legalName: "Sabine & Oak Realty, LLC",
  tagline: "Austin real estate, one address at a time.",
  description:
    "A boutique Austin brokerage that pairs neighborhood fluency with patient, data-backed advice. Homes across Bouldin Creek, Travis Heights, Clarksville, Mueller, Tarrytown and the Hill Country.",
  url: "https://sabineandoak.example.com",
  phone: "(512) 555-0148",
  phoneHref: "tel:+15125550148",
  email: "hello@sabineandoak.com",
  address: {
    street: "1204 Sabine Street, Suite 200",
    city: "Austin",
    state: "TX",
    zip: "78701",
  },
  hours: "Monday to Saturday, 9am to 6pm",
  license: "TREC Broker License #0612345",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const nav = [
  { label: "Homes", href: "/listings" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
