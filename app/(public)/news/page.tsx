import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader label="Агуулга" title="Мэдээлэл, нийтлэл" />

      <section className="py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-14">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/news" : `/news?category=${cat.value}`}
                className={`px-5 py-2.5 text-sm font-semibold border transition-colors ${
                  (category || "all") === cat.value
                    ? "bg-[#141414] text-white border-[#141414]"
                    : "border-[#d5cec2] text-[#55504a] hover:border-[#141414]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-[#8a8479]">Мэдээлэл байхгүй байна.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {articles.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`} className="group">
                  <div className="aspect-[3/2] bg-[#efe9de] mb-5 overflow-hidden">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c4734a" }}>
                    {CATEGORY_LABELS[a.category] || a.category}
                  </span>
                  <h2 className="font-bold text-xl mt-2 group-hover:text-[#c4734a] transition-colors leading-snug">
                    {a.title}
                  </h2>
                  {a.excerpt && <p className="text-[#6b655c] text-sm mt-2 line-clamp-2">{a.excerpt}</p>}
                  {a.publishedAt && (
                    <p className="text-[#a89f90] text-xs mt-3">
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
