import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BikeStage } from "@/components/bike-visual";
import { BikeCard } from "@/components/bike-card";
import { BookingConsole } from "@/components/booking-console";
import { FaqList, FinalCta } from "@/components/home/sections";
import { PricePlate, SectionHead } from "@/components/ui";
import { JsonLd, bikeSchema, breadcrumbSchema } from "@/lib/schema";
import { bikes, bikeLabel, categoryOf, getBike, inr } from "@/lib/fleet";
import { conditions } from "@/lib/site";
import { faqs } from "@/lib/content";

const kindNoun = { scooter: "scooter", commuter: "commuter bike", street: "street bike", "royal-enfield": "motorcycle" } as const;

export function generateStaticParams() {
  return bikes.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bikes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBike(slug);
  if (!bike) return {};
  const title = `${bikeLabel(bike)} on Rent in Hanamkonda, Warangal: ${inr(bike.pricePerDay)}/day`;
  const description = `Rent the ${bikeLabel(bike)} in Hanamkonda & Warangal for ${inr(bike.pricePerDay)}/day with ${bike.kmPerDay} km/day included. ${bike.highlight} Book on WhatsApp in minutes.`;
  return {
    title,
    description,
    alternates: { canonical: `/bikes/${bike.slug}` },
    openGraph: { title, description, url: `/bikes/${bike.slug}`, images: bike.image ? [{ url: bike.image }] : undefined },
  };
}

export default async function BikePage({ params }: PageProps<"/bikes/[slug]">) {
  const { slug } = await params;
  const bike = getBike(slug);
  if (!bike) notFound();

  const cat = categoryOf(bike.category);
  const similar = bikes.filter((b) => b.category === bike.category && b.slug !== bike.slug).slice(0, 3);
  const plans = [1, 2, 3, 7].map((d) => ({ d, rent: bike.pricePerDay * d, km: bike.kmPerDay * d }));

  return (
    <>
      <JsonLd data={bikeSchema(bike)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Bikes", path: "/bikes" },
          { name: bikeLabel(bike), path: `/bikes/${bike.slug}` },
        ])}
      />

      <section className="pb-20 pt-[112px] sm:pt-[132px] lg:pb-28">
        <div className="wrap container-x">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.95rem] text-gravel">
              <li className="flex items-center gap-2">
                <Link href="/" className="link-line">Home</Link>
                <span aria-hidden="true">/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/bikes" className="link-line">Bikes</Link>
                <span aria-hidden="true">/</span>
              </li>
              <li aria-current="page" className="text-ink">{bikeLabel(bike)}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-7">
              <p className="t-lead text-gravel">
                {cat.label === bike.brand ? `${bike.brand}, ${bike.engine}` : `${bike.brand} ${kindNoun[bike.category]}, ${bike.engine}`}
              </p>
              <h1 className="t-h1 mt-2">{bike.name}</h1>
              <p className="t-lead mt-5 max-w-[40ch]">{bike.highlight}</p>

              <BikeStage bike={bike} preload sizes="(max-width: 1024px) 92vw, 700px" className="mt-10 aspect-[16/10]">
                {bike.badge && (
                  <span className="absolute left-4 top-4 bg-ground px-3 py-1.5 text-[0.875rem] font-medium">{bike.badge}</span>
                )}
                <PricePlate amount={inr(bike.pricePerDay)} className="absolute bottom-5 left-5 text-[1.6rem]" />
              </BikeStage>

              <dl className="mt-8 grid grid-cols-2 border-t border-ink sm:grid-cols-4">
                {[
                  { k: "A day", v: inr(bike.pricePerDay) },
                  { k: "Free km a day", v: `${bike.kmPerDay} km` },
                  { k: "Engine", v: bike.engine },
                  { k: "Gearbox", v: bike.transmission.startsWith("Automatic") ? "Gearless" : "5-speed" },
                ].map(({ k, v }) => (
                  <div key={k} className="border-b border-line py-4 pr-4">
                    <dt className="t-label text-gravel">{k}</dt>
                    <dd className="mt-1 text-[1.5rem] tracking-[-0.015em] tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
              <BookingConsole initialSlug={bike.slug} title={`Book the ${bike.name}`} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="plans-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="plans-title" className="t-h2">
              {bike.name} prices
            </h2>
            <table className="mt-8 w-full text-left">
              <caption className="sr-only">{bikeLabel(bike)} rental plans</caption>
              <thead className="border-b border-ink">
                <tr className="t-label text-gravel">
                  <th scope="col" className="py-3 font-medium">How long</th>
                  <th scope="col" className="py-3 font-medium">Rent</th>
                  <th scope="col" className="py-3 text-right font-medium">Km included</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.d} className="border-b border-line">
                    <th scope="row" className="py-4 font-medium">
                      {p.d === 7 ? "1 week" : `${p.d} day${p.d > 1 ? "s" : ""}`}
                    </th>
                    <td className="py-4 text-[1.125rem] font-medium tabular-nums">{inr(p.rent)}</td>
                    <td className="py-4 text-right tabular-nums text-gravel">{p.km} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-gravel">
              Renting for a week or a month? Ask on WhatsApp for a long-term rate. Fuel is not included.
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="t-h2">Before you ride</h2>
            <ul className="mt-8 border-t border-ink">
              {conditions.map((c) => (
                <li key={c} className="border-b border-line py-4">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-gravel">
              <span className="font-medium text-ink">Best for:</span> {bike.bestFor}.
            </p>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section aria-labelledby="similar-title" className="section-y">
          <div className="wrap container-x">
            <SectionHead id="similar-title" title={cat.id === "royal-enfield" ? "The other Royal Enfields" : `More ${cat.label.toLowerCase()}`} link={{ href: "/bikes", label: "All 14 bikes" }} />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((b) => (
                <BikeCard key={b.slug} bike={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="bike-faq-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="bike-faq-title" className="t-h2 lg:col-span-5">
            Questions about renting
          </h2>
          <div className="lg:col-span-7">
            <FaqList items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
