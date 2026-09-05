import Image from "next/image";
import Link from "next/link";
import { formatPrice, statusLabel, type Listing } from "@/data/listings";
import { cn } from "@/lib/cn";

/**
 * ListingCard — tarjeta de propiedad: foto 4:3 con pill de estado, precio en
 * Fraunces, nombre, barrio y la fila de datos (camas, baños, pies²).
 */
export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const sold = listing.status === "sold";
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-bone transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(16,35,31,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
        <Image
          src={listing.hero}
          alt={listing.heroAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn("object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105", sold && "grayscale-[0.4]")}
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-[0.78rem] font-semibold",
            listing.status === "for-sale" && "bg-bone text-ink",
            listing.status === "pending" && "bg-rec text-ink",
            listing.status === "sold" && "bg-ink text-bone",
            listing.status === "coming-soon" && "bg-amber text-ink",
          )}
        >
          {statusLabel[listing.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-display text-[1.7rem] font-medium leading-none tracking-[-0.01em] text-ink">
          {formatPrice(listing.price)}
        </p>
        <h3 className="mt-3 text-[1.15rem] font-semibold leading-snug text-ink transition-colors group-hover:text-amber-deep">
          {listing.name}
        </h3>
        <p className="mt-1 text-[0.95rem] text-ink-soft">
          {listing.address}, {listing.neighborhood}
        </p>
        <dl className="mt-auto flex gap-5 border-t border-ink/10 pt-4 text-[0.9rem] text-ink-soft">
          <div className="flex gap-1.5">
            <dt className="sr-only">Bedrooms</dt>
            <dd><span className="font-semibold text-ink">{listing.beds}</span> bd</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="sr-only">Bathrooms</dt>
            <dd><span className="font-semibold text-ink">{listing.baths}</span> ba</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="sr-only">Square feet</dt>
            <dd><span className="font-semibold text-ink">{listing.sqft.toLocaleString("en-US")}</span> sq ft</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
