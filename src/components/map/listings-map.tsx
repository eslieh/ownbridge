"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { NAIROBI } from "@/lib/listing-options";
import { TILE_ATTRIBUTION, TILE_URL, pinIcon } from "./leaflet-base";

export type MapPoint = {
  id: string;
  slug: string;
  title: string;
  price: string;
  lat: number;
  lng: number;
};

function FitBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 15);
      return;
    }
    map.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng])), { padding: [40, 40] });
  }, [map, points]);
  return null;
}

export default function ListingsMap({
  points,
  zoom = 12,
  showLinks = true,
}: {
  points: MapPoint[];
  zoom?: number;
  showLinks?: boolean;
}) {
  const icon = pinIcon();
  return (
    <MapContainer
      center={points[0] ? [points[0].lat, points[0].lng] : NAIROBI}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitBounds points={points} />
      {points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
          <Popup>
            <strong>{p.price}</strong>
            <br />
            {showLinks ? <a href={`/listings/${p.slug}`}>{p.title}</a> : p.title}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
