import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return { title: `${article.title} | Зөөлөн хот`, description: article.excerpt || undefined };
}

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || !article.published) notFound();

  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 border-b border-[#e7e2d9]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Link href="/news" className="text-xs text-[#8a8479] hover:text-[#141414] transition-colors mb-6 inline-block">
            ← Мэдээлэл, нийтлэл
          </Link>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#c4734a" }}>
            {CATEGORY_LABELS[article.category] || article.category}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight">{article.title}</h1>
          {article.publishedAt && (
            <p className="mt-5 text-[#8a8479] text-sm">
              {new Date(article.publishedAt).toLocaleDateString("mn-MN")}
            </p>
          )}
        </div>
      </section>

      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-12">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {article.excerpt && (
            <p className="text-xl text-[#55504a] leading-relaxed mb-8 pb-8 border-b border-[#e7e2d9]">
              {article.excerpt}
            </p>
          )}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>
    </>
  );
}
