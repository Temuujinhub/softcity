"use client";

import { useState } from "react";
import type { Metadata } from "next";

const externalLinks = [
  { label: "Facebook", href: "https://www.facebook.com/softcitymongolia" },
  { label: "Gehl Architects", href: "https://www.gehlpeople.com" },
  { label: "Think Softer", href: "https://www.thinksofter.com" },
  { label: "Project for Public Spaces", href: "https://www.pps.org" },
  { label: "Congress for the New Urbanism", href: "https://www.cnu.org" },
];

export default function ContactPage() {
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
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Харилцаа холбоо
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Холбоо барих</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Холбоо барих</h2>
              <div className="space-y-4 text-stone-600">
                <div>
                  <p className="font-semibold text-stone-900">Байгууллага</p>
                  <p>Зөөлөн хотын шийдэл НҮТББ</p>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Имэйл</p>
                  <a href="mailto:info@softcity.mn" className="hover:underline" style={{ color: "#c4734a" }}>
                    info@softcity.mn
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Facebook</p>
                  <a
                    href="https://www.facebook.com/softcitymongolia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "#c4734a" }}
                  >
                    facebook.com/softcitymongolia
                  </a>
                </div>
              </div>

              {/* Newsletter */}
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
              </div>
            </div>

            {/* Links + partner */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Хэрэгтэй холбооснууд</h2>
              <ul className="space-y-3">
                {externalLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border border-stone-200 hover:border-[#c4734a] transition-colors group"
                    >
                      <span className="font-semibold text-stone-800 group-hover:text-[#c4734a] transition-colors">
                        {l.label}
                      </span>
                      <span className="text-stone-400 group-hover:text-[#c4734a] transition-colors">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-8 bg-stone-900 text-white">
                <h3 className="font-bold text-xl mb-3">Хамтран ажиллах</h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  Зөөлөн хотын шийдэл НҮТББ-тай хамтрах, санхүүжилт, хандив өгөх болон бусад асуудлаар холбоо бариарай.
                </p>
                <a
                  href="mailto:info@softcity.mn"
                  className="inline-block px-6 py-3 font-semibold text-sm transition-colors"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  Имэйл илгээх
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
