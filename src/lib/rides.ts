import { rides } from "./content";
import { bikes, bikeLabel, inr, type Bike } from "./fleet";

export type Ride = (typeof rides)[number];

export const getRide = (slug: string) => rides.find((r) => r.slug === slug);

/** Round-trip km, and the bikes whose free km a day cover it, cheapest first. */
export function rideCost(r: Ride) {
  const roundTrip = Math.round(r.km * 2);
  const covers = bikes
    .filter((b) => b.kmPerDay >= roundTrip)
    .sort((a, b) => a.pricePerDay - b.pricePerDay || b.kmPerDay - a.kmPerDay);
  return { roundTrip, covers, cheapest: covers[0] as Bike | undefined };
}

/** Questions answered on each guide, built from the same facts the page shows. */
export function rideFaqs(r: Ride) {
  const { roundTrip, cheapest } = rideCost(r);
  return [
    {
      q: `How far is ${r.name} from Hanamkonda?`,
      a: `About ${r.km} km by road from Kishanpura, Hanamkonda, roughly ${r.time} on a bike. The round trip is about ${roundTrip} km.`,
    },
    {
      q: `Which rented bike is best for ${r.name}?`,
      a: cheapest
        ? `Any bike with at least ${roundTrip} km a day included covers the round trip. The lowest-priced is the ${bikeLabel(cheapest)} at ${inr(cheapest.pricePerDay)} a day; for comfort on longer roads, a Royal Enfield comes with 200 km a day.`
        : `The round trip is about ${roundTrip} km, more than any one day's free kilometres, so plan two days or ask about extra kilometres when you book.`,
    },
    {
      q: `How much does a bike trip to ${r.name} cost?`,
      a: cheapest
        ? `The rent starts at ${inr(cheapest.pricePerDay)} for the day (${bikeLabel(cheapest)}), plus fuel and a refundable deposit at pickup.`
        : `Ask on WhatsApp for a quote for the days you need.`,
    },
  ];
}
