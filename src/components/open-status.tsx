"use client";

import clsx from "clsx";
import { fmt12, getOpenStatus } from "@/lib/hours";
import { useMinute } from "@/lib/use-clock";

/** Live open/closed line in IST. Time-dependent, so it renders on the client. */
export function OpenBadge({ className }: { className?: string }) {
  const now = useMinute();
  const status = now ? getOpenStatus(now) : null;

  return (
    <span
      className={clsx("inline-flex items-center gap-2 font-medium", status?.open ? "text-open" : "text-gravel", className)}
      aria-live="polite"
    >
      <span className={clsx("size-2 rounded-full", status?.open ? "bg-open" : "bg-gravel")} aria-hidden="true" />
      {status ? status.label : "Open every day from 6 AM"}
    </span>
  );
}

/** The week's hours, Monday first, today in bold. */
export function HoursList({
  hours,
  className,
}: {
  hours: readonly { day: number; label: string; open: string; close: string }[];
  className?: string;
}) {
  const now = useMinute();
  const today = now ? getOpenStatus(now).today : null;
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <dl className={clsx("border-t border-line", className)}>
      {order.map((d) => {
        const h = hours.find((x) => x.day === d)!;
        const isToday = today === d;
        return (
          <div
            key={d}
            className={clsx(
              "flex min-h-11 items-center justify-between gap-4 border-b border-line",
              isToday ? "font-medium text-ink" : "text-gravel",
            )}
          >
            <dt>
              {h.label}
              {isToday && <span className="sr-only"> (today)</span>}
            </dt>
            <dd className="text-right tabular-nums sm:whitespace-nowrap">
              {fmt12(h.open)} to {fmt12(h.close)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
