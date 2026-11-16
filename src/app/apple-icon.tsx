import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1C1D1F" }}>
        <svg viewBox="0 0 40 40" width="180" height="180">
          <rect x="2.5" y="2.5" width="35" height="35" rx="5" fill="none" stroke="#FFC531" strokeOpacity="0.55" strokeWidth="1.2" />
          <path d="M12 30V10h4.4l7.4 12.2V10H28v20h-4.3L16.2 17.7V30z" fill="#FFC531" />
        </svg>
      </div>
    ),
    size,
  );
}
