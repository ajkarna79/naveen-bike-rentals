import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PolicyFooter, PolicySection, RuleTable } from "@/components/policy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { POLICY_DATE, cancellation } from "@/lib/policies";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancel a bike booking with Naveen Bike Rentals by call or WhatsApp. Full refund of any advance 24 hours or more before pickup; ending early, extensions and when we cancel.",
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cancellation policy", path: "/cancellation-policy" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Cancellation policy" }]}
        title="Cancellation policy"
        intro={`Plans change. Here is what happens when you cancel, end a rental early or need it longer. In effect from ${POLICY_DATE}.`}
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <div className="flex max-w-[72ch] flex-col gap-12">
            <PolicySection id="c-advance" title="1. Most bookings need no advance">
              <p>
                You usually book by WhatsApp and pay the rent and deposit at the counter when you collect the bike, so there
                is nothing to refund if you cancel. Please still tell us as early as you can, so the bike can go to someone
                else.
              </p>
              <p>
                For some bookings, such as a weekend, a holiday or a Royal Enfield, we may ask for an advance to hold the bike.
                The advance is part of your rent, not extra. The table below applies to it.
              </p>
            </PolicySection>

            <PolicySection id="c-table" title="2. Refund of an advance">
              <p>Times are counted from the pickup time we confirmed with you.</p>
              <RuleTable caption="Refund of an advance by cancellation time" head={["When you cancel", "What happens to the advance"]} rows={cancellation.map((c) => [c.when, c.refund])} />
            </PolicySection>

            <PolicySection id="c-how" title="3. How to cancel">
              <p>
                Call or WhatsApp <strong>{business.phoneDisplay}</strong> with your name, the booking date and the bike. We
                reply to confirm the cancellation. Until you have that reply, please treat the booking as still on.
              </p>
            </PolicySection>

            <PolicySection id="c-ours" title="4. If we have to cancel">
              <p>
                Rarely, we may have to cancel a confirmed booking: the bike has a fault or damage we cannot fix in time, the
                weather or roads make the ride unsafe, or something outside our control stops us, such as a natural disaster
                or a government restriction.
              </p>
              <p>
                We tell you as early as we can and offer another bike if one is free. If you do not want it, any advance is
                refunded in full.
              </p>
            </PolicySection>

            <PolicySection id="c-early" title="5. Ending a rental early">
              <p>
                Message us and bring the bike back to the counter. Rent is charged for all the days you booked; days you do not
                use are not refunded, unless the problem is ours, for example a breakdown we cannot sort out within 4 hours.
                Your deposit is refunded as usual after the bike is checked.
              </p>
            </PolicySection>

            <PolicySection id="c-extend" title="6. Extending a rental">
              <p>
                Message us before your return time. If the bike is free, we approve the extension and you pay the normal rent
                for the extra time, with no late penalty. Keeping the bike past the return time without approval means normal
                rent plus a late-return penalty; see the{" "}
                <Link href="/rental-guide#late-return" className="link-line text-ink">
                  late-return charges
                </Link>
                .
              </p>
            </PolicySection>

            <PolicyFooter current="cancellation" />
          </div>
        </div>
      </section>
    </>
  );
}
