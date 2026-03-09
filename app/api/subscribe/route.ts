import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  try {
    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }
}
