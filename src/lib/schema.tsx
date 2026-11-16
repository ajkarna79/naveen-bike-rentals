import { SITE_URL, business } from "./site";
import { bikes, bikeLabel, type Bike } from "./fleet";
import { faqs, rides } from "./content";
import type { Landing } from "./landings";

/** Renders JSON-LD safely (escapes `<` so content can't break out of the script tag). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    description: business.description,
    url: SITE_URL,
    telephone: business.phoneE164,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    priceRange: `₹${Math.min(...bikes.map((b) => b.pricePerDay))}–₹${Math.max(...bikes.map((b) => b.pricePerDay))} per day`,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapsUrl,
    sameAs: [business.mapsUrl, ...Object.values(business.social).filter(Boolean)],
    areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
    knowsLanguage: ["en", "te", "hi"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bike and scooty rental",
      itemListElement: bikes.map((b) => ({
        "@type": "Offer",
        name: `${bikeLabel(b)}, ${b.kmPerDay} km a day included`,
        url: `${SITE_URL}/bikes/${b.slug}`,
        priceCurrency: "INR",
        price: b.pricePerDay,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: b.pricePerDay,
          priceCurrency: "INR",
          unitCode: "DAY",
        },
        itemOffered: { "@type": "Product", name: bikeLabel(b), brand: { "@type": "Brand", name: b.brand } },
      })),
    },
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
    },
  };
}

export function bikeSchema(bike: Bike) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${bikeLabel(bike)} rental`,
    brand: { "@type": "Brand", name: bike.brand },
    category: "Two-wheeler rental",
    image: bike.image ? `${SITE_URL}${bike.image}` : undefined,
    description: `${bikeLabel(bike)} for rent in Hanamkonda & Warangal at ₹${bike.pricePerDay}/day with ${bike.kmPerDay} km/day included.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: bike.pricePerDay,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/bikes/${bike.slug}`,
      seller: { "@id": `${SITE_URL}/#business` },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: bike.pricePerDay,
        priceCurrency: "INR",
        unitCode: "DAY",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** The site itself, linked to the business as its publisher. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.name,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

/** FAQPage from any list of questions. */
export function faqListSchema(list: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A landing page as the rental service in that area or for that bike type. */
export function serviceSchema(l: Landing, list: Bike[]) {
  const prices = list.map((b) => b.pricePerDay);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${l.slug}#service`,
    name: l.h1,
    serviceType: l.category === "royal-enfield" ? "Royal Enfield rental" : l.category === "scooter" ? "Scooty rental" : "Bike rental",
    description: l.description,
    url: `${SITE_URL}/${l.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "City", name: "Hanamkonda" },
      { "@type": "City", name: "Warangal" },
      ...(l.from ? [{ "@type": "Place", name: l.from.place }] : []),
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: list.length,
    },
  };
}

/** A ride guide as an article about a place. */
export function rideGuideSchema(r: (typeof rides)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${r.name} from Hanamkonda by bike`,
    description: `${r.name} is about ${r.km} km from Hanamkonda. Route, riding time, which rented bike to take and what it costs.`,
    image: `${SITE_URL}${r.photo.src}`,
    inLanguage: "en-IN",
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: `${SITE_URL}/rides/${r.slug}`,
    about: { "@type": "TouristAttraction", name: r.name, address: { "@type": "PostalAddress", addressRegion: "Telangana", addressCountry: "IN" } },
  };
}
