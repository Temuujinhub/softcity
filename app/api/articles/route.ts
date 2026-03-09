import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (slug) {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article || !article.published) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(article);
  }

  const where: { published: boolean; category?: string } = { published: true };
  if (category) where.category = category;

  const articles = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, publishedAt: true },
  });

  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      coverImage: data.coverImage,
      published: data.published || false,
      publishedAt: data.published ? new Date() : null,
    },
  });

  return NextResponse.json(article);
}
