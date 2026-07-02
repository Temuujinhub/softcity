import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: "Нэр заавал шаардлагатай" }, { status: 400 });
  }
  const partner = await prisma.partner.create({
    data: {
      name: data.name,
      logoUrl: data.logoUrl || null,
      url: data.url || null,
      order: Number(data.order) || 0,
    },
  });
  return NextResponse.json(partner);
}
