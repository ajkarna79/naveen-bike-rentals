import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FaqList, FinalCta } from "@/components/home/sections";
import { ButtonLink, WhatsAppIcon } from "@/components/ui";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { business, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bike Rental Questions: Documents, Deposit, Fuel and Kilometres",
  description:
    "Renting a bike or scooter in Hanamkonda: the documents you need, the security deposit, fuel, free kilometres, helmets, outstation trips and timings.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
        title="Questions before you ride"
        intro="Documents, deposit, fuel and kilometres. If yours is not here, ask on WhatsApp and we reply during opening hours."
      >
        <div className="mt-9">
          <ButtonLink href={whatsappHref(`Hi ${business.name}, I have a question.`)} variant="secondary" external>
            <WhatsAppIcon className="size-[18px]" /> Ask on WhatsApp
          </ButtonLink>
        </div>
      </PageHero>
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x max-w-4xl">
          <FaqList />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
