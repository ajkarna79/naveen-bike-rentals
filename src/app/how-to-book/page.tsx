import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BookingConsole } from "@/components/booking-console";
import { FinalCta } from "@/components/home/sections";
import { ButtonLink, WhatsAppIcon } from "@/components/ui";
import { JsonLd, breadcrumbSchema, faqListSchema } from "@/lib/schema";
import { steps } from "@/lib/content";
import { business, conditions, fullAddress, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Book a Bike on Rent in Hanamkonda",
  description:
    "Book a bike or scooty in Hanamkonda in one WhatsApp message: pick the bike and days, send it, show your licence and Aadhaar at pickup, ride. No app, no advance payment.",
  alternates: { canonical: "/how-to-book" },
};

const ways = [
  {
    title: "Use the form on this page",
    text: "Choose the bike, the date, the time and the days. The total and the free kilometres show as you go, and the button writes the WhatsApp message for you.",
  },
  {
    title: "Message us yourself",
    text: `Send the bike, the date and the pickup time to ${business.phoneDisplay} on WhatsApp. Not sure which bike? Tell us where you are riding and we suggest one.`,
  },
  {
    title: "Call or walk in",
    text: `Call ${business.phoneDisplay}, or come to the counter in Kishanpura during opening hours and take whatever is free.`,
  },
];

const faqs = [
  {
    q: "Do I have to pay online to book a bike?",
    a: "No. There is no online payment. You pay the rent and a refundable security deposit at the counter when you pick the bike up.",
  },
  {
    q: "How early should I book?",
    a: "As early as you can. Same-day rentals work when a bike is free; for a weekend, a holiday or a Royal Enfield, message a few days before so we can hold it for you.",
  },
  {
    q: "Can I extend my rental?",
    a: "Yes, if the bike is free. Message us on WhatsApp before your return time and we confirm the extra time at the normal rent. Returning late without asking costs a penalty after the first free hour; see the rental guide.",
  },
  {
    q: "What happens at pickup?",
    a: "We check your original driving licence and ID, you look over the bike with us, note the fuel level, take the helmet and keys, and ride off.",
  },
];

export default function HowToBookPage() {
  return (
    <>
      <JsonLd data={faqListSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "How to book", path: "/how-to-book" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "How to book" }]}
        title="How to book a bike"
        intro="One WhatsApp message, no app and no advance payment. Here is the whole process, from choosing a bike to getting the deposit back."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={whatsappHref(`Hi ${business.name}! I'd like to rent a bike.`)} external className="min-h-14 px-7">
            <WhatsAppIcon /> Book on WhatsApp
          </ButtonLink>
          <ButtonLink href={telHref} variant="secondary" className="min-h-14 px-7">
            <Phone className="size-4" aria-hidden="true" /> Call {business.phoneDisplay}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="ways-title" className="pb-20 lg:pb-28">
        <div className="wrap container-x">
          <h2 id="ways-title" className="t-h2 max-w-[16ch]">
            Three ways to book
          </h2>
          <ul className="mt-10 grid gap-x-6 gap-y-8 border-t border-ink pt-8 md:grid-cols-3">
            {ways.map((w) => (
              <li key={w.title}>
                <h3 className="t-h3">{w.title}</h3>
                <p className="mt-2 text-gravel">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section-y bg-kerb">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="steps-title" className="t-h2 max-w-[14ch]">
              From message to ride
            </h2>
            <ol className="mt-10 border-t border-ink">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line py-5">
                  <span className="font-medium tabular-nums text-gravel">{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="mt-1 text-gravel">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h2 className="t-h3 mt-12">What to bring</h2>
            <ul className="mt-4 border-t border-ink">
              {conditions.map((c) => (
                <li key={c} className="border-b border-line py-3">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-gravel">
              Pickup and return are at {fullAddress}, {business.address.landmark.toLowerCase()}.
            </p>
          </div>
          <div className="lg:col-span-6">
            <BookingConsole tone="ground" headingLevel={3} title="Work out the rent" className="lg:sticky lg:top-[96px]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="hfaq-title" className="section-y">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="hfaq-title" className="t-h2 max-w-[14ch] lg:col-span-6">
            Booking questions
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
      <FinalCta />
    </>
  );
}
