import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/lib/site";

export const alt = "Naveen Bike Rentals: bikes and scooters on rent in Hanamkonda, Warangal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadBike() {
  "use cache";
  const file = await readFile(join(process.cwd(), "public/bikes/classic-350.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const src = await loadBike();

  const plate = {
    display: "flex",
    alignItems: "center",
    background: "#1C1D1F",
    color: "#FFC531",
    borderRadius: 10,
    border: "3px solid #1C1D1F",
    boxShadow: "inset 0 0 0 3px rgba(255,197,49,0.55)",
    fontWeight: 700,
    letterSpacing: 2,
  } as const;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#EEEEEB", color: "#1C1D1F", padding: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ ...plate, fontSize: 28, padding: "8px 16px" }}>NAVEEN</span>
            <span style={{ fontSize: 26 }}>Bike Rentals</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -2 }}>Bikes and scooters on rent in Hanamkonda</span>
            <span style={{ fontSize: 26, color: "#464747", marginTop: 24 }}>
              14 bikes, kilometres included. Book on WhatsApp.
            </span>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 24 }}>
            <span style={{ ...plate, fontSize: 30, padding: "10px 18px", whiteSpace: "nowrap", flexShrink: 0 }}>FROM ₹399/DAY</span>
            <span style={{ color: "#464747", whiteSpace: "nowrap" }}>Rated {business.rating.value} on Google</span>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginLeft: 40, background: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
          <img src={src} width={500} height={281} alt="" style={{ objectFit: "contain" }} />
        </div>
      </div>
    ),
    size,
  );
}
