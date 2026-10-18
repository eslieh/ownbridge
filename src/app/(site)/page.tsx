import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { ListingCard } from "@/components/site/listing-card";
import { SearchPanel } from "@/components/site/search-panel";
import { WhatsAppIcon } from "@/components/site/whatsapp-button";
import { getFeaturedListings } from "@/lib/listings";
import { forLandlords, forTenants, services, site } from "@/lib/site";
import { registerPropertyMessage, whatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const HERO = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9";

export default async function HomePage() {
  const featured = await getFeaturedListings();

  const stats = [
    { value: String(site.established), label: "Established" },
    { value: site.yearsExperience, label: "Years of experience" },
    { value: site.unitsManaged, label: "Units managed" },
    { value: site.remittanceWindow, label: "Rent remitted monthly" },
    { value: `By the ${site.scorecardDay}`, label: "Monthly scorecard" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-10 sm:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <h1 className="h-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05]">
            Discover a Place
            <br />
            to Call Home
          </h1>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-2 lg:justify-self-end lg:pt-3">
            More than a rental — homes managed with absolute precision, vetted tenants, and
            landlords paid on time, every month.
          </p>
        </div>
        <div className="relative mt-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-hero)] sm:aspect-[21/9]">
            <Image src={HERO} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
          </div>
          <div className="relative z-10 -mt-24 flex justify-center px-3 sm:-mt-28">
            <SearchPanel />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page mt-16">
        <dl className="card grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-5 lg:p-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[13px] text-ink-3">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold tracking-tight text-brand">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured */}
      <section className="container-page py-20">
        <div className="mb-8 text-center">
          <h2 className="h-display text-[clamp(1.75rem,3.5vw,2.5rem)]">Explore Our Homes</h2>
          <p className="mt-2 text-ink-2">Bedsitters to family villas, vetted and ready to move in.</p>
        </div>
        {featured.length === 0 ? (
          <p className="text-center text-ink-3">Listings coming soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/listings" className="btn-primary">View all homes</Link>
        </div>
      </section>

      {/* Services */}
      <section className="container-page">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="font-display text-[17px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Landlords */}
      <section id="landlords" className="container-page scroll-mt-20 py-20">
        <div className="card grid items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
          <div>
            <h2 className="h-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight">
              The Smarter Way <br /> to Let Your Property
            </h2>
            <ul className="mt-6 space-y-3">
              {forLandlords.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(registerPropertyMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              <WhatsAppIcon className="size-4" />
              Register your property
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Tenants */}
      <section id="tenants" className="container-page scroll-mt-20">
        <div className="card grid items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] lg:order-first">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="h-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight">
              We Handle the Hassle, <br /> You Enjoy the Home
            </h2>
            <ul className="mt-6 space-y-3">
              {forTenants.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/listings" className="btn-primary mt-8">Find a home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
