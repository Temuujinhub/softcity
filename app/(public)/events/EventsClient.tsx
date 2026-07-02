"use client";

import { useState } from "react";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  dateText: string | null;
  year: number;
  confirmed: boolean;
  registrationOpen: boolean;
}

interface Props {
  events: EventItem[];
}

export default function EventsClient({ events }: Props) {
  const [openEvent, setOpenEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const years = [...new Set(events.map((e) => e.year))].sort();

  function openRegistration(e: EventItem) {
    setOpenEvent(e);
    setStatus("idle");
    setErrorMsg("");
    setForm({ name: "", email: "", phone: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!openEvent) return;
    setStatus("loading");
    setErrorMsg("");
    const res = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: openEvent.id, ...form }),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.");
      setStatus("error");
    }
  }

  if (events.length === 0) {
    return (
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 text-center text-[#8a8479]">
          Одоогоор зарлагдсан арга хэмжээ байхгүй байна.
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {years.map((year) => (
            <div key={year} className="mb-16">
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8" style={{ color: "#e2d9c8" }}>
                {year}
              </h2>
              <div className="border-t border-[#e7e2d9]">
                {events
                  .filter((e) => e.year === year)
                  .map((event) => {
                    const clickable = event.registrationOpen;
                    return (
                      <div
                        key={event.id}
                        onClick={clickable ? () => openRegistration(event) : undefined}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-[#e7e2d9] items-baseline ${
                          clickable ? "cursor-pointer group" : ""
                        }`}
                      >
                        <div className="md:col-span-3 text-sm text-[#8a8479]">
                          {[event.dateText, event.location].filter(Boolean).join(" · ") || "Тов гараагүй"}
                        </div>
                        <div className="md:col-span-6">
                          <h3
                            className={`text-xl sm:text-2xl transition-colors ${
                              event.confirmed
                                ? "font-bold text-[#141414]"
                                : "font-normal text-[#8a8479]"
                            } ${clickable ? "group-hover:text-[#c4734a]" : ""}`}
                          >
                            {event.title}
                          </h3>
                          {event.description && (
                            <p className="text-sm text-[#6b655c] mt-2 leading-relaxed max-w-xl">
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-3 md:text-right">
                          {event.registrationOpen ? (
                            <button
                              onClick={(ev) => {
                                ev.stopPropagation();
                                openRegistration(event);
                              }}
                              className="text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: "#c4734a" }}
                            >
                              Бүртгүүлэх
                            </button>
                          ) : (
                            <span className="text-xs font-semibold tracking-wider uppercase text-[#c8beac]">
                              {event.confirmed ? "Бүртгэл удахгүй" : "Тов гараагүй"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration modal */}
      {openEvent && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(20,20,20,0.6)" }}
          onClick={() => setOpenEvent(null)}
        >
          <div
            className="bg-[#faf9f6] w-full max-w-md p-8 sm:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenEvent(null)}
              className="absolute top-4 right-4 text-2xl text-[#8a8479] hover:text-[#141414]"
              aria-label="Хаах"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-3">Амжилттай бүртгэгдлээ!</h3>
                <p className="text-[#6b655c] text-sm">
                  «{openEvent.title}» арга хэмжээний дэлгэрэнгүй мэдээллийг таны имэйл хаяг руу илгээх болно.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#c4734a" }}>
                  Бүртгүүлэх
                </p>
                <h3 className="text-2xl font-bold mb-2 leading-snug">{openEvent.title}</h3>
                <p className="text-sm text-[#8a8479] mb-8">
                  {[openEvent.dateText, openEvent.location].filter(Boolean).join(" · ")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                      {errorMsg}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Нэр *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#d5cec2] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#c4734a] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Имэйл *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#d5cec2] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#c4734a] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Утас</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-[#d5cec2] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#c4734a] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 font-semibold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: "#c4734a" }}
                  >
                    {status === "loading" ? "Бүртгэж байна..." : "Бүртгүүлэх"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
