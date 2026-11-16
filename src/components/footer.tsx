import Link from "next/link";
import { business, fullAddress, telHref, whatsappHref } from "@/lib/site";
import { bikes, bikeLabel } from "@/lib/fleet";
import { landings } from "@/lib/landings";

export function Footer() {
  const popular = bikes.filter((b) =>
    ["honda-activa-6g", "bajaj-pulsar-150", "royal-enfield-classic-350", "royal-enfield-hunter-350", "yamaha-fz", "honda-dio"].includes(
      b.slug,
    ),
  );
  return (
    <footer className="closing bg-kerb pb-28 pt-16 lg:pb-10 lg:pt-20">
      <div className="wrap container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <FooterCol title="Visit">
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line w-fit py-2 text-[1.25rem] leading-snug">
            {fullAddress}
          </a>
          <p className="mt-2 text-gravel">{business.address.landmark}</p>
          <p className="mt-3 text-gravel">
            Every day from 6 AM to 11:30 PM.
            <br />
            Friday until 10:30 PM, Saturday from 7 AM.
          </p>
        </FooterCol>

        <FooterCol title="Contact">
          <a href={telHref} className="link-draw inline-flex min-h-11 w-fit items-center tabular-nums">
            {business.phoneDisplay}
          </a>
          <a
            href={whatsappHref(`Hi ${business.name}!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw inline-flex min-h-11 w-fit items-center"
          >
            WhatsApp
          </a>
          <a href={business.reviewsUrl} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 w-fit items-center">
            Google reviews
          </a>
        </FooterCol>

        <FooterCol title="Bikes">
          {popular.map((b) => (
            <FooterLink key={b.slug} href={`/bikes/${b.slug}`}>
              {bikeLabel(b)}
            </FooterLink>
          ))}
          <FooterLink href="/bikes">All 14 bikes</FooterLink>
        </FooterCol>

        <FooterCol title="Rent in">
          {landings.map((l) => (
            <FooterLink key={l.slug} href={`/${l.slug}`}>
              {l.short === "Royal Enfield" || l.short === "Scooty" ? `${l.short} rental` : l.short}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Pages">
          <FooterLink href="/pricing">Prices and calculator</FooterLink>
          <FooterLink href="/how-to-book">How to book</FooterLink>
          <FooterLink href="/rides">Rides from Hanamkonda</FooterLink>
          <FooterLink href="/blog">Guides</FooterLink>
          <FooterLink href="/about">About us</FooterLink>
          <FooterLink href="/faq">Questions</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/terms">Rental terms</FooterLink>
          <FooterLink href="/privacy-policy">Privacy policy</FooterLink>
        </FooterCol>
      </div>

      <div className="wrap container-x mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[0.9rem] text-gravel sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © 2026 {business.name}, Hanamkonda. Ride with a helmet.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          <li><Link href="/rental-guide" className="link-draw inline-flex min-h-11 items-center">Rental guide</Link></li>
          <li><Link href="/cancellation-policy" className="link-draw inline-flex min-h-11 items-center">Cancellation</Link></li>
          <li><Link href="/refund-policy" className="link-draw inline-flex min-h-11 items-center">Deposit and refunds</Link></li>
        </ul>
        <p>
          Place photographs from Wikimedia Commons contributors,{" "}
          <Link href="/credits" className="link-line">
            see credits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <p className="t-label mb-1 text-gravel">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-draw inline-flex min-h-11 w-fit items-center">
      {children}
    </Link>
  );
}
