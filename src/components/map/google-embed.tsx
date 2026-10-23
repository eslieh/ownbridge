// Keyless Google Maps embed. It shows a single pin per iframe, no API key needed.
export function embedUrl(lat: number, lng: number, zoom = 15) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=en&output=embed`;
}

export function directionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function GoogleMapEmbed({
  lat,
  lng,
  zoom = 15,
  title = "Map",
}: {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
}) {
  return (
    <iframe
      title={title}
      src={embedUrl(lat, lng, zoom)}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
