import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";

  if (all) {
    // Админд: бүх арга хэмжээ + бүртгэлийн тоо
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const events = await prisma.event.findMany({
      orderBy: [{ year: "desc" }, { order: "asc" }],
      include: { _count: { select: { registrations: true } } },
    });
    return NextResponse.json(events);
  }

  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: [{ year: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.title || !data.year) {
    return NextResponse.json({ error: "Гарчиг, он заавал шаардлагатай" }, { status: 400 });
  }

  const slug: string =
    data.slug ||
    `${data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}-${Date.now().toString(36)}`;

  const event = await prisma.event.create({
    data: {
      title: data.title,
      slug,
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
