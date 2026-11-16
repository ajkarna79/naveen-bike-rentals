import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PolicyFooter, PolicySection, RuleTable } from "@/components/policy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { POLICY_DATE, deductions } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Deposit and Refund Policy",
  description:
    "How the security deposit at Naveen Bike Rentals is refunded: the return check, what can and cannot be deducted, cash or UPI refunds, and how to raise a dispute.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Deposit and refund policy", path: "/refund-policy" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Deposit and refund policy" }]}
        title="Deposit and refund policy"
        intro={`Every deduction is explained to you, item by item, before it is taken. No surprise charges. In effect from ${POLICY_DATE}.`}
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <div className="flex max-w-[72ch] flex-col gap-12">
            <PolicySection id="r-deposit" title="1. The security deposit">
              <p>
                A refundable security deposit is taken when you collect the bike, separate from the rent. The amount depends
                on the bike and how long you rent it, and we tell you on WhatsApp before you confirm.
              </p>
            </PolicySection>

            <PolicySection id="r-pickup" title="2. At pickup: note any marks first">
              <p>
                Before you ride, we look over the bike with you and note any scratches, dents or damage that are already there.
                Check it yourself too, and point out anything we missed before you leave. Anything noted at pickup is never
                charged to you.
              </p>
            </PolicySection>

            <PolicySection id="r-return" title="3. At return: how the refund works">
              <ol className="flex flex-col gap-3">
                <li>
                  <strong>Return the bike</strong>, the helmet and the keys to the counter by your return time.
                </li>
                <li>
                  <strong>We check the bike</strong> with you: body, accessories, kilometres and fuel. It takes about 5 to 10
                  minutes, and you are welcome to stay.
                </li>
                <li>
                  <strong>We explain any deduction</strong> on the spot, item by item, before applying it. You can question
                  anything at this point.
                </li>
                <li>
                  <strong>You get the rest of the deposit back</strong>, in cash or by UPI, once any charges are settled.
                </li>
              </ol>
            </PolicySection>

            <PolicySection id="r-deductions" title="4. What can and cannot be deducted">
              <RuleTable
                caption="Deposit deductions"
                head={["Item", "Deducted?", "How much"]}
                rows={deductions.map((d) => [d.item, d.charged ? "Yes" : "No", d.basis])}
              />
              <p>
                Late-return penalties are listed in the{" "}
                <Link href="/rental-guide#late-return" className="link-line text-ink">
                  rental guide
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection id="r-cancel" title="5. Refunds when you cancel">
              <p>
                If you paid an advance to hold a bike, it is refunded in full when you cancel 24 hours or more before pickup,
                and in full if we cancel. See the{" "}
                <Link href="/cancellation-policy" className="link-line text-ink">
                  cancellation policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection id="r-dispute" title="6. If you disagree with a deduction">
              <p>
                Tell us straight away, at the counter or on WhatsApp. We go through the pickup notes and the return check with
                you, and if we got it wrong, we put it right.
              </p>
            </PolicySection>

            <PolicyFooter current="refund" />
          </div>
        </div>
      </section>
    </>
  );
}
