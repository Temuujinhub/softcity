"use client";

import { useEffect, useState } from "react";

interface BoothRequest {
  id: string;
  boothNumber: string;
  orgName: string;
  phone: string;
  email: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Хүлээгдэж буй", cls: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Баталгаажсан", cls: "bg-green-100 text-green-700" },
  rejected: { label: "Цуцалсан", cls: "bg-stone-100 text-stone-600" },
};

const FILTERS = [
  { value: "all", label: "Бүгд" },
  { value: "pending", label: "Хүлээгдэж буй" },
  { value: "confirmed", label: "Баталгаажсан" },
  { value: "rejected", label: "Цуцалсан" },
];

export default function AdminBoothsPage() {
  const [requests, setRequests] = useState<BoothRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/booth-requests")
      .then((r) => (r.ok ? r.json() : []))
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  async function setStatus(id: string, status: string) {
    setUpdating(id);
    const res = await fetch(`/api/booth-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setRequests((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
    }
    setUpdating(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ хүсэлтийг устгах уу?")) return;
    const res = await fetch(`/api/booth-requests/${id}`, { method: "DELETE" });
    if (res.ok) setRequests((p) => p.filter((r) => r.id !== id));
  }

  const visible = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Талбай түрээсийн хүсэлтүүд</h1>
          <p className="text-sm text-stone-500 mt-1">
            Хүсэлт өгсөн хүмүүстэй утас/имэйлээр нь эргэж холбогдоод захиалгыг баталгаажуулна уу.
            {pendingCount > 0 && (
              <span className="ml-2 font-semibold text-yellow-600">
                {pendingCount} хүсэлт хүлээгдэж байна
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 text-sm font-semibold border transition-colors ${
              filter === f.value
                ? "bg-stone-900 text-white border-stone-900"
                : "border-stone-300 text-stone-700 hover:border-stone-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Талбай</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Байгууллага / Төсөл</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Холбоо барих</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Огноо</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Статус</th>
              <th className="text-right px-4 py-3 font-semibold text-stone-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : visible.map((r) => {
              const st = STATUS_LABELS[r.status] || STATUS_LABELS.pending;
              return (
                <tr key={r.id} className="hover:bg-stone-50 align-top">
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 bg-stone-900 text-white font-bold text-sm">
                      {r.boothNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-stone-900">{r.orgName}</div>
                    {r.message && (
                      <div className="text-xs text-stone-500 mt-1 max-w-xs whitespace-pre-wrap">{r.message}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    <div><a href={`tel:${r.phone}`} className="hover:underline">{r.phone}</a></div>
                    <div><a href={`mailto:${r.email}`} className="hover:underline text-xs text-stone-500">{r.email}</a></div>
                  </td>
                  <td className="px-4 py-3 text-stone-500">
                    {new Date(r.createdAt).toLocaleDateString("mn-MN")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    {r.status !== "confirmed" && (
                      <button
                        onClick={() => setStatus(r.id, "confirmed")}
                        disabled={updating === r.id}
                        className="text-sm font-semibold text-green-600 hover:text-green-800 disabled:opacity-50"
                      >
                        Баталгаажуулах
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        onClick={() => setStatus(r.id, "rejected")}
                        disabled={updating === r.id}
                        className="text-sm font-semibold text-stone-500 hover:text-stone-700 disabled:opacity-50"
                      >
                        Цуцлах
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700"
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              );
            })}
            {!loading && visible.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-500">Хүсэлт байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
