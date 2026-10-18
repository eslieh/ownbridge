"use client";

// Leaflet touches `window`, so the maps only render in the browser.
import dynamic from "next/dynamic";

const placeholder = () => <div className="h-full w-full animate-pulse bg-muted" />;

export const ListingsMap = dynamic(() => import("./listings-map"), {
  ssr: false,
  loading: placeholder,
});

export const LocationPicker = dynamic(() => import("./location-picker"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-[var(--radius-media)] bg-muted" />,
});

export type { MapPoint } from "./listings-map";
