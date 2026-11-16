import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { rides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits and licences for the photographs used on the Naveen Bike Rentals website.",
  alternates: { canonical: "/credits" },
  robots: { index: false },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Credits" }]}
        title="Photo credits"
        intro="The photographs of places around Warangal come from Wikimedia Commons and are used under their Creative Commons licences."
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x max-w-4xl">
          <ul className="border-t border-ink">
            {rides.map((r) => (
              <li key={r.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <span className="font-medium">{r.name}</span>
                <span className="text-gravel">
                  Photo by{" "}
                  <a href={r.credit.page} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                    {r.credit.by}
                  </a>
                  , {r.credit.licence}. Cropped.
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[64ch] text-gravel">
            Bike pictures are the manufacturers&apos; own product photographs of each model, shown to identify the model you
            rent.
          </p>
        </div>
      </section>
    </>
  );
}
