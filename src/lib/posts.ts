import { bikes, bikeLabel, categories, getBike, inr } from "./fleet";

/**
 * Blog posts. Prices and kilometres are read from the fleet data, so a change
 * to the rate list updates every post. Keep claims to what is true for this
 * counter or widely documented; no invented numbers.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  published: string;
  updated: string;
  image: { src: string; alt: string };
  /** Bike slugs to suggest at the end. */
  related: string[];
  body: Block[];
};

const b = (slug: string) => getBike(slug)!;
const price = (slug: string) => inr(b(slug).pricePerDay);
const km = (slug: string) => b(slug).kmPerDay;
const range = (cat: string) => {
  const list = bikes.filter((x) => x.category === cat).map((x) => x.pricePerDay);
  const lo = inr(Math.min(...list));
  const hi = inr(Math.max(...list));
  return lo === hi ? lo : `${lo} to ${hi}`;
};

const gearedList = bikes.filter((x) => x.category === "commuter" || x.category === "street").map((x) => x.pricePerDay);
const geared = `${inr(Math.min(...gearedList))} to ${inr(Math.max(...gearedList))}`;

export const posts: Post[] = [
  {
    slug: "classic-vs-hunter-vs-meteor-which-royal-enfield-to-rent",
    title: "Classic 350, Hunter 350 or Meteor 350: which Royal Enfield to rent",
    description: `All three share the same 349 cc engine and 200 km a day. The Classic is ${price("royal-enfield-classic-350")}, the Hunter ${price("royal-enfield-hunter-350")}, the Meteor ${price("royal-enfield-meteor-350")}. Here is how they differ and which suits your ride.`,
    published: "2026-11-16",
    updated: "2026-11-16",
    image: { src: "/bikes/classic-350.png", alt: "Royal Enfield Classic 350 in maroon, side view" },
    related: ["royal-enfield-classic-350", "royal-enfield-hunter-350", "royal-enfield-meteor-350"],
    body: [
      {
        type: "p",
        text: "We rent three Royal Enfields in Hanamkonda. They share the same 349 cc single-cylinder engine and the same 200 km a day, so the choice is really about how the bike sits and where you are riding.",
      },
      {
        type: "table",
        head: ["Bike", "Rent a day", "Free km a day", "Feels like", "Best for"],
        rows: [
          ["Classic 350", price("royal-enfield-classic-350"), `${km("royal-enfield-classic-350")} km`, "Upright, old-school, planted", "A first Royal Enfield, temple trips, photos"],
          ["Hunter 350", price("royal-enfield-hunter-350"), `${km("royal-enfield-hunter-350")} km`, "Light, short, quick to turn", "Town riding, newer riders, traffic"],
          ["Meteor 350", price("royal-enfield-meteor-350"), `${km("royal-enfield-meteor-350")} km`, "Low seat, relaxed, feet forward", "Long highway days, riding two-up"],
        ],
      },
      { type: "h2", text: "Classic 350: the one people picture" },
      {
        type: "p",
        text: "The Classic has the round headlamp, the tank badge and the upright seat that most people imagine when they think of a Royal Enfield. It is the heaviest-feeling of the three at walking pace and settles down nicely once it is moving. It is also the cheapest of the three.",
      },
      { type: "h2", text: "Hunter 350: the easiest in town" },
      {
        type: "p",
        text: "The Hunter is the smallest and lightest Royal Enfield, with smaller wheels and a shorter wheelbase. It turns quickly, is easy to push around a parking spot and is the least tiring in Hanamkonda traffic. If you have not ridden a 350 before, start here.",
      },
      { type: "h2", text: "Meteor 350: the most comfortable on the highway" },
      {
        type: "p",
        text: "The Meteor is the cruiser of the three: a low seat, a wide handlebar and footpegs set further forward, so you sit back rather than over the tank. It is the most comfortable for hours on the Mulugu road and the best for a pillion.",
      },
      { type: "h2", text: "Which one for your ride" },
      {
        type: "list",
        items: [
          "Around Hanamkonda and Warangal for a day: Hunter 350.",
          "Ramappa Temple (about 130 km there and back): Classic 350 or Meteor 350.",
          "Laknavaram Lake (about 152 km there and back) or riding two-up all day: Meteor 350.",
          "Want the classic Royal Enfield photo at the Thousand Pillar Temple: Classic 350.",
        ],
      },
      {
        type: "p",
        text: "You need a driving licence for geared motorcycles and your Aadhaar or another government photo ID at pickup. Fuel is extra and a refundable deposit is taken when you collect the bike.",
      },
    ],
  },
  {
    slug: "scooty-or-geared-bike-which-to-rent-in-warangal",
    title: "Scooty or geared bike: which to rent in Warangal",
    description: `Scooties are ${range("scooter")} a day with 125 km; geared bikes ${geared} with up to 180 km. Your licence, your route and your pillion decide which to take.`,
    published: "2026-11-16",
    updated: "2026-11-16",
    image: { src: "/bikes/activa-6g.png", alt: "Honda Activa 6G scooty, side view" },
    related: ["honda-activa-6g", "honda-shine", "bajaj-pulsar-150"],
    body: [
      {
        type: "p",
        text: "If you know where you want to go but not which kind of bike to take, three things decide it: the licence you hold, how far you are riding, and whether someone is riding with you.",
      },
      { type: "h2", text: "1. Check your licence first" },
      {
        type: "p",
        text: "Look at the vehicle classes printed on your driving licence. MCWOG (motorcycle without gear) covers scooties only. MCWG (motorcycle with gear) covers geared bikes, and in practice scooties too. If you only have MCWOG, take a scooty.",
      },
      { type: "h2", text: "2. How far are you going?" },
      {
        type: "table",
        head: ["Type", "Rent a day", "Free km a day", "Good for"],
        rows: categories.map((c) => {
          const list = bikes.filter((x) => x.category === c.id);
          const kms = [...new Set(list.map((x) => x.kmPerDay))].sort((x, y) => x - y);
          return [
            c.label,
            range(c.id),
            kms.length > 1 ? `${kms[0]} to ${kms[kms.length - 1]} km` : `${kms[0]} km`,
            c.id === "scooter"
              ? "Town, temples, college, errands"
              : c.id === "commuter"
                ? "Daily runs, Warangal Fort, short trips"
                : c.id === "street"
                  ? "Highway runs, Ramappa, Laknavaram"
                  : "Long rides, weekend trips, two-up",
          ];
        }),
      },
      {
        type: "p",
        text: "Inside Hanamkonda and Warangal a scooty is the easiest choice: the Thousand Pillar Temple, Bhadrakali and Warangal Fort together come to under 40 km. For Ramappa (about 130 km there and back) pick a bike with at least 150 km a day, like the Shine, SP 125 or Pulsar 150. For Laknavaram (about 152 km) take one with 180 km or more.",
      },
      { type: "h2", text: "3. Riding two-up?" },
      {
        type: "p",
        text: "For short rides in town any scooty is fine; the TVS Jupiter has the biggest seat. For a highway day with a pillion, a 150 cc bike or a Royal Enfield is steadier and less tiring. Ask for a second helmet when you book.",
      },
      { type: "h2", text: "Our short answer" },
      {
        type: "list",
        items: [
          `Only a gearless licence, or riding in town: Activa 5G or Dio (${price("honda-activa-5g")}).`,
          `Daily rides and a few short trips: Shine or SP 125 (${price("honda-shine")}, 150 km a day).`,
          `A day on the highway: Pulsar 150 (${price("bajaj-pulsar-150")}), FZ-S or NS160 (${price("yamaha-fz")}, 180 km a day).`,
          `The weekend trip of the year: a Royal Enfield (from ${price("royal-enfield-classic-350")}, 200 km a day).`,
        ],
      },
    ],
  },
  {
    slug: "renting-vs-buying-a-bike-in-warangal-for-students",
    title: "Renting vs buying a bike in Warangal: a guide for students",
    description: `Weekends only? Renting an Activa 5G for 8 days a month is ${inr(b("honda-activa-5g").pricePerDay * 8)}. Here is when renting beats buying for students at NIT Warangal and Kakatiya University, and when it does not.`,
    published: "2026-11-16",
    updated: "2026-11-16",
    image: { src: "/bikes/dio.png", alt: "Honda Dio scooty, side view" },
    related: ["honda-activa-5g", "honda-dio", "royal-enfield-hunter-350"],
    body: [
      {
        type: "p",
        text: "If you are in Warangal for a few years of college, buying a scooty can look like the obvious move. Often it is not. It depends on how many days a month you actually ride.",
      },
      { type: "h2", text: "What owning really costs" },
      {
        type: "p",
        text: "The price of the bike is only the start. Owning also means insurance every year, registration, servicing and tyres, a safe place to park in or near the hostel, and selling it when you leave. You pay for most of this whether you ride every day or twice a month.",
      },
      { type: "h2", text: "What renting costs, in numbers" },
      {
        type: "table",
        head: ["How you ride", "Bike", "Days a month", "Rent a month"],
        rows: [
          ["Weekends only", "Activa 5G", "8", inr(b("honda-activa-5g").pricePerDay * 8)],
          ["One trip a month", "Royal Enfield Hunter 350", "2", inr(b("royal-enfield-hunter-350").pricePerDay * 2)],
          ["A few errands a week", "Honda Dio", "6", inr(b("honda-dio").pricePerDay * 6)],
          ["Every day", "Any scooty", "30", "Ask for the monthly rate"],
        ],
      },
      {
        type: "p",
        text: "These are daily prices from our rate list. A monthly rental costs less per day than renting day by day; message us for the rate on the bike you want. Fuel is extra either way.",
      },
      { type: "h2", text: "When renting is the better deal" },
      {
        type: "list",
        items: [
          "You ride on weekends or a few days a month, not every day.",
          "You are here for a semester, an internship or less than a year.",
          "You want a Royal Enfield for trips but a scooty for everyday.",
          "You do not want to deal with insurance, servicing or selling it later.",
        ],
      },
      { type: "h2", text: "When buying makes more sense" },
      {
        type: "list",
        items: [
          "You ride every day for years, and have safe parking.",
          "You will keep the bike after college or take it home.",
        ],
      },
      {
        type: "p",
        text: "To rent you need to be 18 or older, with a driving licence for the bike type and your Aadhaar or another government photo ID. Our counter in Kishanpura is 5.7 km from NIT Warangal and 3.4 km from Kakatiya University.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postBikes = (p: Post) => p.related.map((s) => getBike(s)!).filter(Boolean);
export { bikeLabel };
