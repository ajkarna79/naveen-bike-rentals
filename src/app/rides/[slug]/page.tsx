import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/sections";
import { ButtonLink, PricePlate, WhatsAppIcon } from "@/components/ui";
import { JsonLd, breadcrumbSchema, faqListSchema, rideGuideSchema } from "@/lib/schema";
import { rides } from "@/lib/content";
import { getRide, rideCost, rideFaqs } from "@/lib/rides";
import { bikeLabel, inr } from "@/lib/fleet";
import { business, whatsappHref } from "@/lib/site";
import { landings } from "@/lib/landings";

export function generateStaticParams() {
  return rides.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getRide(slug);
  if (!r) return {};
  const { roundTrip, cheapest } = rideCost(r);
  const title = `${r.name} by Bike from Hanamkonda (${r.km} km)`;
  const description = `${r.name} is ${r.km} km from Hanamkonda (${roundTrip} km round trip). The route, riding time, which rented bike to take${cheapest ? ` (from ${inr(cheapest.pricePerDay)}/day)` : ""} and tips.`;
  return {
    title,
    description,
    alternates: { canonical: `/rides/${r.slug}` },
    openGraph: { title, description, url: `/rides/${r.slug}`, images: [{ url: r.photo.src, alt: r.photo.alt }] },
  };
}

export default async function RideGuidePage({ params }: PageProps<"/rides/[slug]">) {
  const { slug } = await params;
  const r = getRide(slug);
  if (!r) notFound();
  const { roundTrip, covers, cheapest } = rideCost(r);
  const faqs = rideFaqs(r);
  const dest = /^[\d.]+,[\d.]+$/.test(r.dest) ? r.dest : encodeURIComponent(r.dest);
  const route = `https://www.google.com/maps/dir/?api=1&origin=${business.geo.lat},${business.geo.lng}&destination=${dest}&travelmode=driving`;
  const others = rides.filter((o) => o.slug !== r.slug);

  return (
    <>
      <JsonLd data={rideGuideSchema(r)} />
      <JsonLd data={faqListSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rides", path: "/rides" },
          { name: r.name, path: `/rides/${r.slug}` },
        ])}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Rides", href: "/rides" }, { name: r.name }]}
        title={`${r.name} from Hanamkonda by bike`}
        intro={`${r.km} km from our counter in Kishanpura, about ${r.time} on the road. The route, the bike to take and what the day costs.`}
      />

      <section className="pb-20 lg:pb-28">
        <div className="wrap container-x">
          <div className="relative aspect-[16/9] overflow-hidden bg-kerb">
            <Image src={r.photo.src} alt={r.photo.alt} fill preload sizes="(max-width: 1280px) 100vw, 1240px" className="object-cover" />
          </div>
          <dl className="mt-8 grid grid-cols-2 border-t border-ink sm:grid-cols-4">
            {[
              { k: "One way", v: `${r.km} km` },
              { k: "Round trip", v: `${roundTrip} km` },
              { k: "Riding time", v: r.time },
              { k: "Rent from", v: cheapest ? inr(cheapest.pricePerDay) : "Ask us" },
            ].map(({ k, v }) => (
              <div key={k} className="border-b border-line py-4 pr-4">
                <dt className="t-label text-gravel">{k}</dt>
                <dd className="mt-1 text-[1.5rem] tracking-[-0.015em] tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="about-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="about-title" className="t-h2 max-w-[16ch]">
              About {r.name}
            </h2>
            <p className="t-lead mt-6 max-w-[46ch]">{r.about}</p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="t-h3">The route</h2>
            <p className="mt-3 max-w-[52ch] text-gravel">{r.route}</p>
            <a href={route} target="_blank" rel="noopener noreferrer" className="link-line mt-4 inline-flex min-h-11 items-center font-medium">
              Open the route in Google Maps
            </a>
            <h2 className="t-h3 mt-10">Before you go</h2>
            <ul className="mt-3 border-t border-ink">
              {r.tips.map((t) => (
                <li key={t} className="border-b border-line py-3">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="bike-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="bike-title" className="t-h2 max-w-[16ch]">
              Which bike to rent for {r.name}
            </h2>
            <p className="mt-5 max-w-[46ch] text-gravel">
              The round trip is about {roundTrip} km. These bikes include at least that many kilometres a day, so you pay
              no extra-km charge.
            </p>
            <ButtonLink
              href={whatsappHref(`Hi ${business.name}! I'd like a bike for a ride to ${r.name}. Date: `)}
              external
              className="mt-8 min-h-14 px-7"
            >
              <WhatsAppIcon /> Book a bike for {r.name}
            </ButtonLink>
          </div>
          <ul className="border-t border-ink lg:col-span-6">
            {covers.slice(0, 6).map((b) => (
              <li key={b.slug}>
                <Link href={`/bikes/${b.slug}`} className="group flex min-h-16 items-center justify-between gap-4 border-b border-line">
                  <span>
                    <span className="link-draw font-medium">{bikeLabel(b)}</span>
                    <span className="block text-gravel">{b.kmPerDay} km a day included</span>
                  </span>
                  <PricePlate amount={inr(b.pricePerDay)} className="shrink-0 text-[1.05rem]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="rfaq-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="rfaq-title" className="t-h2 max-w-[14ch] lg:col-span-6">
            Questions about this ride
          </h2>
          <dl className="border-t border-ink lg:col-span-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-line py-6">
                <dt className="text-[1.125rem] font-medium">{f.q}</dt>
                <dd className="mt-2 text-gravel">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="more-rides" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="more-rides" className="t-h2 max-w-[14ch] lg:col-span-6">
            More rides from Hanamkonda
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/rides/${o.slug}`} className="link-draw inline-flex min-h-11 items-center">
                    {o.name}, {o.km} km
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              {landings
                .filter((l) => l.category)
                .map((l) => (
                  <li key={l.slug}>
                    <Link href={`/${l.slug}`} className="link-draw inline-flex min-h-11 items-center">
                      {l.h1}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
