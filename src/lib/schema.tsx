import { SITE_URL, business } from "./site";
import { bikes, bikeLabel, type Bike } from "./fleet";
import { faqs } from "./content";

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
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
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
