import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const checks: Record<string, string> = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✓ set" : "✗ MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "✗ MISSING",
    DATABASE_URL: process.env.DATABASE_URL ? "✓ set" : "✗ MISSING",
    SETUP_SECRET: process.env.SETUP_SECRET ? "✓ set" : "✗ MISSING",
  };

  let dbStatus = "unknown";
  let adminExists = false;
  try {
    const count = await prisma.adminUser.count();
    dbStatus = "✓ connected";
    adminExists = count > 0;
  } catch (e) {
    dbStatus = "✗ " + String(e).slice(0, 100);
  }

  return NextResponse.json({ checks, dbStatus, adminExists });
}

export async function POST(request: Request) {
  const secret = process.env.SETUP_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SETUP_SECRET env var not set" }, { status: 403 });
  }

  const body = await request.json();
  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret. SETUP_SECRET value must match." }, { status: 403 });
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
