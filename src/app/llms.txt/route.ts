import { SITE_URL, business, conditions, fullAddress } from "@/lib/site";
import { bikes, bikeLabel, categories, inr } from "@/lib/fleet";
import { faqs, rides } from "@/lib/content";
import { landings } from "@/lib/landings";
import { posts } from "@/lib/posts";
import { fmt12 } from "@/lib/hours";
import { cancellation, deductions, lateReturn } from "@/lib/policies";

/**
 * /llms.txt: a plain-text fact sheet for AI assistants and AI search
 * (https://llmstxt.org). Built from the same data as the pages, so prices,
 * hours and addresses here can never disagree with the site.
 */
export function GET() {
  const days = [1, 2, 3, 4, 5, 6, 0].map((d) => business.hours.find((h) => h.day === d)!);
  const lines = [
    `# ${business.name}`,
    "",
    `> Self-drive bike, scooty and Royal Enfield rental in Hanamkonda, Warangal, Telangana, India. ${bikes.length} two-wheelers from ${inr(Math.min(...bikes.map((b) => b.pricePerDay)))} to ${inr(Math.max(...bikes.map((b) => b.pricePerDay)))} a day, each with 125 to 200 km a day included. Booked on WhatsApp. Rated ${business.rating.value} on Google from ${business.rating.count} reviews.`,
    "",
    "## Key facts",
    "",
    `- Name: ${business.name}`,
    `- Address: ${fullAddress} (${business.address.landmark})`,
    `- Google Maps: ${business.mapsUrl}`,
    `- Phone and WhatsApp: ${business.phoneDisplay}`,
    `- Booking: send the bike, date and time on WhatsApp (https://wa.me/${business.whatsapp}); availability and deposit are confirmed in the chat. No online payment.`,
    `- Opening hours (IST): ${days.map((h) => `${h.label} ${fmt12(h.open)} to ${fmt12(h.close)}`).join("; ")}`,
    `- Areas served: ${business.areaServed.join(", ")}`,
    `- Distances from the counter by road: NIT Warangal 5.7 km, Kazipet Junction 7.7 km, Warangal railway station 7.9 km, Warangal bus station 8 km, Kakatiya University 3.4 km.`,
    `- Google rating: ${business.rating.value} from ${business.rating.count} reviews`,
    "",
    "## Prices (per 24 hours, fuel extra)",
    "",
    ...categories.flatMap((c) => [
      `### ${c.label}`,
      ...bikes
        .filter((b) => b.category === c.id)
        .map((b) => `- ${bikeLabel(b)}: ${inr(b.pricePerDay)} a day, ${b.kmPerDay} km a day included (${SITE_URL}/bikes/${b.slug})`),
      "",
    ]),
    "## Rental conditions",
    "",
    ...conditions.map((c) => `- ${c}`),
    "",
    "## Late returns, cancellation and deposit",
    "",
    `- Late return without an approved extension: normal rent for the extra time plus one penalty (not cumulative): ${lateReturn.bands.map((b) => `${b.delay}: ${b.penalty}`).join("; ")}. Approved extensions: normal rent only.`,
    `- Cancellation (only matters when an advance was paid; most bookings need none): ${cancellation.map((c) => `${c.when}: ${c.refund}`).join("; ")}.`,
    `- Deposit: refundable, amount told before booking, refunded in cash or UPI after a 5 to 10 minute return check. Deducted only for: ${deductions.filter((d) => d.charged).map((d) => d.item.toLowerCase()).join("; ")}. Never for normal wear or damage noted at pickup.`,
    `- Details: ${SITE_URL}/rental-guide, ${SITE_URL}/cancellation-policy, ${SITE_URL}/refund-policy`,
    "",
    "## Rides from Hanamkonda",
    "",
    ...rides.map((r) => `- [${r.name}](${SITE_URL}/rides/${r.slug}): about ${r.km} km by road, ${r.time}. Best on ${r.bike}.`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): overview, rate board, booking`,
    `- [All bikes](${SITE_URL}/bikes)`,
    `- [Prices and calculator](${SITE_URL}/pricing)`,
    ...landings.map((l) => `- [${l.h1}](${SITE_URL}/${l.slug}): ${l.description}`),
    `- [How to book](${SITE_URL}/how-to-book): the booking steps, what to bring, pickup and return`,
    `- [About us](${SITE_URL}/about)`,
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    `- [Questions](${SITE_URL}/faq)`,
    `- [Contact and directions](${SITE_URL}/contact)`,
    `- [Rental terms](${SITE_URL}/terms)`,
    `- [Rental guide and late-return charges](${SITE_URL}/rental-guide)`,
    `- [Cancellation policy](${SITE_URL}/cancellation-policy)`,
    `- [Deposit and refund policy](${SITE_URL}/refund-policy)`,
    `- [Privacy policy](${SITE_URL}/privacy-policy)`,
    "",
    "## Common questions",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
