import type { Metadata } from "next";
import { coreValues, mission, services, site, vision } from "@/lib/site";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <div className="container-page pt-12">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <h1 className="h-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
          Managing homes <br /> since {site.established}
        </h1>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2 lg:pt-3">
          &ldquo;{site.tagline} Welcome to {site.name}.&rdquo;
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="card p-8">
          <h2 className="text-[13px] font-medium tracking-wide text-ink-3 uppercase">Vision</h2>
          <p className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">{vision}</p>
        </div>
        <div className="card p-8">
          <h2 className="text-[13px] font-medium tracking-wide text-ink-3 uppercase">Mission</h2>
          <p className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">{mission}</p>
        </div>
      </section>

      <section className="py-20">
        <h2 className="h-display text-center text-[clamp(1.75rem,3.5vw,2.5rem)]">Our Core Values</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, i) => (
            <div key={v.title} className="card p-6">
              <span className="font-display text-sm font-bold text-ink-3">0{i + 1}</span>
              <h3 className="mt-2 font-display text-[17px] font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="h-display text-center text-[clamp(1.75rem,3.5vw,2.5rem)]">What We Offer</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="font-display text-[17px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-ink-2">
          Relocating to Kenya, or within it? From international dignitaries to families moving
          across town, tell us the home you need — we search, shortlist and move you in with our
          own trucks and vans. We handle the hassle; you enjoy the ambiance.
        </p>
      </section>
    </div>
  );
}
