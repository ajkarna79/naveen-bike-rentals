/**
 * Fleet & tariff — from the owner's rate list (Nov 2026).
 * Prices are per day (24 h) in INR; `kmPerDay` is included distance per day.
 * Engine/transmission figures are the manufacturers' published specs.
 */

export type CategoryId = "scooter" | "commuter" | "street" | "royal-enfield";

export const categories: { id: CategoryId; label: string; short: string; blurb: string }[] = [
  {
    id: "scooter",
    label: "Scooties",
    short: "Scooty",
    blurb: "Gearless, light and easy. Perfect for city errands, college and first-time riders.",
  },
  {
    id: "commuter",
    label: "Commuter bikes",
    short: "Commuter",
    blurb: "Geared, fuel-efficient and comfortable for daily runs and short trips.",
  },
  {
    id: "street",
    label: "Street & sport",
    short: "Street",
    blurb: "More power and attitude for highway runs, weekend plans and fun.",
  },
  {
    id: "royal-enfield",
    label: "Royal Enfield",
    short: "Royal Enfield",
    blurb: "The thump. Cruise to Ramappa or Laknavaram on a 350.",
  },
];

export type Bike = {
  slug: string;
  name: string;
  brand: string;
  category: CategoryId;
  pricePerDay: number;
  kmPerDay: number;
  engine: string;
  transmission: "Automatic (CVT)" | "5-speed manual" | "4-speed manual";
  bestFor: string;
  highlight: string;
  image?: string;
  /** Optional badge shown on cards. */
  badge?: string;
  /** Free-text the owner left on the rate list that still needs confirming. */
  note?: string;
};

export const bikes: Bike[] = [
  {
    slug: "honda-activa-5g",
    image: "/bikes/activa-5g.png",
    name: "Activa 5G",
    brand: "Honda",
    category: "scooter",
    pricePerDay: 399,
    kmPerDay: 125,
    engine: "109 cc",
    transmission: "Automatic (CVT)",
    bestFor: "Budget city rides",
    highlight: "India's favourite scooty at our lowest daily price.",
    badge: "Lowest price",
  },
  {
    slug: "honda-dio",
    image: "/bikes/dio.png",
    name: "Dio",
    brand: "Honda",
    category: "scooter",
    pricePerDay: 399,
    kmPerDay: 125,
    engine: "110 cc",
    transmission: "Automatic (CVT)",
    bestFor: "Students & quick hops",
    highlight: "Sporty, light and nimble through Hanamkonda traffic.",
  },
  {
    slug: "honda-activa-6g",
    image: "/bikes/activa-6g.png",
    name: "Activa 6G",
    brand: "Honda",
    category: "scooter",
    pricePerDay: 499,
    kmPerDay: 125,
    engine: "110 cc",
    transmission: "Automatic (CVT)",
    bestFor: "Comfortable everyday rides",
    highlight: "The newer Activa: smoother, quieter, more storage.",
    badge: "Most booked",
    note: "Rate list says “5” next to this model — confirm meaning (stock count?).",
  },
  {
    slug: "tvs-jupiter",
    image: "/bikes/jupiter.webp",
    name: "Jupiter",
    brand: "TVS",
    category: "scooter",
    pricePerDay: 499,
    kmPerDay: 125,
    engine: "110 cc",
    transmission: "Automatic (CVT)",
    bestFor: "Two-up comfort",
    highlight: "Big seat, big boot space, easy for pillion.",
  },
  {
    slug: "bajaj-pulsar-125",
    image: "/bikes/pulsar-125.webp",
    name: "Pulsar 125",
    brand: "Bajaj",
    category: "commuter",
    pricePerDay: 499,
    kmPerDay: 125,
    engine: "125 cc",
    transmission: "5-speed manual",
    bestFor: "Pulsar style on a budget",
    highlight: "Geared, peppy and frugal, so every kilometre costs little.",
  },
  {
    slug: "honda-shine",
    image: "/bikes/shine.png",
    name: "Shine",
    brand: "Honda",
    category: "commuter",
    pricePerDay: 599,
    kmPerDay: 150,
    engine: "125 cc",
    transmission: "5-speed manual",
    bestFor: "Long, fuel-efficient days",
    highlight: "Bulletproof reliability with 150 km a day included.",
  },
  {
    slug: "honda-sp-125",
    image: "/bikes/sp125.png",
    name: "SP 125",
    brand: "Honda",
    category: "commuter",
    pricePerDay: 599,
    kmPerDay: 150,
    engine: "125 cc",
    transmission: "5-speed manual",
    bestFor: "Modern commuter feel",
    highlight: "Digital console, smooth engine, sharp looks.",
  },
  {
    slug: "yamaha-fz-classic",
    image: "/bikes/fz-old.webp",
    name: "FZ (older model)",
    brand: "Yamaha",
    category: "street",
    pricePerDay: 499,
    kmPerDay: 125,
    engine: "150 cc",
    transmission: "5-speed manual",
    bestFor: "Street bike for less",
    highlight: "The muscular FZ stance at a commuter price.",
    badge: "Value pick",
  },
  {
    slug: "bajaj-pulsar-150",
    image: "/bikes/pulsar-150.webp",
    name: "Pulsar 150",
    brand: "Bajaj",
    category: "street",
    pricePerDay: 599,
    kmPerDay: 150,
    engine: "150 cc",
    transmission: "5-speed manual",
    bestFor: "Highway day trips",
    highlight: "The classic Pulsar, the one most riders pick for trips.",
  },
  {
    slug: "yamaha-fz",
    image: "/bikes/fz.webp",
    name: "FZ-S Fi",
    brand: "Yamaha",
    category: "street",
    pricePerDay: 699,
    kmPerDay: 180,
    engine: "149 cc",
    transmission: "5-speed manual",
    bestFor: "Comfort + attitude",
    highlight: "Fuel-injected, upright and comfy with 180 km/day.",
  },
  {
    slug: "bajaj-pulsar-ns160",
    image: "/bikes/ns160.webp",
    name: "Pulsar NS160",
    brand: "Bajaj",
    category: "street",
    pricePerDay: 699,
    kmPerDay: 180,
    engine: "160 cc",
    transmission: "5-speed manual",
    bestFor: "Spirited riding",
    highlight: "Naked-sport styling and the punchiest motor in the lineup.",
  },
  {
    slug: "royal-enfield-classic-350",
    image: "/bikes/classic-350.png",
    name: "Classic 350",
    brand: "Royal Enfield",
    category: "royal-enfield",
    pricePerDay: 1099,
    kmPerDay: 200,
    engine: "349 cc",
    transmission: "5-speed manual",
    bestFor: "The Bullet experience",
    highlight: "That thump. The bike most people ask for in Warangal.",
    badge: "Rider favourite",
  },
  {
    slug: "royal-enfield-hunter-350",
    image: "/bikes/hunter-350.png",
    name: "Hunter 350",
    brand: "Royal Enfield",
    category: "royal-enfield",
    pricePerDay: 1199,
    kmPerDay: 200,
    engine: "349 cc",
    transmission: "5-speed manual",
    bestFor: "Light, agile Royal Enfield",
    highlight: "Roadster attitude, easiest RE to ride in town.",
  },
  {
    slug: "royal-enfield-meteor-350",
    image: "/bikes/meteor-350.png",
    name: "Meteor 350",
    brand: "Royal Enfield",
    category: "royal-enfield",
    pricePerDay: 1299,
    kmPerDay: 200,
    engine: "349 cc",
    transmission: "5-speed manual",
    bestFor: "Long-distance cruising",
    highlight: "Laid-back cruiser ergonomics for the long road.",
    badge: "Tourer",
  },
];

export const minPrice = Math.min(...bikes.map((b) => b.pricePerDay));
export const maxKm = Math.max(...bikes.map((b) => b.kmPerDay));

export function getBike(slug: string) {
  return bikes.find((b) => b.slug === slug);
}

export function bikeLabel(b: Bike) {
  return `${b.brand} ${b.name}`;
}

export function categoryOf(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
