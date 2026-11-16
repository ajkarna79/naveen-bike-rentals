import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PriceCalculator } from "@/components/price-calculator";
import { FaqList, FinalCta } from "@/components/home/sections";
import { SectionHead } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { bikes, bikeLabel, categories, inr, minPrice } from "@/lib/fleet";
import { conditions } from "@/lib/site";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bike Rental Prices in Hanamkonda and Warangal: Rate Card",
  description: `Daily bike and scooter rental prices in Hanamkonda: scooters from ${inr(minPrice)}/day, Pulsar and FZ from ₹499, Royal Enfield from ₹1,099. Kilometres included. Work out your total instantly.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Prices", path: "/pricing" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Prices" }]}
        title="Prices and the rent calculator"
        intro="One rate a day per bike, with the kilometres included. Slide to the number of days and every total updates."
      />

      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <PriceCalculator />
        </div>
      </section>

      <section aria-labelledby="rates-title" className="section-y bg-kerb">
        <div className="wrap container-x">
          <SectionHead id="rates-title" title="The rate card" side="Prices from the November 2026 rate list, for 24 hours each." />
          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {categories.map((c) => (
              <div key={c.id}>
                <h3 className="t-h3">{c.label}</h3>
                <p className="mt-1 text-gravel">{c.blurb}</p>
                <dl className="mt-5 border-t border-ink">
                  {bikes
                    .filter((b) => b.category === c.id)
                    .sort((a, b) => a.pricePerDay - b.pricePerDay)
                    .map((b) => (
                      <div key={b.slug} className="flex min-h-14 items-center justify-between gap-4 border-b border-line">
                        <dt className="font-medium">{bikeLabel(b)}</dt>
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

      <section aria-labelledby="terms-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 id="terms-title" className="t-h2 max-w-[14ch]">
              What to bring and what to know
            </h2>
          </div>
          <ul className="border-t border-ink lg:col-span-7">
            {conditions.map((c) => (
              <li key={c} className="border-b border-line py-4">
                {c}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5">
            <h2 className="t-h2 max-w-[14ch]">Questions about the price</h2>
          </div>
          <div className="lg:col-span-7">
            <FaqList items={faqs.filter((f) => /deposit|fuel|kilomet|weekly|monthly/i.test(f.q))} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
