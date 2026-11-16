"use client";

import { useSyncExternalStore } from "react";

/**
 * Current time, rounded to the minute, on the client only (null during SSR /
 * prerender). Avoids hydration mismatches for time-dependent UI.
 */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

export function useMinute(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * 60_000);
}

/** Visitor's local calendar date as YYYY-MM-DD, or "" before hydration. */
export function useToday(): string {
  const now = useMinute();
  if (!now) return "";
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
