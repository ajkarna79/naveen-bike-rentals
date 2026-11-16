import type { CategoryId } from "./fleet";

/**
 * Search landing pages: one per place people arrive at or search from, and one
 * per bike type people search for. Each has its own facts (road distance from
 * the counter, measured with OpenStreetMap routing, Nov 2026), its own picks and
 * its own questions, so none is a copy of another.
 */
export type Landing = {
  slug: string;
  /** <title> without the brand suffix, ~55 characters. */
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  h1: string;
  intro: string;
  /** Short name used in links, breadcrumbs and the footer. */
  short: string;
  /** Where the visitor starts, for the distance block and Google directions. */
  from?: { place: string; km: number; time: string; origin: string };
  /** Bikes to list: a category, or every bike. */
  category?: CategoryId;
  /** Bike slugs to recommend first. */
  picks: string[];
  points: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const landings: Landing[] = [
  {
    slug: "bike-rental-hanamkonda",
    short: "Hanamkonda",
    title: "Bike Rental in Hanamkonda from ₹399/day",
    description:
      "Rent a bike or scooty in Hanamkonda from ₹399 a day with 125 to 200 km included. Activa, Pulsar, FZ and Royal Enfield. Pickup in Kishanpura, book on WhatsApp.",
    h1: "Bike and scooty rental in Hanamkonda",
    intro:
      "Our counter is in Kishanpura, Hanamkonda, open every day from 6 AM. Fourteen bikes from ₹399 a day, each with free kilometres, booked in one WhatsApp message.",
    from: { place: "Kakatiya University", km: 3.4, time: "about 10 minutes", origin: "Kakatiya University, Hanamkonda" },
    picks: ["honda-activa-6g", "bajaj-pulsar-150", "royal-enfield-classic-350"],
    points: [
      {
        title: "Right in Hanamkonda",
        text: "Kishanpura is inside Hanamkonda, 3.5 km from the Thousand Pillar Temple and 3.4 km from Kakatiya University. Most of the town is ten minutes away.",
      },
      {
        title: "For a day or a month",
        text: "Rent by the day for errands or a weekend, or ask on WhatsApp for a weekly or monthly rate while your own bike is in the workshop.",
      },
      {
        title: "Open early, close late",
        text: "Pick up from 6 AM (7 AM on Saturday) and return until 11:30 PM (10:30 PM on Friday), every day of the week.",
      },
    ],
    faqs: [
      {
        q: "Where can I rent a bike in Hanamkonda?",
        a: "Naveen Bike Rentals is in Kishanpura, Hanamkonda, inside the Mahi Rehabilitation Aids building. Message +91 80745 90399 on WhatsApp with the bike and date, then pick it up at the counter.",
      },
      {
        q: "How much is a scooty on rent in Hanamkonda?",
        a: "An Activa 5G or Honda Dio is ₹399 a day and an Activa 6G or TVS Jupiter is ₹499 a day, each with 125 km a day included. Fuel is extra.",
      },
      {
        q: "Can I rent a bike in Hanamkonda for a month?",
        a: "Yes. Monthly rentals are available and usually cost less per day than the daily price. Ask on WhatsApp for the rate on the bike you want.",
      },
    ],
  },
  {
    slug: "bike-rental-warangal",
    short: "Warangal",
    title: "Bike Rental in Warangal: Scooty & Royal Enfield",
    description:
      "Self-drive bike rental in Warangal: scooties from ₹399/day, Pulsar and FZ from ₹499, Royal Enfield from ₹1,099 with 200 km a day. Book on WhatsApp.",
    h1: "Bike rental in Warangal",
    intro:
      "Visiting Warangal for the temples, the fort or a weekend at the lakes? Rent a self-drive scooty or bike from our counter in Hanamkonda and see the city on your own time.",
    from: { place: "Warangal railway station", km: 7.9, time: "about 20 minutes", origin: "Warangal railway station" },
    picks: ["honda-activa-6g", "yamaha-fz", "royal-enfield-classic-350"],
    points: [
      {
        title: "All of Warangal on two wheels",
        text: "The Thousand Pillar Temple is 3.5 km from the counter, Bhadrakali about 5 km and Warangal Fort 10.5 km. A scooty covers all three in a day with kilometres to spare.",
      },
      {
        title: "Day trips out of the city",
        text: "Ramappa Temple (65 km) and Laknavaram Lake (76 km) are easy rides on a Royal Enfield, which comes with 200 km a day.",
      },
      {
        title: "Clear prices",
        text: "One rate a day per bike with the kilometres written next to it. Fuel is extra and a refundable deposit is taken at pickup.",
      },
    ],
    faqs: [
      {
        q: "What is the cost of renting a bike in Warangal?",
        a: "At Naveen Bike Rentals a scooty is ₹399 to ₹499 a day, commuter and street bikes ₹499 to ₹699, and Royal Enfields ₹1,099 to ₹1,299, each with 125 to 200 km a day included.",
      },
      {
        q: "Do I need a licence to rent a bike in Warangal?",
        a: "Yes. Bring a valid driving licence and your Aadhaar or another government photo ID. The originals are checked at pickup and riders must be 18 or older.",
      },
      {
        q: "Can I ride the rented bike to Ramappa or Laknavaram?",
        a: "Yes. Tell us your route when you book. For Ramappa (about 130 km there and back) a bike with 150 km a day or more is enough, like a Pulsar 150. For Laknavaram (about 152 km) take one with 180 km or more: an FZ-S, NS160 or a Royal Enfield.",
      },
    ],
  },
  {
    slug: "bike-rental-kazipet",
    short: "Kazipet",
    title: "Bike Rental near Kazipet Junction",
    description:
      "Arriving at Kazipet Junction? Rent a scooty or bike 7.7 km away in Kishanpura, Hanamkonda. From ₹399/day with kilometres included. Book on WhatsApp.",
    h1: "Bike rental near Kazipet",
    intro:
      "Kazipet Junction is one of Warangal's two main railway stations. Our counter in Kishanpura is 7.7 km by road, and your bike can be ready when you get there.",
    from: { place: "Kazipet Junction", km: 7.7, time: "about 20 minutes", origin: "Kazipet Junction railway station" },
    picks: ["honda-activa-5g", "honda-shine", "royal-enfield-hunter-350"],
    points: [
      {
        title: "Book before your train arrives",
        text: "Send the bike and your arrival time on WhatsApp. We confirm availability in the chat, so the bike is waiting when you walk in.",
      },
      {
        title: "From the station to the counter",
        text: "Take an auto or a cab from Kazipet Junction to Kishanpura, Hanamkonda. It is 7.7 km by road, usually about 20 minutes.",
      },
      {
        title: "Early trains, late trains",
        text: "The counter opens at 6 AM and stays open until 11:30 PM most days, so early arrivals and late departures both work.",
      },
    ],
    faqs: [
      {
        q: "How far is Naveen Bike Rentals from Kazipet Junction?",
        a: "About 7.7 km by road, roughly 20 minutes by auto or cab. The counter is in Kishanpura, Hanamkonda.",
      },
      {
        q: "Can I book a bike before I reach Kazipet?",
        a: "Yes. Message the bike, date and time on WhatsApp at +91 80745 90399. We reply with availability and the deposit.",
      },
      {
        q: "Can I return the bike just before my train leaves?",
        a: "Yes, return it at the Kishanpura counter during opening hours and leave about 20 minutes to reach Kazipet Junction.",
      },
    ],
  },
  {
    slug: "bike-rental-near-nit-warangal",
    short: "NIT Warangal",
    title: "Bike Rental near NIT Warangal for Students",
    description:
      "Bike and scooty rental 5.7 km from NIT Warangal. Activa from ₹399/day, Royal Enfield from ₹1,099 for weekend trips. Licence and Aadhaar needed. Book on WhatsApp.",
    h1: "Bike rental near NIT Warangal",
    intro:
      "Our counter in Kishanpura is 5.7 km from NIT Warangal. Students rent a scooty for the week's errands or a Royal Enfield for a weekend ride to Ramappa.",
    from: { place: "NIT Warangal", km: 5.7, time: "about 15 minutes", origin: "National Institute of Technology Warangal" },
    picks: ["honda-dio", "bajaj-pulsar-ns160", "royal-enfield-meteor-350"],
    points: [
      {
        title: "What you need",
        text: "A valid driving licence and your Aadhaar, originals shown at pickup. Riders must be 18 or older. A refundable deposit is taken when you collect the bike.",
      },
      {
        title: "Weekend rides with friends",
        text: "Going to Laknavaram or Ramappa as a group? Message how many bikes you need and we confirm what is free for those days.",
      },
      {
        title: "Longer rentals",
        text: "Need a scooty for a semester project or an internship month? Ask on WhatsApp for the monthly rate.",
      },
    ],
    faqs: [
      {
        q: "Can NIT Warangal students rent a bike?",
        a: "Yes, if you are 18 or older and have a valid driving licence for the bike type plus Aadhaar or another government photo ID.",
      },
      {
        q: "How far is the bike rental from NIT Warangal?",
        a: "About 5.7 km by road, around 15 minutes. The counter is in Kishanpura, Hanamkonda.",
      },
      {
        q: "Can a group rent several bikes at once?",
        a: "Yes. Message how many bikes you need and for which days; we confirm availability for the whole group on WhatsApp.",
      },
    ],
  },
  {
    slug: "bike-rental-near-warangal-railway-station",
    short: "Warangal station",
    title: "Bike Rental near Warangal Railway Station",
    description:
      "Arriving at Warangal railway station? Rent a scooty or Royal Enfield 7.9 km away in Hanamkonda from ₹399/day. Open 6 AM to 11:30 PM. Book on WhatsApp.",
    h1: "Bike rental near Warangal railway station",
    intro:
      "Warangal railway station and the Warangal bus station are both about 8 km from our counter in Kishanpura, Hanamkonda. Book on WhatsApp before you arrive.",
    from: { place: "Warangal railway station", km: 7.9, time: "about 20 minutes", origin: "Warangal railway station" },
    picks: ["tvs-jupiter", "bajaj-pulsar-150", "royal-enfield-classic-350"],
    points: [
      {
        title: "Closest sights first",
        text: "Warangal Fort is near the station side of the city and the Thousand Pillar Temple is 3.5 km from the counter. Both fit in a morning.",
      },
      {
        title: "From the station to the counter",
        text: "An auto or a cab takes about 20 minutes to Kishanpura, Hanamkonda (7.9 km by road).",
      },
      {
        title: "Luggage-friendly scooties",
        text: "The TVS Jupiter and Activa 6G have the biggest boots in the fleet, handy for a small bag.",
      },
    ],
    faqs: [
      {
        q: "How far is Naveen Bike Rentals from Warangal railway station?",
        a: "About 7.9 km by road, roughly 20 minutes. The Warangal bus station is about the same distance.",
      },
      {
        q: "Which bike is best for sightseeing in Warangal?",
        a: "A scooty like the Activa 6G or Jupiter is easiest in town. For Ramappa or Laknavaram, a Pulsar 150 or a Royal Enfield gives more kilometres a day.",
      },
      {
        q: "What time can I pick up the bike?",
        a: "From 6 AM to 11:30 PM most days (Saturday from 7 AM, Friday until 10:30 PM).",
      },
    ],
  },
  {
    slug: "royal-enfield-rental-warangal",
    short: "Royal Enfield",
    title: "Royal Enfield Rental in Warangal from ₹1,099/day",
    description:
      "Rent a Royal Enfield Classic 350 (₹1,099), Hunter 350 (₹1,199) or Meteor 350 (₹1,299) in Warangal with 200 km a day included. Book on WhatsApp.",
    h1: "Royal Enfield rental in Warangal",
    intro:
      "Three Royal Enfields, each with 200 km a day included: the Classic 350 for ₹1,099, the Hunter 350 for ₹1,199 and the Meteor 350 for ₹1,299. Picked up in Hanamkonda.",
    category: "royal-enfield",
    picks: ["royal-enfield-classic-350", "royal-enfield-hunter-350", "royal-enfield-meteor-350"],
    points: [
      {
        title: "200 km a day included",
        text: "Enough for Ramappa and back (about 130 km) or Laknavaram and back (about 152 km) without paying for extra kilometres.",
      },
      {
        title: "Which one to take",
        text: "The Classic is the one most people ask for. The Hunter is the lightest and easiest in town. The Meteor is the most comfortable for long highway rides.",
      },
      {
        title: "Book early for weekends",
        text: "For a Saturday or Sunday, message a few days ahead with the date and model. Once we confirm in the chat, it is yours.",
      },
    ],
    faqs: [
      {
        q: "How much is a Royal Enfield on rent in Warangal?",
        a: "At Naveen Bike Rentals the Classic 350 is ₹1,099 a day, the Hunter 350 ₹1,199 and the Meteor 350 ₹1,299, each with 200 km a day included. Fuel is extra.",
      },
      {
        q: "Is a Royal Enfield good for a Ramappa trip?",
        a: "Yes. Ramappa is about 65 km each way, so the round trip fits in the 200 km a day included with every Royal Enfield.",
      },
      {
        q: "What licence do I need for a Royal Enfield?",
        a: "A valid driving licence for geared motorcycles, plus Aadhaar or another government photo ID. Originals are checked at pickup.",
      },
    ],
  },
  {
    slug: "scooty-rental-warangal",
    short: "Scooty",
    title: "Scooty Rental in Warangal from ₹399/day",
    description:
      "Rent an Activa 5G or Dio for ₹399/day, or an Activa 6G or Jupiter for ₹499/day, with 125 km a day included. Gearless, easy, booked on WhatsApp.",
    h1: "Scooty rental in Warangal and Hanamkonda",
    intro:
      "Four gearless scooties, all with 125 km a day: the Activa 5G and Honda Dio for ₹399, the Activa 6G and TVS Jupiter for ₹499. Picked up in Kishanpura, Hanamkonda.",
    category: "scooter",
    picks: ["honda-activa-5g", "honda-dio", "honda-activa-6g", "tvs-jupiter"],
    points: [
      {
        title: "Easiest way round town",
        text: "No gears, light to handle and easy to park. A scooty is the simplest way to see the temples and markets of Hanamkonda and Warangal.",
      },
      {
        title: "125 km a day included",
        text: "More than enough for a day in the city: the Thousand Pillar Temple, Bhadrakali and Warangal Fort together come to under 40 km.",
      },
      {
        title: "Room for two",
        text: "The Jupiter has the biggest seat and boot for riding with a pillion. Ask for a second helmet when you book.",
      },
    ],
    faqs: [
      {
        q: "What is the scooty rent per day in Warangal?",
        a: "₹399 a day for an Activa 5G or Honda Dio and ₹499 a day for an Activa 6G or TVS Jupiter, each with 125 km a day included.",
      },
      {
        q: "Which licence do I need for a scooty?",
        a: "A valid licence for gearless two-wheelers (or a full motorcycle licence) and Aadhaar or another government photo ID.",
      },
      {
        q: "Can I get a helmet with the scooty?",
        a: "Yes, helmets are available at pickup. Ask for a pillion helmet too when you book.",
      },
    ],
  },
];

export const getLanding = (slug: string) => landings.find((l) => l.slug === slug);
export const areaLandings = landings.filter((l) => l.from);
export const typeLandings = landings.filter((l) => l.category);
