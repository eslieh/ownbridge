"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LocateFixed } from "lucide-react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { NAIROBI } from "@/lib/listing-options";
import { TILE_ATTRIBUTION, TILE_URL, pinIcon } from "./leaflet-base";

type LatLng = { lat: number; lng: number };

function ClickToPlace({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({ click: (e) => onPick(e.latlng) });
  return null;
}

function Recenter({ pos }: { pos: LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (pos) map.setView([pos.lat, pos.lng], Math.max(map.getZoom(), 15));
  }, [map, pos]);
  return null;
}

/**
 * Lat/lng picker: "Use my current location" (browser geolocation),
 * click the map, drag the pin, or type coordinates.
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
  const [recenter, setRecenter] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setError("This browser does not support location access.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const next = { lat: p.coords.latitude, lng: p.coords.longitude };
        setPos(next);
        setRecenter(next);
        setLocating(false);
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Click the map to place the pin instead."
            : "Could not get your location. Click the map to place the pin instead.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function setCoord(key: "lat" | "lng", value: string) {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    const next = { lat: pos?.lat ?? NAIROBI[0], lng: pos?.lng ?? NAIROBI[1], [key]: n };
    setPos(next);
    setRecenter(next);
  }

  const icon = pinIcon();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={useMyLocation} disabled={locating} className="btn-primary">
          <LocateFixed className="size-4" />
          {locating ? "Locating…" : "Use my current location"}
        </button>
        <span className="text-[13px] text-ink-3">or click / drag the pin on the map</span>
      </div>
      {error && <p className="text-[13px] text-danger">{error}</p>}

      <div className="h-80 overflow-hidden rounded-[var(--radius-media)] border border-line">
        <MapContainer center={pos ? [pos.lat, pos.lng] : NAIROBI} zoom={pos ? 15 : 12} className="h-full w-full">
          <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
          <ClickToPlace onPick={setPos} />
          <Recenter pos={recenter} />
          {pos && (
            <Marker
              position={[pos.lat, pos.lng]}
              icon={icon}
              draggable
              eventHandlers={{
                dragend: (e) => setPos(e.target.getLatLng()),
              }}
            />
          )}
        </MapContainer>
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
