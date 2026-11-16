"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { bikes as allBikes, categories, type CategoryId } from "@/lib/fleet";
import { BikeCard } from "./bike-card";

type Filter = "all" | CategoryId;
type Sort = "price-asc" | "price-desc" | "km-desc";

export function FleetExplorer({ limit, showSort = true }: { limit?: number; showSort?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("price-asc");

  const list = useMemo(() => {
    const filtered = allBikes.filter((b) => filter === "all" || b.category === filter);
    const sorted = [...filtered].sort((a, b) =>
      sort === "price-asc"
        ? a.pricePerDay - b.pricePerDay
        : sort === "price-desc"
          ? b.pricePerDay - a.pricePerDay
          : b.kmPerDay - a.kmPerDay || a.pricePerDay - b.pricePerDay,
    );
    return limit ? sorted.slice(0, limit) : sorted;
  }, [filter, sort, limit]);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All bikes", count: allBikes.length },
    ...categories.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: allBikes.filter((b) => b.category === c.id).length,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink pb-4 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Show bikes by type" className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {filters.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.id)}
                className={clsx(
                  "flex min-h-11 shrink-0 items-center gap-2 rounded-[4px] px-4 transition-colors",
                  active ? "bg-ink text-ground" : "hover:bg-kerb",
                )}
              >
                {t.label}
                <span className={clsx("tabular-nums", active ? "text-ground/70" : "text-gravel")}>{t.count}</span>
              </button>
            );
          })}
        </div>

        {showSort && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <label htmlFor="fleet-sort" className="t-label text-gravel">
              Sort
            </label>
            <div className="relative">
              <select
                id="fleet-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="min-h-11 appearance-none rounded-[4px] border border-ink/25 bg-ground pl-4 pr-10 hover:border-ink/50 focus:border-ink"
              >
                <option value="price-asc">Lowest price first</option>
                <option value="price-desc">Highest price first</option>
                <option value="km-desc">Most km included</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {filter !== "all" && <p className="mt-5 max-w-xl text-gravel">{categories.find((c) => c.id === filter)?.blurb}</p>}

      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((bike) => (
          <li key={bike.slug}>
            <BikeCard bike={bike} className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
