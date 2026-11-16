import { Hero } from "@/components/home/hero";
import { RateBoard } from "@/components/home/rate-board";
import { RideChapters } from "@/components/home/ride-chapters";
import { BookSection, FinalCta, Reviews, VisitSection } from "@/components/home/sections";
import { SectionHead } from "@/components/ui";

/*
  taste-skill deal (place, bike rental): palette from the client's own colours
  (stone #eeeeeb, kerb #e1e1dd, tarmac #1c1d1f, plate yellow #ffc531 only on
  plates); type Work Sans, Barlow Condensed on plates; nav-cards as a plain
  bar, footer-columns, surface-pairs rhythm, arrow on text links only;
  moment photo-chapters (rides); type moment "name" on the close plate.
*/
export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="bikes" aria-labelledby="bikes-title" className="section-y bg-ground">
        <div className="wrap container-x">
          <SectionHead
            id="bikes-title"
            title="Fourteen bikes, one price a day"
            side="Each price covers 24 hours and the kilometres shown. Fuel is extra; helmets are there at pickup."
            link={{ href: "/bikes", label: "Compare every bike" }}
          />
          <RateBoard />
        </div>
      </section>

      <BookSection />
      <RideChapters />
      <Reviews />
      <VisitSection />
      <FinalCta />
    </>
  );
}
