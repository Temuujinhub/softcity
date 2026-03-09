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
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">
            ← Мэдээлэл, нийтлэл
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            {CATEGORY_LABELS[article.category] || article.category}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{article.title}</h1>
          {article.publishedAt && (
            <p className="mt-4 text-stone-400 text-sm">
              {new Date(article.publishedAt).toLocaleDateString("mn-MN")}
            </p>
          )}
        </div>
      </section>

      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.excerpt && (
            <p className="text-xl text-stone-600 leading-relaxed mb-8 pb-8 border-b border-stone-200">
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
