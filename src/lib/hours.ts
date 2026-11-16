import { business } from "./site";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function fmt12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
}

/** Current day/minute in India, regardless of the visitor's timezone. */
function nowInIndia(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { day: days.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenStatus = { open: boolean; label: string; today: number };

export function getOpenStatus(now = new Date()): OpenStatus {
  const { day, minutes } = nowInIndia(now);
  const today = business.hours.find((h) => h.day === day)!;
  if (minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    const left = toMin(today.close) - minutes;
    return {
      open: true,
      today: day,
      label: left <= 60 ? `Open, closes at ${fmt12(today.close)}` : `Open now until ${fmt12(today.close)}`,
    };
  }
  if (minutes < toMin(today.open)) {
    return { open: false, today: day, label: `Opens ${fmt12(today.open)} today` };
  }
  const next = business.hours.find((h) => h.day === (day + 1) % 7)!;
  return { open: false, today: day, label: `Closed now, opens ${fmt12(next.open)} tomorrow` };
}
