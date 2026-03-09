import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// One-time setup endpoint to create admin user
// DELETE this file after first use
export async function GET() {
  const secret = process.env.SETUP_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SETUP_SECRET env var not set" }, { status: 403 });
  }
  return NextResponse.json({ message: "Use POST with { secret, email, password }" });
}

export async function POST(request: Request) {
  const secret = process.env.SETUP_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SETUP_SECRET env var not set" }, { status: 403 });
  }

  const body = await request.json();
  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
  }

  const email = body.email || "admin@softcity.mn";
  const password = body.password || "admin123";
  const name = body.name || "Admin";

  try {
    const hashed = await bcrypt.hash(password, 10);
    const admin = await prisma.adminUser.upsert({
      where: { email },
      update: { password: hashed, name },
      create: { email, password: hashed, name },
    });
    return NextResponse.json({ success: true, email: admin.email });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
