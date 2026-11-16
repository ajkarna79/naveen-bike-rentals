import { bikeLabel, inr, type Bike } from "./fleet";
import { business } from "./site";

export type BookingInput = {
  bike: Bike;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  days: number;
  name?: string;
  note?: string;
};

export function estimate(bike: Bike, days: number) {
  const d = Math.max(1, Math.round(days));
  return { days: d, rent: bike.pricePerDay * d, km: bike.kmPerDay * d };
}

function fmtDate(date: string, time: string) {
  const d = new Date(`${date}T${time || "09:00"}`);
  if (Number.isNaN(d.valueOf())) return `${date} ${time}`;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export function returnDate(date: string, time: string, days: number) {
  const d = new Date(`${date}T${time || "09:00"}`);
  if (Number.isNaN(d.valueOf())) return null;
  d.setDate(d.getDate() + Math.max(1, days));
  return d;
}

export function buildBookingMessage({ bike, date, time, days, name, note }: BookingInput) {
  const e = estimate(bike, days);
  const ret = returnDate(date, time, e.days);
  const lines = [
    `Hi ${business.name}! I'd like to book a ride.`,
    "",
    `🏍️ Bike: ${bikeLabel(bike)}`,
    `📅 Pickup: ${fmtDate(date, time)}`,
    `⏱️ Duration: ${e.days} day${e.days > 1 ? "s" : ""}${
      ret
        ? ` (return by ${new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).format(ret)})`
        : ""
    }`,
    `💰 Estimate: ${inr(e.rent)} (${inr(bike.pricePerDay)}/day · ${e.km} km included)`,
    ...(name?.trim() ? [`🙋 Name: ${name.trim()}`] : []),
    ...(note?.trim() ? [`📝 Note: ${note.trim()}`] : []),
    "",
    "Please confirm availability and the security deposit. Thank you!",
  ];
  return lines.join("\n");
}

export function openWhatsApp(text: string) {
  const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}
