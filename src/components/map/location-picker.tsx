"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";
import { NAIROBI } from "@/lib/listing-options";
import { GoogleMapEmbed } from "./google-embed";

type LatLng = { lat: number; lng: number };

/** Pulls coordinates out of a pasted Google Maps link or a plain "lat, lng" string. */
function parseCoords(text: string): LatLng | null {
  const patterns = [
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // place links: exact pin
    /@(-?\d+\.\d+),(-?\d+\.\d+)/, // map view links
    /[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
    /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) {
      const lat = Number(m[1]);
      const lng = Number(m[2]);
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
    }
  }
  return null;
}

/**
 * Lat/lng picker: "Use my current location" (browser geolocation),
 * paste a Google Maps link, or type coordinates. A Google Maps embed previews the pin.
 * Submits as hidden `latitude` / `longitude` form fields.
 */
export default function LocationPicker({
  defaultLat,
  defaultLng,
}: {
  defaultLat?: number;
  defaultLng?: number;
}) {
  const [pos, setPos] = useState<LatLng | null>(
    defaultLat != null && defaultLng != null ? { lat: defaultLat, lng: defaultLng } : null,
  );
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState("");

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setError("This browser does not support location access.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude });
        setLocating(false);
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Paste a Google Maps link or enter coordinates instead."
            : "Could not get your location. Paste a Google Maps link or enter coordinates instead.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function applyLink(value: string) {
    setLink(value);
    if (!value.trim()) return setError(null);
    const coords = parseCoords(value);
    if (coords) {
      setPos(coords);
      setError(null);
    } else {
      setError("Couldn't find coordinates in that link. Use the full google.com/maps link (not a short maps.app.goo.gl one).");
    }
  }

  function setCoord(key: "lat" | "lng", value: string) {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    setPos({ lat: pos?.lat ?? NAIROBI[0], lng: pos?.lng ?? NAIROBI[1], [key]: n });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={useMyLocation} disabled={locating} className="btn-primary">
          <LocateFixed className="size-4" />
          {locating ? "Locating…" : "Use my current location"}
        </button>
        <span className="text-[13px] text-ink-3">or paste a Google Maps link / enter coordinates</span>
      </div>

      <label className="block">
        <span className="label">Google Maps link</span>
        <input
          className="input"
          value={link}
          onChange={(e) => applyLink(e.target.value)}
          placeholder="https://www.google.com/maps/place/…/@-1.2921,36.8219,17z"
        />
      </label>
      {error && <p className="text-[13px] text-danger">{error}</p>}

      <div className="h-80 overflow-hidden rounded-[var(--radius-media)] border border-line bg-muted">
        <GoogleMapEmbed
          lat={pos?.lat ?? NAIROBI[0]}
          lng={pos?.lng ?? NAIROBI[1]}
          zoom={pos ? 16 : 12}
          title="Listing location"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label>
          <span className="label">Latitude</span>
          <input
            className="input"
            inputMode="decimal"
            value={pos?.lat.toFixed(6) ?? ""}
            onChange={(e) => setCoord("lat", e.target.value)}
            placeholder="-1.292100"
          />
        </label>
        <label>
          <span className="label">Longitude</span>
          <input
            className="input"
            inputMode="decimal"
            value={pos?.lng.toFixed(6) ?? ""}
            onChange={(e) => setCoord("lng", e.target.value)}
            placeholder="36.821900"
          />
        </label>
      </div>
      <input type="hidden" name="latitude" value={pos?.lat ?? ""} />
      <input type="hidden" name="longitude" value={pos?.lng ?? ""} />
    </div>
  );
}
