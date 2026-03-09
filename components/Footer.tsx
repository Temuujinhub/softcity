"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">ЗӨӨЛӨН ХОТ</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              Зөөлөн хотын шийдэл НҮТББ — Монгол улсад хүний хэмжээний, тогтвортой хот байгуулалтыг дэмжигч.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/softcitymongolia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Холбооснууд</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/story" className="hover:text-white transition-colors">Бидний түүх</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">Бидний ажил</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Мэдээлэл, нийтлэл</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Зургийн цомог</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Холбоо барих</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Мейл бүртгэл</h4>
            <p className="text-sm text-stone-400 mb-4">Зөөлөн хотын мэдээ, мэдээллийг хүлээн авах.</p>
            {status === "success" ? (
              <p className="text-green-400 text-sm">Амжилттай бүртгэгдлээ!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Мейл хаяг"
                  required
                  className="flex-1 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-white text-stone-900 px-4 py-2 text-sm font-semibold hover:bg-stone-100 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Бүртгэх"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2">Бүртгэл амжилтгүй. Дахин оролдоно уу.</p>
            )}
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© 2025 Зөөлөн хотын шийдэл НҮТББ. Бүх эрх хуулиар хамгаалагдсан.</p>
          <Link href="/admin" className="hover:text-stone-400 transition-colors">Админ</Link>
        </div>
      </div>
    </footer>
  );
}
