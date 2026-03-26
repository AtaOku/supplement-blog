import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion";

const DB_ID = process.env.NOTION_CONTACT_DB;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    if (!DB_ID) {
      console.error("NOTION_CONTACT_DB not configured");
      return NextResponse.json({ error: "Contact form not configured" }, { status: 500 });
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Subject: { select: { name: "Website Contact" } },
        Status: { select: { name: "New" } },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ type: "text", text: { content: message } }],
          },
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
