import { ImageResponse } from "next/og";

export const alt = "Supplement Guide — Science-Based Reviews & Comparisons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3d0f 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#4ade80",
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
            }}
          >
            Supplement Guide
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              maxWidth: "900px",
            }}
          >
            Science-Based Supplement Reviews & Guides
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Performance, longevity, cognition, and metabolic health
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "18px",
            color: "#71717a",
          }}
        >
          supplementstack.space
        </div>
      </div>
    ),
    { ...size },
  );
}
