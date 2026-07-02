import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const requests = await prisma.boothRequest.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { boothNumber, orgName, phone, email, message } = data as {
    boothNumber?: string;
    orgName?: string;
    phone?: string;
    email?: string;
    message?: string;
  };

  if (!boothNumber?.trim() || !orgName?.trim() || !phone?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Талбайн дугаар, байгууллага/төслийн нэр, утас, имэйл заавал шаардлагатай" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Имэйл хаяг буруу байна" }, { status: 400 });
  }

  const request = await prisma.boothRequest.create({
    data: {
      boothNumber: boothNumber.trim(),
      orgName: orgName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message?.trim() || null,
    },
  });
  return NextResponse.json({ ok: true, id: request.id });
}
