import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { VisitSection, FinalCta } from "@/components/home/sections";
import { ButtonLink, WhatsAppIcon } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { business, fullAddress, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Location: Kishanpura, Hanamkonda",
  description: `Call or WhatsApp ${business.phoneDisplay} to rent a bike. Pickup at ${fullAddress}. Open every day, 6 AM to 11:30 PM.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Message, call or come by"
        intro="WhatsApp is the quickest way to book: send the bike and the date. For anything else, call."
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
      <VisitSection />
      <FinalCta />
    </>
  );
}
