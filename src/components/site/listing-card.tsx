import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Home } from "lucide-react";
import type { ListingCardData } from "@/lib/listings";
import { formatPrice, houseTypeLabel, statusLabel } from "@/lib/listing-options";

export function ListingCard({ listing }: { listing: ListingCardData }) {
  const cover = listing.images[0];
  const href = `/listings/${listing.slug}`;
  return (
    <article className="card group p-2.5">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] bg-muted">
        {cover && (
          <Image
            src={cover.url}
            alt={listing.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        )}
        {listing.status !== "AVAILABLE" && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium">
            {statusLabel(listing.status)}
          </span>
        )}
      </Link>
      <div className="px-1.5 pt-3 pb-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-lg font-bold tracking-tight">
            {formatPrice(listing.price, listing.purpose)}
          </p>
          <Link href={href} className="rounded-full bg-muted px-3 py-1 text-[12px] font-medium text-ink-2 hover:bg-line">
            View Details
          </Link>
        </div>
        <h3 className="mt-1 font-display text-[15px] font-semibold tracking-tight">
          <Link href={href}>{listing.title}</Link>
        </h3>
        <p className="text-[13px] text-ink-3">
          {listing.area}, {listing.city}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-2">
          <span className="flex items-center gap-1">
            <BedDouble className="size-3.5" />
            {listing.bedrooms === 0 ? "—" : listing.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-3.5" />
            {listing.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Home className="size-3.5" />
            {houseTypeLabel(listing.houseType)}
          </span>
        </div>
      </div>
    </article>
  );
}
