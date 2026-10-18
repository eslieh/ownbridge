import { site } from "./site";

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const registerPropertyMessage = [
  "Hello OwnBridge, I'd like to register my property with you.",
  "",
  "Owner name: ",
  "Property location: ",
  "Property type (e.g. bedsitter, studio, 2 bedroom): ",
  "Number of units: ",
  "Expected rent (KES): ",
].join("\n");

export function enquiryMessage(title: string, slug: string) {
  return `Hello OwnBridge, I'm interested in "${title}".\n${site.url}/listings/${slug}`;
}
