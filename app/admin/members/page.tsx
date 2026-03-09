"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MemberContent {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  fileUrl: string | null;
  videoUrl: string | null;
  published: boolean;
}

export default function AdminMembersPage() {
  const [contents, setContents] = useState<MemberContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", description: "", fileUrl: "", videoUrl: "", published: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/member-content")
      .then((r) => r.json())
      .then(setContents)
      .catch(() => setContents([]))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  }

  function generateSlug() {
    setForm((p) => ({ ...p, slug: p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/member-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const created = await res.json();
      setContents((p) => [...p, created]);
      setForm({ title: "", slug: "", description: "", fileUrl: "", videoUrl: "", published: false });
      setShowForm(false);
    }
    setSaving(false);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Гишүүний агуулга</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
        >
          + Агуулга нэмэх
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-stone-900 mb-4">Шинэ агуулга</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Гарчиг *</label>
                <input name="title" value={form.title} onChange={handleChange} onBlur={generateSlug} required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Slug *</label>
                <input name="slug" value={form.slug} onChange={handleChange} required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Тайлбар</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={2}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Файлын URL</label>
                <input name="fileUrl" value={form.fileUrl} onChange={handleChange}
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Видео URL</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="mc-published" checked={form.published} onChange={handleChange} className="w-4 h-4" />
              <label htmlFor="mc-published" className="text-sm font-semibold text-stone-700">Нийтлэх</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="px-6 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:opacity-50">
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-stone-700">
                Цуцлах
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Гарчиг</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Видео</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Файл</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : contents.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-stone-900">{c.title}</div>
                  <div className="text-xs text-stone-400">{c.slug}</div>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">{c.videoUrl ? "✓" : "—"}</td>
                <td className="px-4 py-3 text-stone-500 text-xs">{c.fileUrl ? "✓" : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${c.published ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-600"}`}>
                    {c.published ? "Нийтлэгдсэн" : "Ноорог"}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && contents.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Агуулга байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
