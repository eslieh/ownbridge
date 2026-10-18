import { ArrowUp, Plus } from "lucide-react";

const suggestions = [
  "2 bedroom in Kilimani",
  "Bedsitter near CBD",
  "Studio in Kileleshwa",
  "Family home in Karen",
];

/** Hero search: plain GET form to /listings, tabs are styled radio inputs (no JS). */
export function SearchPanel() {
  return (
    <div className="w-full max-w-3xl">
      <form action="/listings" className="rounded-[24px] bg-surface p-2.5 shadow-[var(--shadow-float)]">
        <div className="mb-2 flex gap-1">
          {[
            { value: "RENT", label: "Rent" },
            { value: "SALE", label: "Buy" },
          ].map((t, i) => (
            <label
              key={t.value}
              className="cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium text-ink-2 has-checked:bg-muted has-checked:text-ink"
            >
              <input type="radio" name="purpose" value={t.value} defaultChecked={i === 0} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-[18px] bg-muted py-1.5 pr-1.5 pl-3">
          <Plus className="size-4 shrink-0 text-ink-2" aria-hidden />
          <input
            name="q"
            placeholder="Search by area, e.g. Kilimani, Westlands, Karen"
            aria-label="Search by area"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm placeholder:text-ink-3 focus:outline-none"
          />
          <button type="submit" aria-label="Search" className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white hover:bg-black/80">
            <ArrowUp className="size-4" />
          </button>
        </div>
      </form>
      <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
        {suggestions.map((s) => (
          <a
            key={s}
            href={`/listings?q=${encodeURIComponent(s.split(" in ").pop() ?? s)}`}
            className="rounded-full bg-white/70 px-3.5 py-1.5 text-[12px] text-ink-2 backdrop-blur hover:bg-white"
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  );
}
