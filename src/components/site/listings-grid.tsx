"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "./listing-card";
import type { Listing } from "@/data/listings";
import { cn } from "@/lib/cn";

type Sort = "newest" | "price-desc" | "price-asc";

/**
 * ListingsGrid — grid de propiedades con filtro por estado/tipo y orden por
 * precio. Filtros como botones con aria-pressed; el conteo se anuncia con
 * aria-live.
 */
export function ListingsGrid({ listings }: { listings: Listing[] }) {
  const [status, setStatus] = useState<"all" | Listing["status"]>("all");
  const [type, setType] = useState<"all" | Listing["type"]>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const shown = useMemo(() => {
    const out = listings.filter((l) => (status === "all" || l.status === status) && (type === "all" || l.type === type));
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    return out;
  }, [listings, status, type, sort]);

  const statusOptions: { value: typeof status; label: string }[] = [
    { value: "all", label: "All" },
    { value: "for-sale", label: "For sale" },
    { value: "pending", label: "Under contract" },
    { value: "sold", label: "Recently sold" },
  ];
  const typeOptions: { value: typeof type; label: string }[] = [
    { value: "all", label: "Any type" },
    { value: "house", label: "Houses" },
    { value: "condo", label: "Condos and lofts" },
  ];

  const pill = (active: boolean) =>
    cn(
      "h-10 cursor-pointer rounded-full border px-4 text-[0.9rem] font-medium transition",
      active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-transparent text-ink hover:border-ink/40",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {statusOptions.map((o) => (
            <button key={o.value} type="button" aria-pressed={status === o.value} onClick={() => setStatus(o.value)} className={pill(status === o.value)}>
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            {typeOptions.map((o) => (
              <button key={o.value} type="button" aria-pressed={type === o.value} onClick={() => setType(o.value)} className={pill(type === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          <label className="ml-2 flex items-center gap-2 text-[0.9rem] text-ink-soft">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 cursor-pointer rounded-full border border-ink/15 bg-bone px-3 text-[0.9rem] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-amber"
            >
              <option value="newest">Newest</option>
              <option value="price-desc">Price, high to low</option>
              <option value="price-asc">Price, low to high</option>
            </select>
          </label>
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-[0.95rem] text-ink-soft">
        Showing {shown.length} of {listings.length} homes
      </p>

      {shown.length ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((l, i) => (
            <li key={l.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
              <ListingCard listing={l} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/20 p-10 text-center">
          <p className="font-display text-2xl">Nothing matches those filters yet.</p>
          <p className="mt-2 text-ink-soft">Try a different status, or tell us what you are looking for and we will call you when it lists.</p>
        </div>
      )}
    </div>
  );
}
