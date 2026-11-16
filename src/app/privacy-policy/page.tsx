import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { business, fullAddress, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Naveen Bike Rentals website and bookings handle your information: what the site collects, what happens on WhatsApp, Google Maps, and your choices.",
  alternates: { canonical: "/privacy-policy" },
};

/**
 * Written from what this website actually does today (Nov 2026): no accounts,
 * no analytics, no cookies of its own, a booking form that only opens WhatsApp,
 * and a Google Maps embed on some pages. If you add analytics, a contact form or
 * online payment, update this page in the same change.
 * OWNER: review the "At the counter" section so it matches what you keep.
 */
const UPDATED = "16 November 2026";

const sections: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `${business.name} rents self-drive bikes and scooties from ${fullAddress}. In this policy, "we" means ${business.name}. You can reach us on ${business.phoneDisplay} (call or WhatsApp).`,
    ],
  },
  {
    h: "What this website collects",
    p: [
      "The website does not have accounts, does not ask you to sign up and does not run advertising or analytics trackers. It sets no cookies of its own.",
      "The booking form and the rent calculator work entirely in your browser. When you press the WhatsApp button, the form writes a message (the bike, dates, time and the name you chose to type) and opens WhatsApp with it. Nothing is sent to us until you send that message yourself.",
      "Like every website, our host (Netlify) keeps short-lived technical logs, such as IP addresses and the pages requested, to run and protect the site.",
    ],
  },
  {
    h: "WhatsApp and phone calls",
    p: [
      "When you message or call us, we see your phone number, your name as it appears on WhatsApp and what you write. We use this only to answer you, arrange your rental and contact you about it.",
      "WhatsApp is run by Meta and its own privacy policy applies to the app.",
    ],
  },
  {
    h: "Google Maps",
    p: [
      "The visit and contact sections show a Google Maps map, and the directions links open Google Maps. Google may set its own cookies and receive your IP address when the map loads. Google's privacy policy applies to that.",
    ],
  },
  {
    h: "At the counter",
    p: [
      "Before you ride we check your original driving licence and Aadhaar or other government photo ID, as required for a self-drive rental. If we need to keep a copy or a note of these for the rental, we tell you at pickup, and we keep it only as long as needed for the rental, any traffic fine that arrives later, or the law.",
      "We do not sell your information or share it for marketing. We share it only when the law requires it, for example with the police or the transport department about a traffic matter during your rental.",
    ],
  },
  {
    h: "Your choices",
    p: [
      `You can ask us what information we have about you, ask us to correct it, or ask us to delete it when we no longer need it for the rental or the law. Call or WhatsApp ${business.phoneDisplay}.`,
    ],
  },
  {
    h: "Changes",
    p: [`If we change how we handle information, we update this page and the date at the top. Last updated ${UPDATED}.`],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy-policy" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]}
        title="Privacy policy"
        intro={`The short version: the website collects nothing about you, and what you send us on WhatsApp is used only for your rental. Last updated ${UPDATED}.`}
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex max-w-[68ch] flex-col gap-12 lg:col-span-8">
            {sections.map((s, i) => (
              <section key={s.h} aria-labelledby={`p${i}`} className="border-t border-ink pt-6">
                <h2 id={`p${i}`} className="t-h3">
                  {s.h}
                </h2>
                <div className="mt-4 flex flex-col gap-3 text-gravel">
                  {s.p.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="border-t border-line pt-8 text-gravel">
              Questions about your information? Call{" "}
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
