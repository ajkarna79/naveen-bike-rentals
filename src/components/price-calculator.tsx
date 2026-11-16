"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { bikes, bikeLabel, categories, inr, type CategoryId } from "@/lib/fleet";
import { business, whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui";

const PRESETS = [1, 2, 3, 7, 15, 30];

export function PriceCalculator() {
  const id = useId();
  const [days, setDays] = useState(2);
  const [cat, setCat] = useState<"all" | CategoryId>("all");

  const rows = useMemo(
    () =>
      bikes
        .filter((b) => cat === "all" || b.category === cat)
        .map((b) => ({ b, total: b.pricePerDay * days, km: b.kmPerDay * days }))
        .sort((a, b) => a.total - b.total),
    [days, cat],
  );

  const pct = ((days - 1) / 29) * 100;
  return (
    <div>
      <div className="grid gap-8 bg-kerb p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <label htmlFor={`${id}-days`} className="flex items-baseline justify-between gap-4">
            <span className="t-label">How many days</span>
            <span className="plate text-[2rem]">
              {days} {days > 1 ? "days" : "day"}
            </span>
          </label>
          <input
            id={`${id}-days`}
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-6 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-ground [&::-webkit-slider-thumb]:bg-ink [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-ground [&::-moz-range-thumb]:bg-ink"
            style={{ background: `linear-gradient(to right, var(--color-ink) ${pct}%, rgb(28 29 31 / 0.18) ${pct}%)` }}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDays(p)}
                aria-pressed={days === p}
                className={clsx(
                  "min-h-11 rounded-[4px] px-4 tabular-nums transition-colors",
                  days === p ? "bg-ink text-ground" : "bg-ground hover:bg-white",
                )}
              >
                {p === 7 ? "1 week" : p === 15 ? "15 days" : p === 30 ? "1 month" : `${p} day${p > 1 ? "s" : ""}`}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Bike type">
          {[{ id: "all" as const, label: "All" }, ...categories.map((c) => ({ id: c.id, label: c.short }))].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={clsx(
                "min-h-11 rounded-[4px] px-4 transition-colors",
                cat === c.id ? "bg-ink text-ground" : "bg-ground hover:bg-white",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <caption className="sr-only">Rental cost for {days} days</caption>
          <thead className="border-b border-ink">
            <tr className="t-label text-gravel">
              <th scope="col" className="py-3 pr-4 font-medium">Bike</th>
              <th scope="col" className="py-3 pr-4 font-medium">A day</th>
              <th scope="col" className="py-3 pr-4 font-medium">Km included</th>
              <th scope="col" className="py-3 pr-4 text-right font-medium">For {days} {days > 1 ? "days" : "day"}</th>
              <th scope="col" className="py-3"><span className="sr-only">Book</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ b, total, km }) => (
              <tr key={b.slug} className="border-b border-line transition-colors hover:bg-kerb/60">
                <th scope="row" className="py-3 pr-4 font-medium">
                  <Link href={`/bikes/${b.slug}`} className="link-draw">
                    {bikeLabel(b)}
                  </Link>
                </th>
                <td className="py-3 pr-4 tabular-nums text-gravel">{inr(b.pricePerDay)}</td>
                <td className="py-3 pr-4 tabular-nums text-gravel">{km.toLocaleString("en-IN")} km</td>
                <td className="py-3 pr-4 text-right text-[1.125rem] font-medium tabular-nums">{inr(total)}</td>
                <td className="py-2 text-right">
                  <a
                    href={whatsappHref(
                      `Hi ${business.name}! I'd like the ${bikeLabel(b)} for ${days} day${days > 1 ? "s" : ""} (estimate ${inr(total)}, ${km} km included). Is it available?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book the ${bikeLabel(b)} for ${days} ${days > 1 ? "days" : "day"} on WhatsApp`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-[4px] px-4 font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[transform,background-color,color] duration-200 hover:-translate-y-px hover:bg-ink hover:text-ground active:translate-y-px"
                  >
                    <WhatsAppIcon className="size-[18px]" /> Book
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 max-w-[70ch] text-gravel">
        The total is the daily rate times the days. For a week or longer, ask for a long-term rate: it is usually lower.
        Fuel is extra and a refundable deposit is taken at pickup.
      </p>
    </div>
  );
}
