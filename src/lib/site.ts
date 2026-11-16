/**
 * Single source of truth for business details.
 * Facts below were taken from the public Google Business Profile (Nov 2026)
 * and the owner's own promotional posters. Edit here and every page updates.
 */

/**
 * The site's public address, used for canonical links, the sitemap and share
 * links (server-side only). Order: NEXT_PUBLIC_SITE_URL if you set it, else
 * Netlify's build-time URL (your primary domain, or the *.netlify.app address
 * until you add one), else the placeholder.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://naveenbikerentals.in"
).replace(/\/$/, "");

export const business = {
  name: "Naveen Bike Rentals",
  shortName: "Naveen Rentals",
  tagline: "Bike & scooty rentals in Hanamkonda, Warangal",
  description:
    "Rent scooties, commuter bikes, sports bikes and Royal Enfields in Hanamkonda & Warangal. Daily, weekend and monthly plans from ₹399/day with kilometres included. Book in minutes on WhatsApp.",
  phoneDisplay: "+91 80745 90399",
  phoneE164: "+918074590399",
  whatsapp: "918074590399",
  address: {
    street: "Kishanpura",
    landmark: "Inside the Mahi Rehabilitation Aids building",
    locality: "Hanamkonda",
    region: "Telangana",
    postalCode: "506001",
    country: "IN",
  },
  areaServed: ["Hanamkonda", "Warangal", "Kazipet", "Kishanpura", "Nayeem Nagar"],
  geo: { lat: 18.0140293, lng: 79.5582224 },
  plusCode: "2H75+J7 Hanamkonda",
  mapsUrl: "https://maps.google.com/?cid=6376492611048253542",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=18.0140293,79.5582224",
  reviewsUrl: "https://maps.google.com/?cid=6376492611048253542&action=reviews",
  mapEmbedUrl:
    "https://www.google.com/maps?q=NAVEEN+BIKE+RENTALS,+Kishanpura,+Hanamkonda&ll=18.0140293,79.5582224&z=16&output=embed",
  rating: { value: 4.4, count: 240, source: "Google" },
  yearsServing: "6+",
  /** 0 = Sunday … 6 = Saturday. Times are 24h, Asia/Kolkata. */
  hours: [
    { day: 0, label: "Sunday", open: "06:00", close: "23:30" },
    { day: 1, label: "Monday", open: "06:00", close: "23:30" },
    { day: 2, label: "Tuesday", open: "06:00", close: "23:30" },
    { day: 3, label: "Wednesday", open: "06:00", close: "23:30" },
    { day: 4, label: "Thursday", open: "06:00", close: "23:30" },
    { day: 5, label: "Friday", open: "06:00", close: "22:30" },
    { day: 6, label: "Saturday", open: "07:00", close: "23:30" },
  ],
  social: {
    // Add the real handles when available — empty values are hidden.
    instagram: "",
    facebook: "",
  },
} as const;

export const fullAddress = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;

export const telHref = `tel:${business.phoneE164}`;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const nav = [
  { href: "/bikes", label: "Bikes" },
  { href: "/pricing", label: "Prices" },
  { href: "/rides", label: "Rides" },
  { href: "/#visit", label: "Visit" },
  { href: "/blog", label: "Guides" },
  { href: "/faq", label: "FAQ" },
] as const;

/** Rental conditions, as printed on the owner's own posters. */
export const conditions = [
  "A valid driving licence and Aadhaar or another government photo ID, originals shown at pickup",
  "Riders must be 18 or older",
  "Refundable security deposit, returned when the bike comes back fine",
  "Fuel is not included: bring the bike back at the level you took it",
  "Helmets available at pickup",
  "The rest of the rental terms are explained before you ride",
];

export const inclusions = [
  { title: "Well-maintained bikes", text: "Serviced, cleaned and checked before every handover." },
  { title: "Helmets available", text: "Ask for a pillion helmet too when you book." },
  { title: "Kilometres included", text: "125–200 km/day included depending on the bike." },
  { title: "Roadside help", text: "Breakdown on the road? Call us and we will guide you or come to you." },
];
