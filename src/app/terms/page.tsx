import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { business, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rental Terms",
  description: "Rental terms for Naveen Bike Rentals, Hanamkonda: eligibility, documents, deposit, fuel, kilometres, damage and returns.",
  alternates: { canonical: "/terms" },
};

/**
 * NOTE FOR THE OWNER: these terms summarise the conditions printed on your
 * posters plus standard rental practice. Review and adjust before going live.
 */
const sections = [
  {
    h: "Eligibility and documents",
    p: [
      "Riders must be 18 years or older and hold a valid driving licence for the vehicle type (gearless or geared).",
      "An original driving licence and Aadhaar card (or other government photo ID) must be shown at pickup for verification.",
    ],
  },
  {
    h: "Booking and confirmation",
    p: [
      "Requests sent through this website or WhatsApp are enquiries. A booking is confirmed only after we confirm availability and the rider completes verification at pickup.",
      "Prices shown are per 24-hour day. Long-term (weekly or monthly) rates are quoted separately.",
    ],
  },
  {
    h: "Security deposit",
    p: [
      "A refundable security deposit is collected at pickup. The amount depends on the vehicle and rental duration and is told to you before you come.",
      "The deposit is refunded on return after the vehicle, helmet(s) and keys are checked. Applicable charges (damage, extra kilometres, late return, traffic fines) may be adjusted from it.",
    ],
  },
  {
    h: "Kilometres and fuel",
    p: [
      "Each plan includes a fixed number of kilometres per day as listed on the bike's page. Kilometres beyond this are charged as per the rental policy.",
      "Fuel is not included. Return the vehicle with the same fuel level as at pickup.",
    ],
  },
  {
    h: "Use of the vehicle",
    p: [
      "Wear a helmet at all times and follow traffic rules. The rider is responsible for traffic challans and fines during the rental period.",
      "No racing, stunts, commercial use, sub-letting, or riding under the influence. Outstation trips are allowed when informed at the time of booking.",
    ],
  },
  {
    h: "Breakdowns, accidents and damage",
    p: [
      "In case of a breakdown or accident, call us immediately on " + business.phoneDisplay + ". Do not get major repairs done without our approval.",
      "Damage caused during the rental period is the rider's responsibility as per the rental policy.",
    ],
  },
  {
    h: "Returns and extensions",
    p: [
      "Return the vehicle on time at our pickup point. To extend, message us before your return time; extensions depend on availability.",
      "Late returns without prior approval may be charged.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Rental terms" }]}
        title="Rental terms"
        intro="The short version: carry your licence and ID, return on time with the same fuel, and ride safe. The details are below."
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <nav aria-label="Sections" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 flex flex-col gap-3 text-gravel">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#t${i}`} className="link-draw">
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex max-w-[68ch] flex-col gap-12 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.h} id={`t${i}`} aria-labelledby={`t${i}-h`} className="scroll-mt-28 border-t border-ink pt-6">
                <h2 id={`t${i}-h`} className="t-h3">
                  {i + 1}. {s.h}
                </h2>
                <div className="mt-4 flex flex-col gap-3 text-gravel">
                  {s.p.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="border-t border-line pt-8 text-gravel">
              Questions about these terms? Call{" "}
              <a href={telHref} className="link-line font-medium text-ink">
                {business.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
