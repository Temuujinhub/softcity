"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditArticlePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "news",
    coverImage: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/articles?id=${id}`)
      .then(() => fetch("/api/admin/articles"))
      .then((r) => r.json())
      .then((articles) => {
        const article = articles.find((a: { id: string }) => a.id === id);
        if (article) {
          setForm({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || "",
            content: article.content,
            category: article.category,
            coverImage: article.coverImage || "",
            published: article.published,
          });
        }
        setLoading(false);
      });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Хадгалах амжилтгүй боллоо.");
      return;
    }

    router.push("/admin/articles");
  }

  if (loading) return <div className="p-8 text-stone-500">Ачааллаж байна...</div>;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/articles" className="text-stone-500 hover:text-stone-900 text-sm">← Нийтлэлүүд</Link>
        <h1 className="text-2xl font-bold text-stone-900">Нийтлэл засах</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Гарчиг *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Slug *</label>
          <input name="slug" value={form.slug} onChange={handleChange} required
            className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Ангилал *</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500">
            <option value="news">Мэдээ</option>
            <option value="interview">Ярилцлага</option>
            <option value="publication">Шинэ бүтээл</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Хураангуй</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3}
            className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Агуулга * (HTML)</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={12}
            className="w-full border border-stone-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-stone-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Нүүрний зургийн URL</label>
          <input name="coverImage" value={form.coverImage} onChange={handleChange}
            className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="published" id="published" checked={form.published} onChange={handleChange} className="w-4 h-4" />
          <label htmlFor="published" className="text-sm font-semibold text-stone-700">Нийтлэх</label>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving}
            className="px-8 py-3 bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50">
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
          <Link href="/admin/articles" className="px-8 py-3 border border-stone-300 text-stone-700 font-semibold hover:border-stone-700">
            Цуцлах
          </Link>
        </div>
      </form>
    </div>
  );
}
