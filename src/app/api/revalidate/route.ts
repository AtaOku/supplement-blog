import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity webhook → on-demand ISR revalidation
// Called automatically when content is published/updated in Sanity Studio
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type, slug } = body;

    // Always revalidate sitemap
    revalidatePath("/sitemap.xml");

    if (_type === "post") {
      revalidatePath("/blog");
      if (slug?.current) revalidatePath(`/blog/${slug.current}`);
    } else if (_type === "review") {
      revalidatePath("/reviews");
      if (slug?.current) revalidatePath(`/reviews/${slug.current}`);
    } else if (_type === "category") {
      if (slug?.current) revalidatePath(`/category/${slug.current}`);
    }

    // Revalidate homepage and category index for any content change
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, type: _type });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
