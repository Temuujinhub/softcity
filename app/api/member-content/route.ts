import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const content = await prisma.memberContent.findUnique({ where: { slug } });
    if (!content || !content.published) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(content);
  }

  const contents = await prisma.memberContent.findMany({ where: { published: true } });
  return NextResponse.json(contents);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const content = await prisma.memberContent.create({
    data: {
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: data.description,
      fileUrl: data.fileUrl,
      videoUrl: data.videoUrl,
      published: data.published || false,
    },
  });

  return NextResponse.json(content);
}
