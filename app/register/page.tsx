"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Бүртгэл амжилтгүй боллоо.");
      setLoading(false);
      return;
    }

    // Auto-login after registration
    await signIn("admin-credentials", {
      email,
      password,
      role: "user",
      redirect: false,
    });

    router.push("/members");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-2xl text-stone-900">ЗӨӨЛӨН ХОТ</Link>
          <h1 className="text-2xl font-bold text-stone-900 mt-6 mb-2">Бүртгүүлэх</h1>
          <p className="text-stone-500 text-sm">Гишүүний хэсэгт нэвтрэх эрх авах</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 border border-stone-200 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Нэр (заавал биш)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Имэйл</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#c4734a" }}
          >
            {loading ? "..." : "Бүртгүүлэх"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-stone-600">
          Бүртгэл байна уу?{" "}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: "#c4734a" }}>
            Нэвтрэх
          </Link>
        </p>
      </div>
    </div>
  );
}
