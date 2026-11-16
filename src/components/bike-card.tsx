import Link from "next/link";
import clsx from "clsx";
import { BikeStage } from "./bike-visual";
import { PricePlate } from "./ui";
import { bikeLabel, inr, type Bike } from "@/lib/fleet";
import { whatsappHref, business } from "@/lib/site";

/**
 * A goods card: the bike on its stage, then only the name, the plate price,
 * the kilometres and one outline Book button. The whole card links to the bike.
 */
export function BikeCard({ bike, className }: { bike: Bike; className?: string }) {
  const href = `/bikes/${bike.slug}`;
  const gearless = bike.transmission.startsWith("Automatic");
  return (
    <article
      className={clsx(
        "group relative flex flex-col transition-transform duration-300 ease-out-quart hover:-translate-y-0.5",
        className,
      )}
    >
      <BikeStage bike={bike} className="aspect-[4/3]">
        {bike.badge && (
          <span className="absolute left-3 top-3 bg-ground px-2.5 py-1 text-[0.8125rem] font-medium">{bike.badge}</span>
        )}
      </BikeStage>

      <div className="flex flex-1 flex-col border-b border-line pb-5 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.015em]">
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {bikeLabel(bike)}
            </Link>
          </h3>
          <PricePlate amount={inr(bike.pricePerDay)} className="shrink-0 text-[1.05rem]" />
        </div>
        <p className="mt-1.5 text-gravel">
          {bike.kmPerDay} km a day included, {gearless ? "gearless" : "geared"}, {bike.engine}
        </p>
        <a
          href={whatsappHref(
            `Hi ${business.name}! Is the ${bikeLabel(bike)} (${inr(bike.pricePerDay)}/day) available? I'd like to book it.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-4 inline-flex min-h-11 w-fit items-center rounded-[4px] px-4 font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[transform,background-color,color] duration-200 hover:-translate-y-px hover:bg-ink hover:text-ground active:translate-y-px"
        >
          Book this bike
        </a>
      </div>
    </article>
  );
}
