import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PolicyFooter } from "@/components/policy";
import { business } from "@/lib/site";

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
      "Most bookings need no advance. Where we ask for an advance to hold a bike, it is refunded in full if you cancel 24 hours or more before pickup, and not refunded if you cancel later or do not turn up. The cancellation policy has the details.",
      "Prices shown are per 24-hour day. Long-term (weekly or monthly) rates are quoted separately.",
    ],
  },
  {
    h: "Security deposit",
    p: [
      "A refundable security deposit is collected at pickup. The amount depends on the vehicle and rental duration and is told to you before you come.",
      "The deposit is refunded in cash or by UPI after the vehicle, helmet(s) and keys are checked with you. Any deduction (damage at repair cost, lost items at replacement cost, missing fuel, late-return charges, extra kilometres, traffic fines, or a cleaning charge for a very dirty bike) is explained item by item first. Normal wear and damage noted at pickup are never charged. The deposit and refund policy has the details.",
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
      "The first hour after the return time is free. After that, a late return without an approved extension is charged normal rent for the extra time plus one penalty: ₹100 for over 1 to 3 hours, ₹200 for over 3 to 6 hours, ₹300 for over 6 to 24 hours, and ₹500 for each day beyond 24 hours. Approved extensions are charged normal rent only. Ending a rental early does not refund the unused days unless the cause is ours (for example a breakdown we cannot fix within 4 hours).",
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
            <PolicyFooter current="terms" />
          </div>
        </div>
      </section>
    </>
  );
}
