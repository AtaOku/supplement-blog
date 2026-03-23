import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/sanity-queries";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "Blog Post";
  const category = post?.category ?? "Supplements";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3d0f 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#4ade80",
                background: "rgba(74, 222, 128, 0.1)",
                padding: "6px 16px",
                borderRadius: "20px",
              }}
            >
              {category}
            </div>
            <div style={{ fontSize: "18px", color: "#71717a" }}>Blog</div>
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              maxWidth: "1000px",
            }}
          >
            {title.length > 70 ? title.slice(0, 67) + "..." : title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "22px",
                background: "#166534",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
                color: "#4ade80",
              }}
            >
              RH
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "18px", fontWeight: 600, color: "#e4e4e7" }}>Ryan Holt</div>
              <div style={{ fontSize: "14px", color: "#71717a" }}>Lead Science Writer</div>
            </div>
          </div>
          <div style={{ fontSize: "18px", color: "#71717a" }}>supplementstack.space</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
