// Company facts and public config. Copy comes from docs/reference/company-content.md.

export const site = {
  name: "OwnBridge International",
  shortName: "OwnBridge",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline:
    "Properties managed with absolute precision. Investments guided by empirical truth. Legacies built for generations.",
  established: 2017,
  yearsExperience: "9+",
  unitsManaged: "1,800+",
  remittanceWindow: "6th–8th",
  scorecardDay: "10th",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  socials: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
  },
};

/** Mandatory — must appear verbatim on the site. */
export const DISCLAIMER =
  "Disclaimer: At OwnBridge International, we pride ourselves on our strict tenant vetting and rigorous property safety audits. However, please note that these services are designed to minimize risk, not eliminate it entirely.";

export const vision =
  "To define the global standards in premium property governance, empowering families and investors to transcend borders and secure their legacies through perfectly managed real estate wealth.";

export const mission =
  "OwnBridge International provides absolute clarity and asset mastery across the real estate landscape. We integrate elite property management and relocation services with rigorous investment analytics and flawless accounting, securing your generational prosperity.";

export const coreValues = [
  {
    title: "Intergenerational Stewardship",
    body: "We measure success by the lifespan of our client alliances, not transaction volume — lifelong guardians of our clients' physical wealth.",
  },
  {
    title: "Trustworthy",
    body: "We guard our clients' capital, privacy and peace of mind with fierce integrity, always aligned with their best interests.",
  },
  {
    title: "Professional",
    body: "Flawless execution with the discipline, precision and discretion expected in the premium market.",
  },
  {
    title: "Data-Centred Intelligence",
    body: "Every recommendation is backed by market analysis, predictive modelling and rigorous valuation metrics.",
  },
  {
    title: "Transparent",
    body: "Clear property performance reports, straightforward fee structures and completely honest advice.",
  },
  {
    title: "Quantitative Precision",
    body: "Institutional-grade property management with meticulous accounting — optimised yields, audited assets.",
  },
];

export const services = [
  {
    title: "Premium property management",
    body: "Tenant vetting, rent collection, maintenance and quarterly inspections, handled end to end.",
  },
  {
    title: "Home search & relocation",
    body: "Tell us the home you need — we search, shortlist and move you in with our own trucks and vans.",
  },
  {
    title: "Real estate accounting",
    body: "Monthly performance scorecards, transparent income & expense tracking, statutory tax support.",
  },
  {
    title: "Global real estate investments",
    body: "Investment theses backed by valuation metrics for local and diaspora investors.",
  },
];

export const forLandlords = [
  "Rent remitted to your account between the 6th and 8th of every month",
  "Monthly performance scorecard by the 10th",
  "Strict tenant screening: background, credit and employment checks",
  "Pre-screened waiting list for faster occupancy",
  "Quarterly inspections with photographic reports",
  "Legal advisory and statutory tax assistance",
];

export const forTenants = [
  "End-to-end home search and move-in support",
  "Relocation within our portfolio when you upgrade or downsize",
  "Rapid repair turnaround and 24/7 emergency channels",
  "Properties audited for structural, electrical and general safety",
  "Annual safety and first-aid training sessions",
  "Welcome-home hamper and neighbourhood guide",
];
