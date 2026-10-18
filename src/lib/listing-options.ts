// Client-safe labels and helpers for listing enums (no server imports here).
import type {
  HouseType,
  ListingPurpose,
  ListingStatus,
} from "@/generated/prisma/enums";

export const houseTypeOptions: { value: HouseType; label: string; bedrooms?: number }[] = [
  { value: "BEDSITTER", label: "Bedsitter", bedrooms: 0 },
  { value: "STUDIO", label: "Studio", bedrooms: 0 },
  { value: "ONE_BEDROOM", label: "1 Bedroom", bedrooms: 1 },
  { value: "TWO_BEDROOM", label: "2 Bedroom", bedrooms: 2 },
  { value: "THREE_BEDROOM", label: "3 Bedroom", bedrooms: 3 },
  { value: "FOUR_BEDROOM", label: "4 Bedroom", bedrooms: 4 },
  { value: "FIVE_PLUS_BEDROOM", label: "5+ Bedroom", bedrooms: 5 },
  { value: "MAISONETTE", label: "Maisonette" },
  { value: "BUNGALOW", label: "Bungalow" },
  { value: "TOWNHOUSE", label: "Townhouse" },
  { value: "VILLA", label: "Villa" },
  { value: "PENTHOUSE", label: "Penthouse" },
  { value: "COMMERCIAL", label: "Commercial" },
];

export const purposeOptions: { value: ListingPurpose; label: string }[] = [
  { value: "RENT", label: "For rent" },
  { value: "SALE", label: "For sale" },
];

export const statusOptions: { value: ListingStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RESERVED", label: "Reserved" },
  { value: "LET", label: "Let" },
  { value: "SOLD", label: "Sold" },
];

export function houseTypeLabel(t: HouseType) {
  return houseTypeOptions.find((o) => o.value === t)?.label ?? t;
}

export function statusLabel(s: ListingStatus) {
  return statusOptions.find((o) => o.value === s)?.label ?? s;
}

export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function formatPrice(amount: number, purpose: ListingPurpose) {
  return purpose === "RENT" ? `${formatKes(amount)}/mo` : formatKes(amount);
}

export const NAIROBI: [number, number] = [-1.2921, 36.8219];
