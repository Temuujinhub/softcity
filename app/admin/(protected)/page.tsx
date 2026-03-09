import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [articleCount, galleryCount, subscriberCount, userCount] = await Promise.all([
    prisma.article.count(),
    prisma.galleryImage.count(),
    prisma.subscriber.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Нийтлэл", count: articleCount, href: "/admin/articles", color: "bg-blue-50 border-blue-200" },
    { label: "Зураг", count: galleryCount, href: "/admin/gallery", color: "bg-green-50 border-green-200" },
    { label: "Бүртгэл", count: subscriberCount, href: "/admin/subscribers", color: "bg-yellow-50 border-yellow-200" },
    { label: "Хэрэглэгч", count: userCount, href: "/admin/users", color: "bg-purple-50 border-purple-200" },
  ];

  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Хяналтын самбар</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`p-6 border rounded-lg ${s.color} hover:shadow-sm transition-shadow`}>
            <div className="text-3xl font-bold text-stone-900">{s.count}</div>
            <div className="text-sm text-stone-600 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Шуурхай үйлдэл</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors">
            + Нийтлэл нэмэх
          </Link>
          <Link href="/admin/gallery" className="px-4 py-2 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-stone-700 transition-colors">
            + Зураг нэмэх
          </Link>
          <Link href="/admin/members" className="px-4 py-2 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-stone-700 transition-colors">
            + Гишүүний агуулга
          </Link>
        </div>
      </div>

      {/* Recent articles */}
      <div>
        <h2 className="text-lg font-bold text-stone-900 mb-4">Сүүлийн нийтлэлүүд</h2>
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Гарчиг</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Ангилал</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Статус</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentArticles.map((a) => (
                <tr key={a.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-900 max-w-xs truncate">{a.title}</td>
                  <td className="px-4 py-3 text-stone-600">{a.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${a.published ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-600"}`}>
                      {a.published ? "Нийтлэгдсэн" : "Ноорог"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/articles/${a.id}`} className="text-blue-600 hover:underline">
                      Засах
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
