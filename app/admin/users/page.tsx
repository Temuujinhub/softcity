"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Хэрэглэгчид ({users.length})</h1>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">#</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Имэйл</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Нэр</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Бүртгүүлсэн</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Ачааллаж байна...</td></tr>
            ) : users.map((u, i) => (
              <tr key={u.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-stone-900">{u.email}</td>
                <td className="px-4 py-3 text-stone-600">{u.name || "—"}</td>
                <td className="px-4 py-3 text-stone-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString("mn-MN")}
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-stone-500">Хэрэглэгч байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
