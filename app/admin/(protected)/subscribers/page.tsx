"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((r) => r.json())
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, []);

  function copyEmails() {
    const emails = subscribers.map((s) => s.email).join("\n");
    navigator.clipboard.writeText(emails);
    alert("Имэйлүүд хуулагдлаа!");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Мейл бүртгэл ({subscribers.length})</h1>
        {subscribers.length > 0 && (
          <button
            onClick={copyEmails}
            className="px-4 py-2 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-stone-700 transition-colors"
          >
            Бүгдийг хуулах
          </button>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">#</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Имэйл</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Бүртгүүлсэн огноо</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : subscribers.map((s, i) => (
              <tr key={s.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-stone-900">{s.email}</td>
                <td className="px-4 py-3 text-stone-500 text-xs">
                  {new Date(s.createdAt).toLocaleDateString("mn-MN")}
                </td>
              </tr>
            ))}
            {!loading && subscribers.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-stone-500">Бүртгэл байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
