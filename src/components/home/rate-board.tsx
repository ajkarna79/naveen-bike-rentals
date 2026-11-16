"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Arrow, PricePlate } from "../ui";
import { BikeStage } from "../bike-visual";
import { bikes, bikeLabel, categories, getBike, inr } from "@/lib/fleet";
import { business, whatsappHref } from "@/lib/site";

/**
 * The rate board: every bike as a ruled row (name, free km, price) in four
 * groups, so all fourteen can be compared at a glance. On a wide screen the
 * row under the pointer or keyboard focus shows its bike in the panel beside.
 */
export function RateBoard() {
  const [active, setActive] = useState("royal-enfield-classic-350");
  const bike = getBike(active)!;
  const reduce = useReducedMotion();

  return (
    <div className="mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-6">
        {categories.map((c) => (
          <div key={c.id}>
            <p className="t-label" id={`rb-${c.id}`}>
              {c.label}
            </p>
            <ul className="mt-3 border-t border-ink" aria-labelledby={`rb-${c.id}`}>
              {bikes
                .filter((b) => b.category === c.id)
                .map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/bikes/${b.slug}`}
                      onMouseEnter={() => setActive(b.slug)}
                      onFocus={() => setActive(b.slug)}
                      aria-label={`${bikeLabel(b)}, ${inr(b.pricePerDay)} a day, ${b.kmPerDay} km included`}
                      className={clsx(
                        "group grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 border-b border-line py-2 transition-colors lg:grid-cols-[minmax(0,1fr)_auto_auto]",
                        active === b.slug ? "lg:bg-kerb" : "hover:bg-kerb/60",
                      )}
                    >
                      {/* phones and tablets: a small picture in the row */}
                      <span className="relative h-11 w-16 shrink-0 bg-kerb lg:hidden" aria-hidden="true">
                        {b.image && (
                          <Image src={b.image} alt="" fill sizes="64px" className="object-contain p-1 mix-blend-multiply" />
                        )}
                      </span>
                      <span className="min-w-0 lg:pl-2">
                        <span className="block truncate font-medium">{b.name}</span>
                        <span className="block text-[0.9rem] text-gravel lg:hidden">{b.kmPerDay} km a day</span>
                      </span>
                      <span className="hidden text-gravel tabular-nums lg:block">{b.kmPerDay} km</span>
                      <span className="pr-1 text-right font-medium tabular-nums lg:pr-2">{inr(b.pricePerDay)}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* wide screens: the bike in hand, big, with its plate and two actions */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[96px]">
          <div className="relative aspect-[4/3] overflow-hidden bg-kerb">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={bike.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <BikeStage bike={bike} className="h-full w-full" sizes="480px" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="t-h3" aria-live="polite">
                {bikeLabel(bike)}
              </p>
              <p className="mt-1 max-w-[36ch] text-gravel">{bike.highlight}</p>
            </div>
            <PricePlate amount={inr(bike.pricePerDay)} className="shrink-0 text-[1.5rem]" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={whatsappHref(
                `Hi ${business.name}! Is the ${bikeLabel(bike)} (${inr(bike.pricePerDay)}/day) available? I'd like to book it.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-[4px] px-6 font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[transform,background-color,color] duration-200 hover:-translate-y-px hover:bg-ink hover:text-ground active:translate-y-px"
            >
              Book this bike
            </a>
            <Link href={`/bikes/${bike.slug}`} className="group inline-flex items-center gap-2 font-medium">
              <span className="link-line">Engine, plans and details</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
