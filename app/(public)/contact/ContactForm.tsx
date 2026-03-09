"use client";

import { useState } from "react";

export default function ContactForm() {
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
    if (res.ok) { setStatus("success"); setEmail(""); }
    else setStatus("error");
  }

  return (
    <div className="mt-12 p-8 bg-stone-50">
      <h3 className="font-bold text-stone-900 mb-2">Мэйл бүртгэл</h3>
      <p className="text-stone-600 text-sm mb-4">Зөөлөн хотын мэдээ, мэдээллийг хүлээн авах.</p>
      {status === "success" ? (
        <p className="font-semibold" style={{ color: "#c4734a" }}>Амжилттай бүртгэгдлээ!</p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Мейл хаяг"
            required
            className="flex-1 border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-stone-900 text-white px-4 py-2 text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Бүртгэх"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">Алдаа гарлаа. Дахин оролдоно уу.</p>
      )}
    </div>
  );
}
