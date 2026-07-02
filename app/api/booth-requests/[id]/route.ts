import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "confirmed", "rejected"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();
  if (!STATUSES.includes(data.status)) {
    return NextResponse.json({ error: "Статус буруу байна" }, { status: 400 });
  }
  const request = await prisma.boothRequest.update({
    where: { id },
    data: { status: data.status },
  });
  return NextResponse.json(request);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.boothRequest.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
