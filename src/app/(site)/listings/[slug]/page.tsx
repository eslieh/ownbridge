import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Home, MapPin, Ruler } from "lucide-react";
import { ListingsMap } from "@/components/map";
import { WhatsAppIcon } from "@/components/site/whatsapp-button";
import { getPublicListingBySlug } from "@/lib/listings";
import { formatPrice, houseTypeLabel, statusLabel } from "@/lib/listing-options";
import { enquiryMessage, whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const listing = await getPublicListingBySlug((await params).slug);
  if (!listing) return {};
  return {
    title: listing.title,
    description: `${houseTypeLabel(listing.houseType)} in ${listing.area}, ${listing.city}`,
    openGraph: listing.images[0] ? { images: [listing.images[0].url] } : undefined,
  };
}

export default async function ListingPage({ params }: PageProps<"/listings/[slug]">) {
  const listing = await getPublicListingBySlug((await params).slug);
  if (!listing) notFound();

  const [cover, ...rest] = listing.images;
  const specs = [
    { icon: Home, label: houseTypeLabel(listing.houseType) },
    { icon: BedDouble, label: listing.bedrooms === 0 ? "No separate bedroom" : `${listing.bedrooms} Bedrooms` },
    { icon: Bath, label: `${listing.bathrooms} Bathrooms` },
    ...(listing.sizeSqm ? [{ icon: Ruler, label: `${listing.sizeSqm} m²` }] : []),
  ];

  return (
    <div className="container-page pt-6">
      <Link href="/listings" className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
        <ArrowLeft className="size-4" /> All homes
      </Link>

      {/* Gallery */}
      <div className="grid gap-2.5 md:grid-cols-[2fr_1fr]">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-muted">
          {cover && <Image src={cover.url} alt={listing.title} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />}
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
          {rest.slice(0, 2).map((img) => (
            <div key={img.id} className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-muted md:aspect-auto">
              <Image src={img.url} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      {rest.length > 2 && (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {rest.slice(2).map((img) => (
            <div key={img.id} className="relative aspect-square overflow-hidden rounded-[var(--radius-media)] bg-muted">
              <Image src={img.url} alt="" fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-active h-7 px-3 text-[12px]">{listing.purpose === "RENT" ? "For rent" : "For sale"}</span>
            {listing.status !== "AVAILABLE" && <span className="chip h-7 px-3 text-[12px]">{statusLabel(listing.status)}</span>}
          </div>
          <h1 className="h-display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">{listing.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-ink-2">
            <MapPin className="size-4" />
            {[listing.address, listing.area, listing.city].filter(Boolean).join(", ")}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {specs.map((s) => (
              <li key={s.label} className="chip gap-2 text-ink">
                <s.icon className="size-4" />
                {s.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed whitespace-pre-line text-ink-2">
            {listing.description}
          </div>

          {listing.amenities.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-lg font-semibold">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listing.amenities.map((a) => (
                  <li key={a} className="chip">{a}</li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 font-display text-lg font-semibold">Location</h2>
          <div className="mt-3 h-80 overflow-hidden rounded-[var(--radius-card)]">
            <ListingsMap
              zoom={15}
              showLinks={false}
              points={[{ id: listing.id, slug: listing.slug, title: listing.title, price: formatPrice(listing.price, listing.purpose), lat: listing.latitude, lng: listing.longitude }]}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card p-6">
            <p className="text-[13px] text-ink-3">{listing.purpose === "RENT" ? "Monthly rent" : "Asking price"}</p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">{formatPrice(listing.price, listing.purpose)}</p>
            <a
              href={whatsappLink(enquiryMessage(listing.title, listing.slug))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full bg-whatsapp text-white hover:bg-whatsapp/90"
            >
              <WhatsAppIcon className="size-4" />
              Enquire on WhatsApp
            </a>
            <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
              All tenants go through our standard vetting and background checks.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
