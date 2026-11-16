import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/sections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { rides } from "@/lib/content";
import { rideCost } from "@/lib/rides";
import { inr } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Bike Rides from Hanamkonda: 5 Day Trips",
  description:
    "Thousand Pillar Temple (3.5 km), Bhadrakali (5 km), Warangal Fort (10.5 km), Ramappa (65 km) and Laknavaram (76 km): routes, riding times and which rented bike to take.",
  alternates: { canonical: "/rides" },
};

export default function RidesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Rides", path: "/rides" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Rides" }]}
        title="Five rides from Hanamkonda"
        intro="From a 10-minute ride to the Thousand Pillar Temple to a full day at Laknavaram. Each guide has the route, the riding time and the bike that covers it."
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rides.map((r) => {
              const { roundTrip, cheapest } = rideCost(r);
              return (
                <li key={r.slug}>
                  <Link href={`/rides/${r.slug}`} className="group block transition-transform duration-300 hover:-translate-y-0.5">
                    <div className="zoom-frame relative aspect-[4/3] bg-kerb">
                      <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(max-width: 640px) 92vw, 400px" className="object-cover group-hover:scale-[1.03]" />
                    </div>
                    <h2 className="t-h3 mt-4">
                      <span className="link-draw">{r.name}</span>
                    </h2>
                    <p className="mt-1 text-gravel">
                      {r.km} km one way, {roundTrip} km round trip. {r.time}.{cheapest ? ` Rent from ${inr(cheapest.pricePerDay)}.` : ""}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
