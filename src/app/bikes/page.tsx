import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Suspense } from "react";
import { FleetExplorer, FleetExplorerFromUrl } from "@/components/fleet-explorer";
import { FinalCta } from "@/components/home/sections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { bikes, inr, minPrice } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Bikes and Scooters for Rent in Hanamkonda: All 14 Models",
  description: `Rent Activa, Jupiter, Dio, Pulsar, FZ, Shine, SP 125, NS160 and Royal Enfield Classic, Hunter and Meteor 350 in Hanamkonda and Warangal. From ${inr(minPrice)}/day with kilometres included.`,
  alternates: { canonical: "/bikes" },
};

export default function BikesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Bikes", path: "/bikes" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Bikes" }]}
        title={`All ${bikes.length} bikes and scooters`}
        intro={`From ${inr(minPrice)} a day. Scooters for town, commuters for daily runs, street bikes for the highway and three Royal Enfields for the long road.`}
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <Suspense fallback={<FleetExplorer />}>
            <FleetExplorerFromUrl />
          </Suspense>
          <p className="mt-12 max-w-[70ch] text-gravel">
            The pictures are the makers&apos; photographs of each model; your bike&apos;s colour may differ. Fuel is not
            included and a refundable deposit is taken at pickup.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
