"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  async function deleteArticle(id: string) {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Нийтлэлүүд</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
        >
          + Нийтлэл нэмэх
        </Link>
      </div>

      {loading ? (
        <div className="text-stone-500">Ачааллаж байна...</div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Гарчиг</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Ангилал</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Статус</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Огноо</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-900 max-w-xs">
                    <div className="truncate">{a.title}</div>
                    <div className="text-xs text-stone-400">{a.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{CATEGORY_LABELS[a.category] || a.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${a.published ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-600"}`}>
                      {a.published ? "Нийтлэгдсэн" : "Ноорог"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500 text-xs">
                    {new Date(a.createdAt).toLocaleDateString("mn-MN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/admin/articles/${a.id}`} className="text-blue-600 hover:underline text-sm">
                        Засах
                      </Link>
                      <button
                        onClick={() => deleteArticle(a.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Устгах
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-stone-500">
                    Нийтлэл байхгүй байна.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
