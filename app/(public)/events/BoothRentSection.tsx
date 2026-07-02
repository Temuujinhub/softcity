"use client";

import { useState } from "react";

interface Props {
  title: string;
  intro: string;
  mapUrl: string;
}

const EMPTY_FORM = { boothNumber: "", orgName: "", phone: "", email: "", message: "" };

export default function BoothRentSection({ title, intro, mapUrl }: Props) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const res = await fetch("/api/booth-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      setStatus("error");
    }
  }

  return (
    <section id="booth-rent" className="py-20 sm:py-24 bg-[#141414] text-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#c4734a" }}>
          Талбай түрээс
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{title}</h2>
        <p className="text-[#b5afa5] leading-relaxed max-w-2xl mb-12">{intro}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Floor plan */}
          <div className="lg:col-span-7">
            <div className="bg-white overflow-hidden">
              <img src={mapUrl} alt="Үзэсгэлэнгийн талбайн зураглал" className="w-full h-auto" />
            </div>
            <p className="text-xs text-[#8a8479] mt-3">
              Зураглалаас сонирхсон талбайнхаа дугаарыг сонгож хүсэлтийн маягтад бичнэ үү.
            </p>
          </div>

          {/* Request form */}
          <div className="lg:col-span-5">
            {status === "success" ? (
              <div className="border border-[#4a463f] p-10 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-3">Хүсэлт хүлээн авлаа!</h3>
                <p className="text-[#b5afa5] text-sm leading-relaxed">
                  Манай ажилтан таны өгсөн утас, имэйлээр эргэж холбогдож захиалгыг
                  баталгаажуулах болно.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 text-sm">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Сонирхож буй талбайн дугаар *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.boothNumber}
                    onChange={(e) => setForm({ ...form, boothNumber: e.target.value })}
                    placeholder="ж: C2 эсвэл A1, A2"
                    className="w-full bg-transparent border border-[#4a463f] text-white placeholder-[#6b655c] px-3.5 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Байгууллагын эсвэл төслийн нэр *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.orgName}
                    onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                    className="w-full bg-transparent border border-[#4a463f] text-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Эргэж холбогдох утас *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+976 ..."
                      className="w-full bg-transparent border border-[#4a463f] text-white placeholder-[#6b655c] px-3.5 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Имэйл *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border border-[#4a463f] text-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Нэмэлт мэдээлэл</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="Юу танилцуулах гэж байгаа, тусгай хэрэгцээ гэх мэт"
                    className="w-full bg-transparent border border-[#4a463f] text-white placeholder-[#6b655c] px-3.5 py-2.5 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 font-semibold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  {status === "loading" ? "Илгээж байна..." : "Түрээсийн хүсэлт илгээх"}
                </button>
                <p className="text-xs text-[#6b655c]">
                  Хүсэлт илгээснээр захиалга шууд баталгаажихгүй — манай ажилтан эргэж
                  холбогдож баталгаажуулна.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
