"use client";

import { useState } from "react";
import { NAIROBI } from "@/lib/listing-options";
import { GoogleMapEmbed } from "./google-embed";

export type MapPoint = {
  id: string;
  slug: string;
  title: string;
  price: string;
  lat: number;
  lng: number;
};

/**
 * Google Maps embed. The keyless embed only supports one pin, so with several
 * points we show the selected one and a strip to switch between them.
 */
export default function ListingsMap({
  points,
  zoom = 15,
  showLinks = true,
}: {
  points: MapPoint[];
  zoom?: number;
  showLinks?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = points.find((p) => p.id === selectedId) ?? points[0];

  return (
    <div className="relative h-full w-full bg-muted">
      {selected ? (
        <GoogleMapEmbed key={selected.id} lat={selected.lat} lng={selected.lng} zoom={zoom} title={selected.title} />
      ) : (
        <GoogleMapEmbed lat={NAIROBI[0]} lng={NAIROBI[1]} zoom={12} title="Nairobi" />
      )}

      {points.length > 1 && (
        <div className="absolute inset-x-2 bottom-2 flex gap-2 overflow-x-auto pb-1">
          {points.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] shadow-sm ${
                p.id === selected?.id ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink"
              }`}
            >
              <strong>{p.price}</strong> · {p.title}
            </button>
          ))}
        </div>
      )}

      {showLinks && selected && points.length > 1 && (
        <a
          href={`/listings/${selected.slug}`}
          className="absolute right-2 top-2 rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium text-ink shadow-sm"
        >
          View home →
        </a>
      )}
    </div>
  );
}
