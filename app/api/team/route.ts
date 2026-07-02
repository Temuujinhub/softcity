import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.name || !data.role) {
    return NextResponse.json({ error: "Нэр, албан тушаал заавал шаардлагатай" }, { status: 400 });
  }
  const member = await prisma.teamMember.create({
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio || null,
      photoUrl: data.photoUrl || null,
      order: Number(data.order) || 0,
    },
  });
  return NextResponse.json(member);
}
