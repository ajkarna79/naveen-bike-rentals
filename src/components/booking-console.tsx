"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { bikes, bikeLabel, categories, inr } from "@/lib/fleet";
import { buildBookingMessage, estimate, openWhatsApp, returnDate } from "@/lib/booking";
import { useMinute, useToday } from "@/lib/use-clock";
import { WhatsAppIcon } from "./ui";

function addDays(iso: string, n: number) {
  if (!iso) return iso;
  const d = new Date(`${iso}T12:00`);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const TIMES = Array.from({ length: 35 }, (_, i) => {
  const mins = 6 * 60 + i * 30; // 06:00 → 23:00
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const label = `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  return { value, label };
});

export function BookingConsole({
  initialSlug = "honda-activa-6g",
  lockBike = false,
  className,
  title = "Work out the rent",
  tone = "kerb",
  headingLevel = 2,
}: {
  initialSlug?: string;
  lockBike?: boolean;
  className?: string;
  title?: string;
  tone?: "kerb" | "ground";
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const id = useId();
  const [slug, setSlug] = useState(initialSlug);
  const min = useToday();
  const now = useMinute();
  const [picked, setDate] = useState("");
  // Until the visitor picks a date, default to today — or tomorrow if it's late evening.
  const fallback = now && now.getHours() >= 20 ? addDays(min, 1) : min;
  const date = picked && picked >= min ? picked : fallback;
  const [time, setTime] = useState("09:00");
  const [days, setDays] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const bike = bikes.find((b) => b.slug === slug) ?? bikes[0];
  const est = useMemo(() => estimate(bike, days), [bike, days]);
  const ret = date ? returnDate(date, time, days) : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || date < min) {
      setError("Choose today or a later date.");
      return;
    }
    setError("");
    openWhatsApp(buildBookingMessage({ bike, date, time, days, name }));
  }

  const field =
    "min-h-12 w-full rounded-[4px] border border-ink/25 bg-ground px-4 text-[1rem] text-ink transition-colors hover:border-ink/50 focus:border-ink disabled:opacity-90";
  const label = "t-label mb-2 block";

  return (
    <form
      onSubmit={submit}
      noValidate
      className={clsx(
        "relative p-6 sm:p-8",
        tone === "kerb" ? "bg-kerb" : "bg-ground shadow-[inset_0_0_0_1px_var(--color-line)]",
        className,
      )}
      aria-labelledby={`${id}-title`}
    >
      <Heading id={`${id}-title`} className="t-h3">
        {title}
      </Heading>
      <p className="mt-1 text-gravel">The total updates as you choose. Nothing is paid here.</p>

      <div className="mt-6">
        <label htmlFor={`${id}-bike`} className={label}>
          Bike
        </label>
        <div className="relative">
          <select
            id={`${id}-bike`}
            value={slug}
            disabled={lockBike}
            onChange={(e) => setSlug(e.target.value)}
            className={clsx(field, "appearance-none pr-10 font-medium")}
          >
            {categories.map((c) => (
              <optgroup key={c.id} label={c.label}>
                {bikes
                  .filter((b) => b.category === c.id)
                  .map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {bikeLabel(b)}, {inr(b.pricePerDay)} a day
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {!lockBike && (
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${id}-date`} className={label}>
            Pickup date
          </label>
          <input
            id={`${id}-date`}
            type="date"
            required
            min={min}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-err` : undefined}
            className={clsx(field, "[color-scheme:light]", error && "border-[#b3261e]")}
          />
          {error && (
            <p id={`${id}-err`} role="alert" className="mt-2 text-[0.9rem] text-[#b3261e]">
              {error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-time`} className={label}>
            Pickup time
          </label>
          <div className="relative">
            <select
              id={`${id}-time`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={clsx(field, "appearance-none pr-9")}
            >
              {TIMES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <span className={label} id={`${id}-days`}>
            Days
          </span>
          <div
            className="flex min-h-12 items-center justify-between rounded-[4px] border border-ink/25 bg-ground p-1"
            role="group"
            aria-labelledby={`${id}-days`}
          >
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(1, d - 1))}
              aria-label="One day less"
              className="grid size-10 place-items-center rounded-[3px] transition-colors hover:bg-kerb disabled:opacity-30"
              disabled={days <= 1}
            >
              <Minus className="size-4" />
            </button>
            <output className="text-[1.1rem] font-medium tabular-nums" aria-live="polite">
              {days}
            </output>
            <button
              type="button"
              onClick={() => setDays((d) => Math.min(30, d + 1))}
              aria-label="One day more"
              className="grid size-10 place-items-center rounded-[3px] transition-colors hover:bg-kerb"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Your name <span className="font-normal text-gravel">(optional)</span>
          </label>
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={60}
            className={field}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-line pt-5">
        <div>
          <p className="t-label text-gravel">
            Rent for {days} {days === 1 ? "day" : "days"}
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={est.rent}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="plate mt-2 text-[1.9rem]"
            >
              {inr(est.rent)}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="text-right text-gravel">
          <p className="font-medium text-ink">{est.km} km included</p>
          <p>
            {ret
              ? `Back by ${new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).format(ret)}`
              : "\u00a0"}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[0.9rem] text-gravel">
        Fuel is extra and a refundable deposit is taken at pickup. Ask for a weekly or monthly rate.
      </p>

      <button
        type="submit"
        className="mt-5 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-[4px] bg-ink text-[1.05rem] font-medium text-ground transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-black active:translate-y-px"
      >
        <WhatsAppIcon />
        Send the booking on WhatsApp
      </button>
    </form>
  );
}
