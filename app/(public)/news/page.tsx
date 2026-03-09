import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Мэдээлэл, нийтлэл | Зөөлөн хот" };
export const dynamic = "force-dynamic";

const CATEGORIES = [
  { value: "all", label: "Бүгд" },
  { value: "interview", label: "Ярилцлага" },
  { value: "publication", label: "Шинэ бүтээл" },
  { value: "news", label: "Мэдээ" },
];

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const where: { published: boolean; category?: string } = { published: true };
  if (category && category !== "all") where.category = category;

  type ArticlePreview = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string;
    coverImage: string | null;
    publishedAt: Date | null;
  };
  let articles: ArticlePreview[] = [];
  try {
    articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, publishedAt: true },
    });
  } catch {
    // DB unavailable
  }

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Агуулга
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Мэдээлэл, нийтлэл</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/news" : `/news?category=${cat.value}`}
                className={`px-4 py-2 text-sm font-semibold border transition-colors ${
                  (category || "all") === cat.value
                    ? "bg-stone-900 text-white border-stone-900"
                    : "border-stone-300 text-stone-700 hover:border-stone-900"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-stone-500">Мэдээлэл байхгүй байна.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`} className="group">
                  <div className="aspect-video bg-stone-100 mb-4 overflow-hidden">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">Зураггүй</div>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#c4734a" }}>
                    {CATEGORY_LABELS[a.category] || a.category}
                  </span>
                  <h2 className="font-bold text-lg text-stone-900 mt-1 group-hover:text-[#c4734a] transition-colors leading-snug">
                    {a.title}
                  </h2>
                  {a.excerpt && <p className="text-stone-500 text-sm mt-2 line-clamp-2">{a.excerpt}</p>}
                  {a.publishedAt && (
                    <p className="text-stone-400 text-xs mt-2">
                      {new Date(a.publishedAt).toLocaleDateString("mn-MN")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
