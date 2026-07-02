"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  order: number;
}

const EMPTY_FORM = { name: "", role: "", bio: "", photoUrl: "", order: "0" };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/team");
    if (res.ok) setMembers(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: String(members.length) });
    setShowForm(true);
  }

  function startEdit(m: TeamMember) {
    setEditingId(m.id);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio || "",
      photoUrl: m.photoUrl || "",
      order: String(m.order),
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, order: Number(form.order) };
    const res = editingId
      ? await fetch(`/api/team/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/team", {
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
    if (!confirm("Энэ гишүүнийг устгах уу?")) return;
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
    if (res.ok) setMembers((p) => p.filter((m) => m.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Манай баг</h1>
          <p className="text-sm text-stone-500 mt-1">«Бидний түүх» хуудсанд харагдана.</p>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
        >
          + Гишүүн нэмэх
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-stone-900 mb-4">{editingId ? "Гишүүн засах" : "Шинэ гишүүн"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Нэр *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Албан тушаал *</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Товч танилцуулга</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={2}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Зургийн URL</label>
                <input
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
                {form.photoUrl && (
                  <img src={form.photoUrl} alt="" className="mt-2 h-24 w-20 object-cover border border-stone-200" />
                )}
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
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Гишүүн</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Албан тушаал</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Эрэмбэ</th>
              <th className="text-right px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : members.map((m) => (
              <tr key={m.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {m.photoUrl ? (
                      <img src={m.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
                        {m.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium text-stone-900">{m.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-600">{m.role}</td>
                <td className="px-4 py-3 text-stone-500">{m.order}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(m)} className="text-sm font-semibold text-stone-600 hover:text-stone-900">
                    Засах
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="text-sm font-semibold text-red-500 hover:text-red-700">
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
            {!loading && members.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Гишүүн байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
