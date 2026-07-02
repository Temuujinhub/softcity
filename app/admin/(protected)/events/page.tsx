"use client";

import { useEffect, useState } from "react";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  dateText: string | null;
  year: number;
  confirmed: boolean;
  registrationOpen: boolean;
  published: boolean;
  order: number;
  _count?: { registrations: number };
}

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "",
  dateText: "",
  year: String(new Date().getFullYear() + 1),
  confirmed: false,
  registrationOpen: false,
  published: true,
  order: "0",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [regsFor, setRegsFor] = useState<EventItem | null>(null);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [regsLoading, setRegsLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/events?all=1");
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowForm(true);
  }

  function startEdit(e: EventItem) {
    setEditingId(e.id);
    setForm({
      title: e.title,
      description: e.description || "",
      location: e.location || "",
      dateText: e.dateText || "",
      year: String(e.year),
      confirmed: e.confirmed,
      registrationOpen: e.registrationOpen,
      published: e.published,
      order: String(e.order),
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, year: Number(form.year), order: Number(form.order) };
    const res = editingId
      ? await fetch(`/api/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/events", {
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
    if (!confirm("Энэ арга хэмжээг устгах уу? Бүртгэлүүд хамт устана.")) return;
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res.ok) setEvents((p) => p.filter((e) => e.id !== id));
  }

  async function showRegistrations(e: EventItem) {
    setRegsFor(e);
    setRegsLoading(true);
    const res = await fetch(`/api/events/${e.id}/registrations`);
    setRegs(res.ok ? await res.json() : []);
    setRegsLoading(false);
  }

  function exportCsv() {
    if (!regsFor) return;
    const rows = [
      ["Нэр", "Имэйл", "Утас", "Огноо"],
      ...regs.map((r) => [r.name, r.email, r.phone || "", new Date(r.createdAt).toLocaleString("mn-MN")]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${regsFor.slug}-registrations.csv`;
    a.click();
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Арга хэмжээ</h1>
          <p className="text-sm text-stone-500 mt-1">
            Тов гарсан арга хэмжээ сайтад тодоор харагдана. «Бүртгэл нээлттэй» бол зочид бүртгүүлж чадна.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
        >
          + Арга хэмжээ нэмэх
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-stone-900 mb-4">
            {editingId ? "Арга хэмжээ засах" : "Шинэ арга хэмжээ"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Нэр *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Он *</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Тайлбар</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Огноо (текст)</label>
                <input
                  value={form.dateText}
                  onChange={(e) => setForm({ ...form, dateText: e.target.value })}
                  placeholder="ж: 2026.06.15 эсвэл 2026 оны зун"
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Байршил</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
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
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={form.confirmed}
                  onChange={(e) => setForm({ ...form, confirmed: e.target.checked })}
                  className="w-4 h-4"
                />
                Тов гарсан (тодоор харагдана)
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={form.registrationOpen}
                  onChange={(e) => setForm({ ...form, registrationOpen: e.target.checked })}
                  className="w-4 h-4"
                />
                Бүртгэл нээлттэй
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4"
                />
                Сайтад харуулах
              </label>
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
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Нэр</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Он / Огноо</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Статус</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Бүртгэл</th>
              <th className="text-right px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : events.map((e) => (
              <tr key={e.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <div className={`${e.confirmed ? "font-bold" : "font-medium"} text-stone-900`}>{e.title}</div>
                  {e.location && <div className="text-xs text-stone-400">{e.location}</div>}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {e.year}{e.dateText ? ` · ${e.dateText}` : ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {e.confirmed && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-700">Тов гарсан</span>
                    )}
                    {e.registrationOpen && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700">Бүртгэл нээлттэй</span>
                    )}
                    {!e.published && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-stone-100 text-stone-600">Нуугдсан</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => showRegistrations(e)}
                    className="text-sm font-semibold text-stone-700 hover:text-stone-900 underline"
                  >
                    {e._count?.registrations ?? 0} бүртгэл
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(e)} className="text-sm font-semibold text-stone-600 hover:text-stone-900">
                    Засах
                  </button>
                  <button onClick={() => handleDelete(e.id)} className="text-sm font-semibold text-red-500 hover:text-red-700">
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
            {!loading && events.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-500">Арга хэмжээ байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Registrations modal */}
      {regsFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setRegsFor(null)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[80vh] overflow-auto rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-stone-900">{regsFor.title} — бүртгэлүүд</h2>
              <div className="flex gap-3 items-center">
                {regs.length > 0 && (
                  <button
                    onClick={exportCsv}
                    className="px-3 py-1.5 text-xs font-semibold border border-stone-300 hover:border-stone-700"
                  >
                    CSV татах
                  </button>
                )}
                <button onClick={() => setRegsFor(null)} className="text-xl text-stone-400 hover:text-stone-900">×</button>
              </div>
            </div>
            {regsLoading ? (
              <p className="text-stone-500 py-8 text-center">Ачааллаж байна...</p>
            ) : regs.length === 0 ? (
              <p className="text-stone-500 py-8 text-center">Бүртгэл байхгүй байна.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-stone-700">Нэр</th>
                    <th className="text-left px-3 py-2 font-semibold text-stone-700">Имэйл</th>
                    <th className="text-left px-3 py-2 font-semibold text-stone-700">Утас</th>
                    <th className="text-left px-3 py-2 font-semibold text-stone-700">Огноо</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {regs.map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-2">{r.name}</td>
                      <td className="px-3 py-2">{r.email}</td>
                      <td className="px-3 py-2">{r.phone || "—"}</td>
                      <td className="px-3 py-2 text-stone-500">
                        {new Date(r.createdAt).toLocaleDateString("mn-MN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
