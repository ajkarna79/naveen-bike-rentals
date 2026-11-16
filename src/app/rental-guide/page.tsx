import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/sections";
import { PolicyFooter, RuleTable } from "@/components/policy";
import { ButtonLink, WhatsAppIcon } from "@/components/ui";
import { JsonLd, breadcrumbSchema, faqListSchema } from "@/lib/schema";
import { POLICY_DATE, lateReturn, policyFaqs } from "@/lib/policies";
import { business, conditions, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rental Guide and Late-Return Charges",
  description:
    "What happens from pickup to return at Naveen Bike Rentals: documents, the bike check, extensions, and late-return charges (first hour free, then ₹100 to ₹500).",
  alternates: { canonical: "/rental-guide" },
};

const stages = [
  {
    title: "Arrive with your documents",
    text: "Bring your original driving licence for the bike type and your Aadhaar or another government photo ID. We check them and note your rental.",
  },
  {
    title: "Check the bike and pay",
    text: "Pay the rent and the refundable deposit. Look over the bike with us, note any marks already on it, check the fuel level and the kilometres included, then take the helmet and keys.",
  },
  {
    title: "Ride, and message us if plans change",
    text: "Need more time? Message us before your return time to extend. Breakdown or accident? Get somewhere safe first, then call us.",
  },
  {
    title: "Return and get your deposit",
    text: "Bring back the bike, helmet and keys. We check the bike and the kilometres with you, settle any charges and give the rest of the deposit back.",
  },
];

export default function RentalGuidePage() {
  return (
    <>
      <JsonLd data={faqListSchema(policyFaqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Rental guide", path: "/rental-guide" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Rental guide" }]}
        title="Rental guide"
        intro="From picking up the bike to getting your deposit back, here is how a rental works, and what a late return costs."
      />

      <section aria-labelledby="stages-title" className="pb-20 lg:pb-28">
        <div className="wrap container-x">
          <h2 id="stages-title" className="t-h2 max-w-[16ch]">
            A rental in four stages
          </h2>
          <ol className="mt-10 grid gap-x-6 gap-y-8 border-t border-ink pt-8 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.title}>
                <p className="font-medium tabular-nums text-gravel">{i + 1}</p>
                <h3 className="t-h3 mt-2">{s.title}</h3>
                <p className="mt-2 text-gravel">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="late-return" aria-labelledby="late-title" className="section-y scroll-mt-24 bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 id="late-title" className="t-h2 max-w-[14ch]">
              Late-return charges
            </h2>
            <p className="mt-5 max-w-[44ch] text-gravel">
              The first {lateReturn.graceHours === 1 ? "hour" : `${lateReturn.graceHours} hours`} after your return time is free. After that, if you have not had an
              extension approved, you pay the normal rent for the extra time plus one penalty from this table. Penalties are
              not added together: only the band you fall in applies.
            </p>
            <ButtonLink
              href={whatsappHref(`Hi ${business.name}, I'd like to extend my rental.`)}
              external
              variant="secondary"
              className="mt-8"
            >
              <WhatsAppIcon className="size-[18px]" /> Ask to extend
            </ButtonLink>
          </div>
          <div className="lg:col-span-7">
            <RuleTable
              caption="Late-return penalty, in addition to rent for the extra time"
              head={["Late by", "Penalty, plus rent for the extra time"]}
              rows={lateReturn.bands.map((b) => [b.delay, b.penalty])}
            />
            <p className="mt-6 text-gravel">
              <span className="font-medium text-ink">Extend instead.</span> Message us before your return time. If the bike
              is free, we approve it and you pay the normal rent for the extra time, with no penalty.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="before-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 id="before-title" className="t-h2 max-w-[14ch]">
              Before you set off
            </h2>
            <p className="mt-5 max-w-[44ch] text-gravel">
              Confirm on WhatsApp the deposit for your bike, the kilometres included and your return time. If you are riding
              out of town, tell us the route.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-ink">
              {conditions.map((c) => (
                <li key={c} className="border-b border-line py-3">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="gq-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 id="gq-title" className="t-h2 max-w-[14ch]">
              Questions about the rules
            </h2>
            <p className="mt-5 text-gravel">In effect from {POLICY_DATE}.</p>
            <Link href="/refund-policy" className="link-line mt-4 inline-flex min-h-11 items-center font-medium">
              How the deposit is refunded
            </Link>
          </div>
          <dl className="border-t border-ink lg:col-span-7">
            {policyFaqs.map((f) => (
              <div key={f.q} className="border-b border-line py-6">
                <dt className="text-[1.125rem] font-medium">{f.q}</dt>
                <dd className="mt-2 text-gravel">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-12 pt-4">
        <div className="wrap container-x max-w-[72ch]">
          <PolicyFooter current="guide" />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
