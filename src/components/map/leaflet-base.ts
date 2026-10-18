import L from "leaflet";

// CARTO Voyager: light basemap with green parks / blue water, close to the reference. No API key.
export const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export function pinIcon(color = "#E5484D") {
  return L.divIcon({
    className: "ob-pin",
    iconSize: [28, 36],
    iconAnchor: [14, 34],
    popupAnchor: [0, -30],
    html: `<svg viewBox="0 0 24 32" width="28" height="36" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.25))"><path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0z" fill="${color}"/><circle cx="12" cy="11.5" r="4.5" fill="#fff"/></svg>`,
  });
}
