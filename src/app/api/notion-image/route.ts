import { NextRequest, NextResponse } from "next/server";

// Proxy Notion S3 images to avoid 1-hour URL expiry
// Caches at CDN level for 24 hours
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  // Only allow Notion/AWS S3 URLs
  if (
    !url.includes("amazonaws.com") &&
    !url.includes("notion.so") &&
    !url.includes("notion-static.com")
  ) {
    return NextResponse.json({ error: "Invalid image source" }, { status: 403 });
  }

  try {
    const imageRes = await fetch(url);
    if (!imageRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: imageRes.status }
      );
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const buffer = await imageRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Image proxy error" },
      { status: 500 }
    );
  }
}
