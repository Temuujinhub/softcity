import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();
  const event = await prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description || null,
      location: data.location || null,
      dateText: data.dateText || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      year: Number(data.year),
      confirmed: Boolean(data.confirmed),
      registrationOpen: Boolean(data.registrationOpen),
      published: data.published !== false,
      order: Number(data.order) || 0,
    },
  });
  return NextResponse.json(event);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
