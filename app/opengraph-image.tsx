import { ImageResponse } from "next/og";
import { profile } from "@/data";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#ededed",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a3a3a8" }}>
          <span>{profile.role}</span>
          <span>heyvinayak.dev</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: 980 }}>
          {profile.headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 120, letterSpacing: "-0.05em", lineHeight: 0.85 }}>vinayak porwal</span>
          <span style={{ width: 56, height: 56, background: "#b11226" }} />
        </div>
      </div>
    ),
    size,
  );
}
