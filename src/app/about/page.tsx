import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/sections";
import { MoreLink, Stars } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, business, fullAddress } from "@/lib/site";
import { bikes, inr, minPrice } from "@/lib/fleet";
import { reviews } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Naveen Bike Rentals, Hanamkonda",
  description: `A self-drive bike and scooty rental counter in Kishanpura, Hanamkonda: ${bikes.length} two-wheelers from ${inr(minPrice)} a day, rated ${business.rating.value} on Google by ${business.rating.count} riders.`,
  alternates: { canonical: "/about" },
};

/*
  Everything on this page comes from the Google listing, the rate list and
  customers' own reviews. The owner can add their story in the "Our story"
  section below (see the README checklist).
*/
const quotes = ["Sudheer K.", "Venkatreddy M.", "Kevin M.", "Raghav M."]
  .map((n) => reviews.find((r) => r.name === n)!)
  .filter(Boolean);

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          name: metadata.title,
          mainEntity: { "@id": `${SITE_URL}/#business` },
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="About Naveen Bike Rentals"
        intro="A self-drive bike and scooty rental counter in Kishanpura, Hanamkonda, run by Naveen. Fourteen two-wheelers, one clear price a day, booked in one WhatsApp message."
      />

      <section aria-labelledby="facts-title" className="pb-20 lg:pb-28">
        <div className="wrap container-x">
          <h2 id="facts-title" className="sr-only">
            The counter in numbers
          </h2>
          <dl className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
            {[
              { k: "Bikes and scooties", v: String(bikes.length) },
              { k: "Rent from", v: `${inr(minPrice)} a day` },
              { k: "Google rating", v: `${business.rating.value} from ${business.rating.count}` },
              { k: "Open", v: "6 AM to 11:30 PM" },
            ].map(({ k, v }) => (
              <div key={k} className="border-b border-line py-5 pr-4">
                <dt className="t-label text-gravel">{k}</dt>
                <dd className="mt-1 text-[1.5rem] tracking-[-0.015em] tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="what-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="what-title" className="t-h2 max-w-[14ch] lg:col-span-6">
            What we do
          </h2>
          <div className="flex max-w-[60ch] flex-col gap-5 lg:col-span-6">
            <p className="t-lead">
              We rent scooties, commuter bikes, street bikes and Royal Enfields by the day, the weekend or the month, from one
              counter at {fullAddress}.
            </p>
            <p className="text-gravel">
              Every bike has one price for 24 hours with the kilometres written next to it, from 125 km a day on a scooty to
              200 km on a Royal Enfield. You book by sending the bike and the date on WhatsApp; we confirm what is free and the
              deposit in the same chat. There is no app and nothing to pay online.
            </p>
            <p className="text-gravel">
              Going by our reviews, many riders are visitors on a Warangal trip who want to see the temples and the fort on
              their own time, and groups taking several bikes out to Laknavaram for the day.
            </p>
            <MoreLink href="/how-to-book" className="mt-2">
              How booking works
            </MoreLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="say-title" className="section-y">
        <div className="wrap container-x">
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-6">
            <h2 id="say-title" className="t-h2 max-w-[16ch] lg:col-span-6">
              What riders say about us
            </h2>
            <p className="max-w-[46ch] text-gravel lg:col-span-6 lg:col-start-7">
              From our {business.rating.count} Google reviews, shortened. Every review is on our Google listing.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {quotes.map((r) => (
              <li key={r.name} className="border-t border-ink pt-6">
                <Stars value={r.rating} className="text-ink" />
                <blockquote className="t-lead mt-4">“{r.text}”</blockquote>
                <p className="mt-4 text-gravel">{r.name}, Google review</p>
              </li>
            ))}
          </ul>
          <a
            href={business.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line mt-10 inline-flex min-h-11 items-center font-medium"
          >
            Read all {business.rating.count} reviews on Google
          </a>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
