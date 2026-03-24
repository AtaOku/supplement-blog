import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// On-demand revalidation endpoint
// Can be triggered manually or via automation (e.g., Notion webhook, cron)
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") ?? "";
  const expected = process.env.REVALIDATE_SECRET ?? "";

  if (
    !expected ||
    secret.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(secret), Buffer.from(expected))
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const paths = (body.paths as string[]) ?? [];

    // Always revalidate core pages
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/blog");
    revalidatePath("/research");

    // Revalidate specific paths if provided
    for (const p of paths) {
      if (typeof p === "string" && p.startsWith("/")) {
        revalidatePath(p);
      }
    }

    return NextResponse.json(
      { revalidated: true, paths: ["/", "/sitemap.xml", "/blog", "/research", ...paths] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
