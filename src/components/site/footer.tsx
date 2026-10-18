import Link from "next/link";
import { Logo } from "./logo";
import { DISCLAIMER, site } from "@/lib/site";

export function Footer() {
  const socials = [
    { label: "Facebook", href: site.socials.facebook },
    { label: "X (Twitter)", href: site.socials.x },
    { label: "TikTok", href: site.socials.tiktok },
  ].filter((s) => s.href);

  return (
    <footer className="mt-auto pt-16">
      <div className="container-page">
        <p className="rounded-[var(--radius-media)] bg-muted px-5 py-4 text-[13px] leading-relaxed text-ink-2">
          {DISCLAIMER}
        </p>
      </div>
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-ink-2">
            Premium property management in Kenya since {site.established}.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            <li><Link href="/listings">Homes for rent</Link></li>
            <li><Link href="/listings?purpose=SALE">Homes for sale</Link></li>
            <li><Link href="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
            {site.phone && <li>{site.phone}</li>}
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Follow us</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-wrap justify-between gap-2 py-5 text-xs text-ink-3">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <Link href="/admin">Owner login</Link>
        </div>
      </div>
    </footer>
  );
}
