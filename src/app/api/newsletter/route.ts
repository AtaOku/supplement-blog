import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion";

const DB_ID = process.env.NOTION_NEWSLETTER_DB;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!DB_ID) {
      console.error("NOTION_NEWSLETTER_DB not configured");
      return NextResponse.json({ error: "Newsletter not configured" }, { status: 500 });
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: {
        Email: { title: [{ text: { content: email } }] },
        Date: { date: { start: new Date().toISOString().split("T")[0] } },
        Source: { select: { name: "Website" } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
