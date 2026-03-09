"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("admin-credentials", {
      email,
      password,
      role: "admin",
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Имэйл эсвэл нууц үг буруу байна.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-2xl text-white">ЗӨӨЛӨН ХОТ</Link>
          <h1 className="text-xl font-bold text-white mt-6 mb-1">Админ нэвтрэх</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Имэйл</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
              placeholder="admin@softcity.mn"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#c4734a" }}
          >
            {loading ? "..." : "Нэвтрэх"}
          </button>
        </form>
      </div>
    </div>
  );
}
