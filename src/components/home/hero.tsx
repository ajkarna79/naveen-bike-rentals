import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { OpenBadge } from "../open-status";
import { Arrow, ButtonLink, PricePlate, Stars, WhatsAppIcon } from "../ui";
import { business, whatsappHref } from "@/lib/site";
import { getBike, inr, minPrice } from "@/lib/fleet";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The hero says what is rented, where, and for how much, then shows the bike
 * people ask for most standing on the page itself. One entrance on load: the
 * words rise, the Classic rolls in, its plate drops into place.
 */
export function Hero() {
  const classic = getBike("royal-enfield-classic-350")!;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-[104px] lg:pb-20"
    >
      <div className="wrap container-x grid gap-y-6 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-0">
        <div className="lg:col-span-6 lg:self-end">
          <p className="enter" style={step(0)}>
            <OpenBadge />
          </p>
          <h1 id="hero-title" className="t-h1 enter mt-5 max-w-[13ch]" style={step(1)}>
            Bike and scooty rental in Hanamkonda, Warangal
          </h1>
        </div>
        <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2">
          <p className="t-lead enter max-w-[34ch] text-gravel lg:mt-6" style={step(2)}>
            Scooties from {inr(minPrice)} a day with 125 km free, Royal Enfields from {inr(classic.pricePerDay)}. Pick
            yours up in Kishanpura from 6 in the morning.
          </p>
          <div className="enter mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-9" style={step(3)}>
            <ButtonLink href={whatsappHref(`Hi ${business.name}! I'd like to rent a bike.`)} external className="min-h-14 px-7">
              <WhatsAppIcon /> Book on WhatsApp
            </ButtonLink>
            <Link href="/bikes" className="group inline-flex min-h-11 items-center gap-2 font-medium">
              <span className="link-line">See all 14 bikes</span>
              <Arrow />
            </Link>
          </div>
          <a
            href={business.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="enter mt-8 inline-flex items-center gap-3 text-gravel transition-colors hover:text-ink lg:mt-10"
            style={step(4)}
          >
            <Stars value={business.rating.value} className="text-ink" />
            <span>
              <span className="font-medium text-ink">{business.rating.value}</span> on Google from {business.rating.count} reviews
            </span>
          </a>
        </div>

        <Link
          href={`/bikes/${classic.slug}`}
          className="group relative block lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center"
          aria-label={`Royal Enfield Classic 350, ${inr(classic.pricePerDay)} a day, see the bike`}
        >
          <div className="enter-roll relative aspect-[16/10] w-full lg:aspect-[4/3]">
            <div className="absolute inset-x-[14%] bottom-[11%] h-[5%] rounded-[50%] bg-ink/25 blur-xl" aria-hidden="true" />
            <Image
              src={classic.image!}
              alt=""
              fill
              preload
              sizes="(max-width: 1024px) 92vw, 620px"
              className="object-contain mix-blend-multiply transition-transform duration-[600ms] ease-out-quart group-hover:scale-[1.02]"
            />
          </div>
          <div className="enter-plate mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 lg:pl-[6%]">
            <PricePlate amount={inr(classic.pricePerDay)} className="text-[clamp(1.6rem,3vw,2.4rem)]" />
            <span className="text-gravel">
              Classic 350, {classic.kmPerDay} km a day included
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
