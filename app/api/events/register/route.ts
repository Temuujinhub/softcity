import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { eventId, name, email, phone } = data as {
    eventId?: string;
    name?: string;
    email?: string;
    phone?: string;
  };

  if (!eventId || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Нэр, имэйл заавал шаардлагатай" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Имэйл хаяг буруу байна" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || !event.published) {
    return NextResponse.json({ error: "Арга хэмжээ олдсонгүй" }, { status: 404 });
  }
  if (!event.registrationOpen) {
    return NextResponse.json({ error: "Бүртгэл хараахан нээгдээгүй байна" }, { status: 400 });
  }

  try {
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
      },
    });
    return NextResponse.json({ ok: true, id: registration.id });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "Энэ имэйлээр аль хэдийн бүртгүүлсэн байна" }, { status: 409 });
    }
    throw e;
  }
}
