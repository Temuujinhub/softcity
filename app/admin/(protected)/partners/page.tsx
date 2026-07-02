"use client";

import { useEffect, useState } from "react";

interface Partner {
  id: string;
  name: string;
  logoUrl: string | null;
  url: string | null;
  order: number;
}

const EMPTY_FORM = { name: "", logoUrl: "", url: "", order: "0" };

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/partners");
    if (res.ok) setPartners(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: String(partners.length) });
    setShowForm(true);
  }

  function startEdit(p: Partner) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      logoUrl: p.logoUrl || "",
      url: p.url || "",
      order: String(p.order),
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, order: Number(form.order) };
    const res = editingId
      ? await fetch(`/api/partners/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    if (res.ok) {
      await load();
      setShowForm(false);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ хамтрагчийг устгах уу?")) return;
    const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
    if (res.ok) setPartners((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Хамтрагч байгууллагууд</h1>
          <p className="text-sm text-stone-500 mt-1">
            «Бидний түүх» хуудсанд харагдана. Лого URL оруулбал логогоор, үгүй бол нэрээр харагдана.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
        >
          + Хамтрагч нэмэх
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-stone-900 mb-4">{editingId ? "Хамтрагч засах" : "Шинэ хамтрагч"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Нэр *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Лого URL</label>
                <input
                  value={form.logoUrl}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Вэбсайт URL</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Эрэмбэ</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            {form.logoUrl && (
              <img src={form.logoUrl} alt="" className="h-14 object-contain border border-stone-200 p-2" />
            )}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:opacity-50"
              >
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-stone-700"
              >
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
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Байгууллага</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Вэбсайт</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Эрэмбэ</th>
              <th className="text-right px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : partners.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.logoUrl && <img src={p.logoUrl} alt="" className="h-8 w-14 object-contain" />}
                    <span className="font-medium text-stone-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">{p.url || "—"}</td>
                <td className="px-4 py-3 text-stone-500">{p.order}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(p)} className="text-sm font-semibold text-stone-600 hover:text-stone-900">
                    Засах
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-sm font-semibold text-red-500 hover:text-red-700">
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
            {!loading && partners.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Хамтрагч байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
