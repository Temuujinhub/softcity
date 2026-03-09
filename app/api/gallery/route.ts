import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const album = searchParams.get("album");

  const where = album ? { album } : {};
  const images = await prisma.galleryImage.findMany({
    where,
    orderBy: [{ album: "asc" }, { order: "asc" }],
  });

  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const image = await prisma.galleryImage.create({
    data: {
      url: data.url,
      caption: data.caption,
      album: data.album,
      order: data.order || 0,
    },
  });

  return NextResponse.json(image);
}
