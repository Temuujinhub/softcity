import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getLatestArticles() {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, publishedAt: true },
  });
}

const services = [
  {
    title: "Сургалт, арга хэмжээ зохион байгуулах",
    desc: "Хот байгуулалт, нийтийн орон зайн талаар мэдлэг олгох сургалт, семинар зохион байгуулна.",
    href: "/work/consulting/events",
  },
  {
    title: "Туршлага судлах аялал",
    desc: "Дэлхийн шилдэг жишээнүүдийг биечлэн судлах аяллыг зохион байгуулна.",
    href: "/work/consulting/study-tours",
  },
  {
    title: "Орчуулгын үйлчилгээ",
    desc: "Хот байгуулалт, архитектурын чиглэлийн мэргэжлийн орчуулга хийнэ.",
    href: "/work/consulting/translation",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

export default async function HomePage() {
  const articles = await getLatestArticles();

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden flex items-center"
        style={{ minHeight: "90vh", backgroundColor: "#1c1c1c" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-300 mb-4">
              Зөөлөн хотын шийдэл НҮТББ
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Зөөлөн хот
            </h1>
            <p className="text-lg sm:text-xl text-stone-200 leading-relaxed mb-10 max-w-xl">
              Хүний хэмжээний, тогтвортой, амьдрахад таатай хот байгуулалтыг Монголд дэлгэрүүлж байна.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/story"
                className="bg-white text-stone-900 px-8 py-3 font-semibold hover:bg-stone-100 transition-colors"
              >
                Бидний тухай
              </Link>
              <Link
                href="/work"
                className="border border-white text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                Бидний ажил
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="py-12" style={{ backgroundColor: "#c4734a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl sm:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-white">
            "Хот бол зөвхөн барилга, зам биш — хүмүүс амьдарч, уулздаг орон зай юм."
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Зөвлөх үйлчилгээ</h2>
            <div className="w-12 h-1" style={{ backgroundColor: "#c4734a" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group p-8 border border-stone-200 hover:border-[#c4734a] transition-colors"
              >
                <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#c4734a] transition-colors">
                  {s.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#c4734a]">Дэлгэрэнгүй →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Festival highlight */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
                Тэмдэглэлт арга хэмжээ
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Зөөлөн хот фестиваль 2025
              </h2>
              <p className="text-stone-300 leading-relaxed mb-8">
                Монголын анхны хот байгуулалт, нийтийн орон зайн фестиваль. Дэлхийн тэргүүлэх мэргэжилтнүүд, Монголын идэвхтэн иргэд нэг дороо.
              </p>
              <Link
                href="/work/projects/festival-2025"
                className="inline-block border border-white text-white px-6 py-3 font-semibold hover:bg-white hover:text-stone-900 transition-colors"
              >
                Дэлгэрэнгүй
              </Link>
            </div>
            <div className="aspect-video bg-stone-800 overflow-hidden relative">
              <img
                src="/images/festival-2025.jpg"
                alt="Зөөлөн хот фестиваль 2025"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest news */}
      {articles.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Сүүлийн мэдээ</h2>
                <div className="w-12 h-1" style={{ backgroundColor: "#c4734a" }} />
              </div>
              <Link href="/news" className="text-sm font-semibold hover:underline" style={{ color: "#c4734a" }}>
                Бүгдийг үзэх →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`} className="group">
                  <div className="aspect-video bg-stone-200 mb-4 overflow-hidden">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs">
                        Зураггүй
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#c4734a" }}>
                    {CATEGORY_LABELS[a.category] || a.category}
                  </span>
                  <h3 className="font-bold text-lg text-stone-900 mt-1 group-hover:text-[#c4734a] transition-colors leading-snug">
                    {a.title}
                  </h3>
                  {a.excerpt && <p className="text-stone-500 text-sm mt-2 line-clamp-2">{a.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner CTA */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            Зөөлөн хотын шийдэл НҮТББ-тай хамтран ажиллах
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Бид хотын эрх баригчид, иргэний нийгмийн байгууллагууд, хувийн хэвшлийн байгууллагуудтай хамтран ажилладаг.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-stone-900 text-white px-8 py-4 font-semibold hover:bg-stone-800 transition-colors"
          >
            Холбоо барих
          </Link>
        </div>
      </section>
    </>
  );
}
