"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  coverImage: string | null;
  publishedAt: Date | null;
}

interface EventItem {
  id: string;
  title: string;
  dateText: string | null;
  location: string | null;
  year: number;
  confirmed: boolean;
  registrationOpen: boolean;
}

interface Props {
  articles: Article[];
  events: EventItem[];
  content: Record<string, string>;
  slides: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

const WORK_AREAS = [
  {
    title: "Зөөлөн хот фестиваль",
    desc: "Мэргэжилтнүүд, судлаачид, олон нийтийг нэгтгэсэн хот байгуулалтын фестиваль",
    href: "/work/festival",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80",
  },
  {
    title: "Уулзалт, ярилцлага",
    desc: "Хотын хөгжлийн асуудлыг олон талаас хэлэлцэх нээлттэй уулзалтууд",
    href: "/work/meetings",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&q=80",
  },
  {
    title: "Чадавх бэхжүүлэх сургалт",
    desc: "Байгууллагын хэрэгцээнд тохирсон хот байгуулалтын сургалт, семинар",
    href: "/work/training",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&q=80",
  },
  {
    title: "Туршлага судлах аялал",
    desc: "Хойд Европын хүн төвтэй хотуудын туршлагаас суралцах аялал",
    href: "/work/study-tours",
    image: "https://images.unsplash.com/photo-1552560880-2482cef14240?w=1000&q=80",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const reveal = (inView: boolean, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
});

export default function HomeClient({ articles, events, content, slides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [quoteRef, quoteInView] = useInView();
  const [workRef, workInView] = useInView(0.08);
  const [eventsRef, eventsInView] = useInView();
  const [newsRef, newsInView] = useInView();
  const [membersRef, membersInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ height: "100svh", minHeight: 640, backgroundColor: "#111" }}
      >
        {slides.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === currentSlide ? 1 : 0,
              transition: "opacity 1.4s ease-in-out",
              zIndex: i === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: i === currentSlide ? "scale(1.04)" : "scale(1)",
                transition: "transform 7s ease-out, opacity 1.4s ease-in-out",
              }}
            />
          </div>
        ))}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.35) 100%)",
            zIndex: 2,
          }}
        />

        <div className="relative h-full flex items-end" style={{ zIndex: 3 }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full pb-24 sm:pb-28">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-white/70 mb-6">
                {content.hero_badge}
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-[92px] font-bold leading-[0.98] mb-8 tracking-tight">
                {content.hero_title}
              </h1>
              <p className="text-lg sm:text-2xl text-white/85 leading-snug mb-10 max-w-2xl font-light">
                {content.hero_subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/work"
                  className="bg-white text-[#141414] px-8 py-4 font-semibold hover:bg-[#c4734a] hover:text-white transition-colors text-sm"
                >
                  Бидний ажил
                </Link>
                <Link
                  href="/events"
                  className="border border-white/60 text-white px-8 py-4 font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  Арга хэмжээнд бүртгүүлэх
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-10 right-8 lg:right-12 flex gap-3" style={{ zIndex: 4 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Слайд ${i + 1}`}
                style={{
                  width: i === currentSlide ? 36 : 20,
                  height: 2,
                  backgroundColor: i === currentSlide ? "white" : "rgba(255,255,255,0.35)",
                  transition: "all 0.4s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── STATEMENT ──────────────────────────────────────────────── */}
      <section ref={quoteRef} className="py-28 sm:py-36 bg-[#faf9f6]">
        <div
          className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12"
          style={reveal(quoteInView)}
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-10" style={{ color: "#c4734a" }}>
            Бидний итгэл үнэмшил
          </p>
          <p className="text-3xl sm:text-5xl lg:text-[56px] font-medium leading-[1.15] tracking-tight text-[#141414] max-w-5xl">
            {content.home_quote}
          </p>
        </div>
      </section>

      {/* ── WORK GRID ──────────────────────────────────────────────── */}
      <section ref={workRef} className="pb-28 bg-[#faf9f6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-12 border-t border-[#e7e2d9] pt-10" style={reveal(workInView)}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Бидний ажил</h2>
            <Link href="/work" className="text-sm font-semibold hover:underline" style={{ color: "#c4734a" }}>
              Бүгдийг үзэх →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_AREAS.map((area, i) => (
              <Link key={area.href} href={area.href} className="group" style={reveal(workInView, i * 100)}>
                <div className="aspect-[4/5] overflow-hidden bg-stone-200 mb-5">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-bold text-lg leading-snug group-hover:text-[#c4734a] transition-colors">
                  {area.title}
                </h3>
                <p className="text-[#6b655c] text-sm mt-2 leading-relaxed">{area.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS / REGISTRATION ──────────────────────────────────── */}
      {events.length > 0 && (
        <section ref={eventsRef} className="py-24 bg-[#141414] text-white">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12" style={reveal(eventsInView)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#c4734a" }}>
                  Арга хэмжээ
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                  {content.home_events_title}
                </h2>
                <p className="text-[#b5afa5] leading-relaxed mb-8">{content.home_events_subtitle}</p>
                <Link
                  href="/events"
                  className="inline-block bg-white text-[#141414] px-7 py-3.5 font-semibold hover:bg-[#c4734a] hover:text-white transition-colors text-sm"
                >
                  Бүх арга хэмжээ үзэх
                </Link>
              </div>
              <div className="lg:col-span-8">
                {events.map((e, i) => (
                  <Link
                    key={e.id}
                    href="/events"
                    className="flex items-baseline justify-between gap-6 py-6 border-b border-[#2b2823] group"
                    style={reveal(eventsInView, i * 80)}
                  >
                    <div>
                      <h3
                        className={`text-lg sm:text-2xl group-hover:text-[#c4734a] transition-colors ${
                          e.confirmed ? "font-bold text-white" : "font-normal text-[#8a8479]"
                        }`}
                      >
                        {e.title}
                      </h3>
                      <p className="text-sm text-[#6b655c] mt-1">
                        {[e.dateText, e.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold" style={{ color: "#c4734a" }}>
                      {e.registrationOpen ? "Бүртгүүлэх →" : e.confirmed ? "Дэлгэрэнгүй →" : "Тов гараагүй"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── NEWS ───────────────────────────────────────────────────── */}
      {articles.length > 0 && (
        <section ref={newsRef} className="py-28 bg-[#faf9f6]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12" style={reveal(newsInView)}>
            <div className="flex justify-between items-end mb-12 border-t border-[#e7e2d9] pt-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Сүүлийн мэдээ</h2>
              <Link href="/news" className="text-sm font-semibold hover:underline" style={{ color: "#c4734a" }}>
                Бүгдийг үзэх →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((a, i) => (
                <Link key={a.id} href={`/news/${a.slug}`} className="group" style={reveal(newsInView, i * 100)}>
                  <div className="aspect-[3/2] bg-stone-200 mb-5 overflow-hidden">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#efe9de]" />
                    )}
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c4734a" }}>
                    {CATEGORY_LABELS[a.category] || a.category}
                  </span>
                  <h3 className="font-bold text-xl mt-2 group-hover:text-[#c4734a] transition-colors leading-snug">
                    {a.title}
                  </h3>
                  {a.excerpt && <p className="text-[#6b655c] text-sm mt-2 line-clamp-2">{a.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MASTERCLASS / MEMBERSHIP ───────────────────────────────── */}
      <section ref={membersRef} className="py-24" style={{ backgroundColor: "#c4734a" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12" style={reveal(membersInView)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-5">
                Гишүүнчлэл
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                {content.home_members_title}
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-lg">
                {content.home_members_text}
              </p>
              <Link
                href="/members"
                className="inline-block bg-white text-[#141414] px-8 py-4 font-semibold hover:bg-[#141414] hover:text-white transition-colors text-sm"
              >
                Имэйлээр бүртгүүлж үзэх
              </Link>
            </div>
            <div className="aspect-video bg-black/20 overflow-hidden hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80"
                alt="Masterclass"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-32 bg-[#faf9f6]">
        <div
          className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 text-center"
          style={reveal(ctaInView)}
        >
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-10 max-w-3xl mx-auto leading-[1.05]">
            {content.home_cta_title}
          </h2>
          <Link
            href="/contact"
            className="inline-block text-white px-10 py-4 font-semibold hover:opacity-90 transition-opacity text-sm"
            style={{ backgroundColor: "#141414" }}
          >
            Холбоо барих
          </Link>
        </div>
      </section>
    </>
  );
}
