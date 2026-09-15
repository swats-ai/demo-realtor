import { CurrentYear } from "./current-year";
import Link from "next/link";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";
import { neighborhoods } from "@/data/neighborhoods";

/**
 * Footer — banda full-width en pino; contenido a 100rem. Emblema ilustrativo
 * (roble sobre casa) como marca de agua, columnas de navegación, barrios y
 * contacto, y una línea legal con la licencia TREC.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div aria-hidden className="brand-emblem pointer-events-none absolute -bottom-16 -right-10 h-[26rem] w-[26rem] text-bone/[0.05] sm:-right-4 lg:h-[34rem] lg:w-[34rem]" />

      <div className="relative mx-auto w-full max-w-[100rem] px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo markClassName="size-12" />
            <p className="font-display mt-6 max-w-sm text-balance text-2xl font-normal leading-tight">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-bone/70">
              A boutique brokerage in the heart of Austin. We say no to nine houses so you can say yes to one.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center text-[0.95rem] text-bone/80 underline-offset-4 hover:text-amber-soft hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-lg italic text-amber-soft">Explore</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex h-9 items-center text-[0.95rem] text-bone/85 hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg italic text-amber-soft">Neighborhoods</h2>
            <ul className="mt-4 space-y-1">
              {neighborhoods.slice(0, 6).map((n) => (
                <li key={n.slug}>
                  <Link href={`/neighborhoods#${n.slug}`} className="inline-flex h-9 items-center text-[0.95rem] text-bone/85 hover:text-bone">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg italic text-amber-soft">Visit</h2>
            <address className="mt-4 space-y-1 text-[0.95rem] not-italic leading-relaxed text-bone/85">
              <p>{site.address.street}</p>
              <p>
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p className="pt-2">
                <a href={site.phoneHref} className="hover:text-bone">{site.phone}</a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-bone">{site.email}</a>
              </p>
              <p className="pt-2 text-bone/60">{site.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 text-[0.82rem] text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.legalName}. {site.license}. Equal Housing Opportunity.
          </p>
          <p>
            <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-bone hover:underline">
              TREC Consumer Protection Notice
            </a>
            <span aria-hidden className="mx-3">/</span>
            <a href="https://www.trec.texas.gov/forms/information-about-brokerage-services" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-bone hover:underline">
              Information About Brokerage Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
