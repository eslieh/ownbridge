import Link from "next/link";
import { Logo } from "./logo";
import { whatsappLink } from "@/lib/whatsapp";

const links = [
  { href: "/listings", label: "Rent" },
  { href: "/listings?purpose=SALE", label: "Buy" },
  { href: "/#landlords", label: "Landlords" },
  { href: "/#tenants", label: "Tenants" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-surface/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />
        <ul className="hidden items-center gap-7 text-[13px] font-medium text-ink md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex items-center gap-1.5 hover:text-ink-2">
                <span className="size-1 rounded-full bg-brand-lime" aria-hidden />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink("Hello OwnBridge, I have an enquiry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-muted"
        >
          Contact us
        </a>
      </nav>
    </header>
  );
}
