"use client";

import { useState } from "react";

export default function NewsletterForm() {
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

  if (status === "success") {
    return <p className="text-green-400 text-sm">Амжилттай бүртгэгдлээ!</p>;
  }

  return (
    <>
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Имэйл хаяг"
          required
          className="flex-1 bg-transparent border border-[#4a463f] text-white placeholder-[#8a8479] px-3 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-[#141414] px-5 py-2.5 text-sm font-semibold hover:bg-[#c4734a] hover:text-white transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Бүртгэх"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Бүртгэл амжилтгүй. Дахин оролдоно уу.</p>
      )}
    </>
  );
}
