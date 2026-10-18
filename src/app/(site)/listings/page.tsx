import type { Metadata } from "next";
import Link from "next/link";
import { ListingCard } from "@/components/site/listing-card";
import { ListingsMap } from "@/components/map";
import { getPublicListings, type ListingFilters } from "@/lib/listings";
import { formatPrice, houseTypeOptions } from "@/lib/listing-options";

export const metadata: Metadata = { title: "Homes" };

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ListingsPage({ searchParams }: PageProps<"/listings">) {
  const sp = await searchParams;
  const filters: ListingFilters = {
    q: one(sp.q),
    type: one(sp.type),
    beds: one(sp.beds),
    maxPrice: one(sp.maxPrice),
    purpose: one(sp.purpose),
  };
  const listings = await getPublicListings(filters);
  const points = listings.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    price: formatPrice(l.price, l.purpose),
    lat: l.latitude,
    lng: l.longitude,
  }));
  const isSale = filters.purpose === "SALE";

  return (
    <div className="container-page pt-6">
      {/* Filter bar — plain GET form */}
      <form className="card flex flex-wrap items-end gap-3 p-3">
        <input type="hidden" name="purpose" value={filters.purpose ?? ""} />
        <label className="min-w-48 flex-1">
          <span className="sr-only">Area</span>
          <input name="q" defaultValue={filters.q} placeholder="Area, e.g. Kilimani" className="input bg-muted border-transparent" />
        </label>
        <select name="type" defaultValue={filters.type ?? ""} className="input w-auto bg-muted border-transparent" aria-label="House type">
          <option value="">Any type</option>
          {houseTypeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select name="beds" defaultValue={filters.beds ?? ""} className="input w-auto bg-muted border-transparent" aria-label="Bedrooms">
          <option value="">Any beds</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}+ beds</option>
          ))}
        </select>
        <input
          name="maxPrice"
          type="number"
          min={0}
          step={1000}
          defaultValue={filters.maxPrice}
          placeholder={isSale ? "Max price (KES)" : "Max rent (KES)"}
          className="input w-44 bg-muted border-transparent"
        />
        <button className="btn-primary h-11">Search</button>
        <Link href="/listings" className="btn-muted h-11">Reset</Link>
      </form>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_minmax(0,0.85fr)]">
        <section>
          <h1 className="mb-4 font-display text-lg font-semibold tracking-tight">
            {listings.length} {listings.length === 1 ? "Home" : "Homes"} {isSale ? "for Sale" : "for Rent"}
          </h1>
          {listings.length === 0 ? (
            <div className="card p-10 text-center text-ink-2">No homes match those filters yet.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </section>
        <aside className="order-first h-72 overflow-hidden rounded-[var(--radius-card)] lg:sticky lg:top-20 lg:order-none lg:h-[calc(100vh-6rem)]">
          <ListingsMap points={points} />
        </aside>
      </div>
    </div>
  );
}
