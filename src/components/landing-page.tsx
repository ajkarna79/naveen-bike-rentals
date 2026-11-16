import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "./page-hero";
import { BikeCard } from "./bike-card";
import { FinalCta } from "./home/sections";
import { ButtonLink, MoreLink, SectionHead, WhatsAppIcon } from "./ui";
import { JsonLd, breadcrumbSchema, faqListSchema, serviceSchema } from "@/lib/schema";
import { getLanding, landings } from "@/lib/landings";
import { bikes, bikeLabel, categories, getBike, inr } from "@/lib/fleet";
import { business, conditions, fullAddress, whatsappHref } from "@/lib/site";
import { rides } from "@/lib/content";

export function landingMetadata(slug: string): Metadata {
  const l = getLanding(slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { title: `${l.title} | ${business.name}`, description: l.description, url: `/${l.slug}` },
  };
}

/** A search landing page: an area people arrive from, or a bike type people search for. */
export function LandingPage({ slug }: { slug: string }) {
  const l = getLanding(slug);
  if (!l) notFound();

  const list = l.category ? bikes.filter((b) => b.category === l.category) : bikes;
  const picks = l.picks.map((s) => getBike(s)!).filter(Boolean);
  const directions = l.from
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(l.from.origin)}&destination=${business.geo.lat},${business.geo.lng}`
    : business.directionsUrl;
  const others = landings.filter((o) => o.slug !== l.slug);
  const groups = l.category ? categories.filter((c) => c.id === l.category) : categories;

  return (
    <>
      <JsonLd data={serviceSchema(l, list)} />
      <JsonLd data={faqListSchema(l.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: l.h1, path: `/${l.slug}` }])} />

      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: l.h1 }]} title={l.h1} intro={l.intro}>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <ButtonLink
            href={whatsappHref(`Hi ${business.name}! I'd like to rent a bike${l.from ? ` (coming from ${l.from.place})` : ""}.`)}
            external
            className="min-h-14 px-7"
          >
            <WhatsAppIcon /> Book on WhatsApp
          </ButtonLink>
          <a href={directions} target="_blank" rel="noopener noreferrer" className="link-line inline-flex min-h-11 items-center font-medium">
            {l.from ? `Directions from ${l.from.place}` : "Get directions"}
          </a>
        </div>
      </PageHero>

      {/* Where, how far, when */}
      <section aria-labelledby="where-title" className="pb-20 lg:pb-28">
        <div className="wrap container-x grid gap-6 lg:grid-cols-12">
          <div className="bg-kerb p-6 sm:p-10 lg:col-span-6">
            <h2 id="where-title" className="t-h3">
              Where you pick up the bike
            </h2>
            <p className="mt-4 text-[1.25rem] leading-[1.5]">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line">
                {fullAddress}
              </a>
            </p>
            <p className="mt-2 text-gravel">{business.address.landmark}.</p>
            {l.from && (
              <p className="mt-6 border-t border-line pt-5">
                <span className="text-[1.5rem] tabular-nums">{l.from.km} km</span>{" "}
                <span className="text-gravel">
                  by road from {l.from.place}, {l.from.time}.
                </span>
              </p>
            )}
            <p className="mt-4 text-gravel">
              Open every day from 6 AM to 11:30 PM. Friday until 10:30 PM, Saturday from 7 AM.
            </p>
          </div>
          <ul className="grid gap-px bg-line lg:col-span-6">
            {l.points.map((p) => (
              <li key={p.title} className="bg-ground py-5 lg:px-2">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-gravel">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recommended bikes */}
      <section aria-labelledby="picks-title" className="section-y bg-kerb">
        <div className="wrap container-x">
          <SectionHead
            id="picks-title"
            title={l.category ? `The ${list.length} to choose from` : "Good bikes to start with"}
            side="Every price is for 24 hours and includes the kilometres shown. Fuel is extra."
            link={l.category ? { href: `/bikes?type=${l.category}`, label: l.category === "scooter" ? "Compare the scooties" : "Compare the Royal Enfields" } : { href: "/bikes", label: "All 14 bikes" }}
          />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {picks.slice(0, l.category === "scooter" ? 4 : 3).map((b) => (
              <BikeCard key={b.slug} bike={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Full price list for this page */}
      <section aria-labelledby="rates-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="rates-title" className="t-h2 max-w-[14ch]">
              {l.category === "royal-enfield"
                ? "Royal Enfield rent per day"
                : l.category === "scooter"
                  ? "Scooty rent per day"
                  : `Bike rent per day in ${l.short === "Warangal" ? "Warangal" : "Hanamkonda"}`}
            </h2>
            <p className="mt-5 max-w-[46ch] text-gravel">
              Prices from the November 2026 rate list. For a week or a month, ask on WhatsApp for a lower rate.
            </p>
            <MoreLink href="/pricing" className="mt-6">
              Work out the total for your days
            </MoreLink>
          </div>
          <div className="lg:col-span-6">
            {groups.map((c) => (
              <div key={c.id} className="mb-8 last:mb-0">
                {!l.category && <h3 className="t-label mb-3">{c.label}</h3>}
                <dl className="border-t border-ink">
                  {list
                    .filter((b) => b.category === c.id)
                    .map((b) => (
                      <div key={b.slug} className="flex min-h-14 items-center justify-between gap-4 border-b border-line">
                        <dt>
                          <Link href={`/bikes/${b.slug}`} className="link-draw font-medium">
                            {bikeLabel(b)}
                          </Link>
                        </dt>
                        <dd className="flex items-baseline gap-5 tabular-nums">
                          <span className="text-gravel">{b.kmPerDay} km a day</span>
                          <span className="w-16 text-right font-medium">{inr(b.pricePerDay)}</span>
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions for this page, and what to bring */}
      <section aria-labelledby="lfaq-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="lfaq-title" className="t-h2 max-w-[14ch]">
              Questions people ask
            </h2>
            <h3 className="t-h3 mt-10">What to bring</h3>
            <ul className="mt-4 border-t border-ink">
              {conditions.slice(0, 4).map((c) => (
                <li key={c} className="border-b border-line py-3 text-gravel">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <dl className="border-t border-ink lg:col-span-6">
            {l.faqs.map((f) => (
              <div key={f.q} className="border-b border-line py-6">
                <dt className="text-[1.125rem] font-medium">{f.q}</dt>
                <dd className="mt-2 text-gravel">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Internal links: other areas and the ride guides */}
      <section aria-labelledby="more-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="more-title" className="t-h2 max-w-[14ch] lg:col-span-6">
            Also from the same counter
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <div>
              <p className="t-label mb-3 text-gravel">Rent in or near</p>
              <ul>
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/${o.slug}`} className="link-draw inline-flex min-h-11 items-center">
                      {o.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-label mb-3 text-gravel">Ride guides</p>
              <ul>
                {rides.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/rides/${r.slug}`} className="link-draw inline-flex min-h-11 items-center">
                      {r.name}, {r.km} km
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

