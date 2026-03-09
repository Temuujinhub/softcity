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

interface Settings {
  hero_image_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_badge: string;
}

interface Props {
  articles: Article[];
  settings: Settings;
}

const EXTRA_SLIDES = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80",
];

const CATEGORY_LABELS: Record<string, string> = {
  interview: "Ярилцлага",
  publication: "Шинэ бүтээл",
  news: "Мэдээ",
};

const services = [
  {
    title: "Сургалт, арга хэмжээ зохион байгуулах",
    desc: "Хот байгуулалт, нийтийн орон зайн талаар мэдлэг олгох сургалт, семинар зохион байгуулна.",
    href: "/work/consulting/events",
  },
  {
    title: "Туршлага судлах аялал",
    desc: "Дэлхийн шилдэг жишээнүүдийг биечлэн судлах аяллыг зохион байгуулна.",
    href: "/work/consulting/study-tours",
  },
  {
    title: "Орчуулгын үйлчилгээ",
    desc: "Хот байгуулалт, архитектурын чиглэлийн мэргэжлийн орчуулга хийнэ.",
    href: "/work/consulting/translation",
  },
];

// ── IntersectionObserver hook ──────────────────────────────────────────────
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

// ── SVG pencil filter (applied globally once) ──────────────────────────────
function SketchDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// ── City skyline sketch ────────────────────────────────────────────────────
function SketchCityline({ drawn }: { drawn: boolean }) {
  const line = (delay = 0) => ({
    strokeDasharray: 1 as number,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 3.5s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  // Windows: scattered [x, y] pairs within buildings
  const windows = [
    [58,155],[70,155],[58,168],[70,168],
    [88,125],[100,125],[88,138],[100,138],
    [118,80],[130,80],[118,93],[130,93],[118,106],[130,106],
    [148,60],[160,60],[148,73],[160,73],[148,86],[160,86],
    [183,105],[195,105],[183,118],
    [228,80],[240,80],[228,93],[240,93],
    [258,60],[270,60],[258,73],[270,73],
    [283,40],[283,53],[295,40],[295,53],
    [358,100],[370,100],[358,113],[370,113],
    [383,75],[395,75],[383,88],[395,88],
    [413,53],[425,53],[413,66],[425,66],
    [508,65],[520,65],[508,78],[520,78],[508,91],
    [528,93],[540,93],[528,106],
    [608,70],[620,70],[608,83],[620,83],[608,96],
    [638,50],[650,50],[638,63],[650,63],[638,76],
    [718,60],[730,60],[718,73],[730,73],[718,86],
    [753,62],[765,62],[753,75],[765,75],
    [858,68],[870,68],[858,81],[870,81],
    [963,93],[975,93],[963,106],[975,106],
  ];

  return (
    <svg
      viewBox="0 0 1200 240"
      className="w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "url(#pencil)" }}
    >
      {/* Main skyline profile */}
      <polyline
        pathLength="1"
        style={line(0)}
        points="
          0,230 0,200 50,200 50,170 75,170 75,140 95,140 95,110
          115,110 115,88 135,88 135,68 150,68 150,50 165,50 165,68
          185,68 185,100 210,100 210,125 230,125 230,95 248,95
          248,72 265,72 265,52 280,52 280,35 295,35 295,52 315,52
          315,88 340,88 340,115 360,115 360,90 380,90 380,68
          400,68 400,48 415,48 415,68 435,68 435,100 458,100
          458,125 478,125 478,95 500,95 500,68 518,68 518,48
          535,48 535,68 558,68 558,100 578,100 578,125 600,125
          600,95 618,95 618,72 635,72 635,48 650,48 650,72
          672,72 672,105 692,105 692,128 710,128 710,95 728,95
          728,68 748,68 748,48 765,48 765,68 788,68 788,105
          808,105 808,128 828,128 828,105 848,105 848,80 865,80
          865,58 882,58 882,80 905,80 905,110 925,110 925,135
          948,135 948,108 968,108 968,82 985,82 985,108 1008,108
          1008,140 1028,140 1028,160 1048,160 1048,140 1070,140
          1070,118 1085,118 1085,140 1110,140 1110,165 1130,165
          1130,185 1155,185 1155,200 1200,200 1200,230
        "
      />

      {/* Ground line */}
      <line pathLength="1" style={line(0.3)} x1="0" y1="230" x2="1200" y2="230" />

      {/* Windows */}
      {windows.map(([x, y], i) => (
        <rect
          key={i}
          pathLength="1"
          style={line(0.5 + i * 0.012)}
          x={x}
          y={y}
          width="7"
          height="9"
        />
      ))}

      {/* Street trees */}
      {[180, 380, 600, 820, 1050].map((x, i) => (
        <g key={i}>
          <line pathLength="1" style={line(1 + i * 0.1)} x1={x} y1="230" x2={x} y2="212" />
          <ellipse pathLength="1" style={line(1.1 + i * 0.1)} cx={x} cy="205" rx="12" ry="15" />
        </g>
      ))}

      {/* Map grid lines at street level */}
      {[300, 600, 900].map((x, i) => (
        <line
          key={i}
          pathLength="1"
          style={{ ...line(1.5), opacity: 0.5 }}
          x1={x}
          y1="230"
          x2={x}
          y2="240"
          strokeDasharray="2 4"
        />
      ))}
    </svg>
  );
}

// ── People sketch ──────────────────────────────────────────────────────────
function SketchPeople({ drawn }: { drawn: boolean }) {
  const s = (delay = 0) => ({
    strokeDasharray: 1 as number,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 1.8s ease-in-out ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{ filter: "url(#pencil)" }}
    >
      {/* Person 1 */}
      <circle pathLength="1" style={s(0)} cx="20" cy="12" r="7" />
      <line pathLength="1" style={s(0.1)} x1="20" y1="19" x2="20" y2="46" />
      <line pathLength="1" style={s(0.15)} x1="20" y1="30" x2="9" y2="40" />
      <line pathLength="1" style={s(0.2)} x1="20" y1="30" x2="31" y2="38" />
      <line pathLength="1" style={s(0.25)} x1="20" y1="46" x2="13" y2="68" />
      <line pathLength="1" style={s(0.3)} x1="20" y1="46" x2="27" y2="66" />

      {/* Person 2 – carrying something */}
      <circle pathLength="1" style={s(0.2)} cx="75" cy="10" r="7" />
      <line pathLength="1" style={s(0.3)} x1="75" y1="17" x2="75" y2="45" />
      <line pathLength="1" style={s(0.35)} x1="75" y1="29" x2="63" y2="40" />
      <line pathLength="1" style={s(0.4)} x1="75" y1="29" x2="90" y2="37" />
      <rect pathLength="1" style={s(0.42)} x="87" y="32" width="10" height="12" rx="2" />
      <line pathLength="1" style={s(0.45)} x1="75" y1="45" x2="67" y2="66" />
      <line pathLength="1" style={s(0.5)} x1="75" y1="45" x2="83" y2="64" />

      {/* Person 3 – smaller */}
      <circle pathLength="1" style={s(0.4)} cx="130" cy="16" r="5.5" />
      <line pathLength="1" style={s(0.45)} x1="130" y1="22" x2="130" y2="44" />
      <line pathLength="1" style={s(0.5)} x1="130" y1="31" x2="121" y2="40" />
      <line pathLength="1" style={s(0.55)} x1="130" y1="31" x2="139" y2="38" />
      <line pathLength="1" style={s(0.6)} x1="130" y1="44" x2="123" y2="62" />
      <line pathLength="1" style={s(0.65)} x1="130" y1="44" x2="137" y2="60" />

      {/* Person 4 */}
      <circle pathLength="1" style={s(0.5)} cx="178" cy="12" r="7" />
      <line pathLength="1" style={s(0.55)} x1="178" y1="19" x2="178" y2="46" />
      <line pathLength="1" style={s(0.6)} x1="178" y1="31" x2="166" y2="41" />
      <line pathLength="1" style={s(0.65)} x1="178" y1="31" x2="190" y2="40" />
      <line pathLength="1" style={s(0.7)} x1="178" y1="46" x2="170" y2="67" />
      <line pathLength="1" style={s(0.75)} x1="178" y1="46" x2="186" y2="65" />
    </svg>
  );
}

// ── Bicycle sketch ─────────────────────────────────────────────────────────
function SketchBicycle({ drawn }: { drawn: boolean }) {
  const s = (delay = 0) => ({
    strokeDasharray: 1 as number,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 2.2s ease-in-out ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 110 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{ filter: "url(#pencil)" }}
    >
      <circle pathLength="1" style={s(0)} cx="24" cy="43" r="19" />
      <circle pathLength="1" style={s(0.1)} cx="86" cy="43" r="19" />
      <circle pathLength="1" style={s(0.3)} cx="24" cy="43" r="3" />
      <circle pathLength="1" style={s(0.3)} cx="86" cy="43" r="3" />
      <path pathLength="1" style={s(0.1)} d="M24,43 L50,18 L76,18 L86,43" />
      <path pathLength="1" style={s(0.15)} d="M50,18 L57,43" />
      <path pathLength="1" style={s(0.2)} d="M73,18 L73,10 L82,10" />
      <path pathLength="1" style={s(0.25)} d="M44,18 L37,18" />
    </svg>
  );
}

// ── Architect compass sketch ───────────────────────────────────────────────
function SketchCompass({ drawn }: { drawn: boolean }) {
  const s = (delay = 0) => ({
    strokeDasharray: 1 as number,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 2.5s ease-in-out ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 90 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "url(#pencil)" }}
    >
      <circle pathLength="1" style={s(0)} cx="45" cy="14" r="7" />
      <line pathLength="1" style={s(0.1)} x1="45" y1="21" x2="22" y2="95" />
      <path pathLength="1" style={s(0.15)} d="M20,92 L18,108 L25,100 Z" />
      <line pathLength="1" style={s(0.1)} x1="45" y1="21" x2="70" y2="90" />
      <path pathLength="1" style={s(0.2)} d="M67,86 L74,92 L68,100 L64,90 Z" />
      <line pathLength="1" style={s(0.3)} x1="30" y1="62" x2="62" y2="57" />
      <path pathLength="1" style={{ ...s(0.4), strokeDasharray: "3 4" as unknown as number }}
        d="M18,108 Q45,118 68,100" />
    </svg>
  );
}

// ── Bench + tree sketch ────────────────────────────────────────────────────
function SketchBenchTree({ drawn }: { drawn: boolean }) {
  const s = (delay = 0) => ({
    strokeDasharray: 1 as number,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 2s ease-in-out ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 170 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "url(#pencil)" }}
    >
      {/* Bench seat */}
      <rect pathLength="1" style={s(0)} x="8" y="62" width="85" height="9" rx="2" />
      {/* Bench back */}
      <rect pathLength="1" style={s(0.1)} x="8" y="52" width="85" height="7" rx="2" />
      {/* Bench legs */}
      <line pathLength="1" style={s(0.2)} x1="20" y1="71" x2="17" y2="90" />
      <line pathLength="1" style={s(0.2)} x1="81" y1="71" x2="84" y2="90" />
      <line pathLength="1" style={s(0.25)} x1="40" y1="71" x2="38" y2="90" />
      <line pathLength="1" style={s(0.25)} x1="61" y1="71" x2="63" y2="90" />
      {/* Ground */}
      <line pathLength="1" style={s(0.5)} x1="0" y1="90" x2="170" y2="90" />
      {/* Tree trunk */}
      <line pathLength="1" style={s(0.1)} x1="132" y1="90" x2="132" y2="58" />
      {/* Tree canopy layers */}
      <ellipse pathLength="1" style={s(0.2)} cx="132" cy="45" rx="24" ry="28" />
      <ellipse pathLength="1" style={s(0.3)} cx="118" cy="52" rx="14" ry="18" />
      <ellipse pathLength="1" style={s(0.35)} cx="146" cy="50" rx="13" ry="16" />
    </svg>
  );
}

// ── Main HomeClient ────────────────────────────────────────────────────────
export default function HomeClient({ articles, settings }: Props) {
  const slides = [settings.hero_image_url, ...EXTRA_SLIDES];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Scroll animation refs
  const [missionRef, missionInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [sketchCityRef, sketchCityInView] = useInView(0.05);
  const [festivalRef, festivalInView] = useInView();
  const [newsRef, newsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      <SketchDefs />

      {/* ── HERO SLIDESHOW ──────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ height: "100svh", minHeight: 600, backgroundColor: "#111" }}
      >
        {/* Slides — crossfade */}
        {slides.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === currentSlide ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: i === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.52 }}
            />
          </div>
        ))}

        {/* Dark gradient at bottom for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div className="relative h-full flex items-center" style={{ zIndex: 3 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
            <div className="max-w-2xl">
              <p
                className="text-xs font-semibold tracking-[0.35em] uppercase text-stone-300 mb-6"
                style={{ opacity: 0.85 }}
              >
                {settings.hero_badge}
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight">
                {settings.hero_title}
              </h1>
              <p className="text-lg sm:text-xl text-stone-200 leading-relaxed mb-12 max-w-lg opacity-90">
                {settings.hero_subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/story"
                  className="bg-white text-stone-900 px-8 py-3.5 font-semibold hover:bg-stone-100 transition-colors text-sm tracking-wide"
                >
                  Бидний тухай
                </Link>
                <Link
                  href="/work"
                  className="border border-white/50 text-white px-8 py-3.5 font-semibold hover:bg-white/10 transition-colors text-sm tracking-wide"
                >
                  Бидний ажил
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide dot indicators */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3"
          style={{ zIndex: 4 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Слайд ${i + 1}`}
              style={{
                width: i === currentSlide ? 32 : 20,
                height: 2,
                backgroundColor:
                  i === currentSlide ? "white" : "rgba(255,255,255,0.35)",
                transition: "all 0.4s ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-3"
          style={{ zIndex: 4 }}
        >
          <span
            className="text-white/40 text-xs tracking-[0.3em] uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            scroll
          </span>
          <div className="w-px h-14 bg-white/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full bg-white/60 scroll-line-anim" style={{ height: "45%" }} />
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ───────────────────────────────────────────── */}
      <section ref={missionRef} style={{ backgroundColor: "#c4734a" }} className="py-20 overflow-hidden">
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: missionInView ? 1 : 0,
            transform: missionInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="text-white/20 text-9xl font-serif leading-none select-none mb-0 -mb-4">"</div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white">
            Хот бол зөвхөн барилга, зам биш —{" "}
            <em className="not-italic font-normal opacity-80">
              хүмүүс амьдарч, уулздаг орон зай юм.
            </em>
          </p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-white/25" />
            <span className="text-white/55 text-xs tracking-[0.3em] uppercase">Зөөлөн хот</span>
            <div className="h-px w-16 bg-white/25" />
          </div>
        </div>
      </section>

      {/* ── SERVICES + SKETCH DECORATIONS ───────────────────────────── */}
      <section
        ref={servicesRef}
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        {/* City skyline sketch background */}
        <div
          ref={sketchCityRef}
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ color: "#7a6a55", opacity: 0.09 }}
        >
          <SketchCityline drawn={sketchCityInView} />
        </div>

        {/* Corner decorations — visible on wide screens */}
        <div
          className="absolute right-6 top-16 pointer-events-none hidden xl:block"
          style={{ width: 100, color: "#6b5a44", opacity: 0.22 }}
        >
          <SketchCompass drawn={servicesInView} />
        </div>
        <div
          className="absolute right-28 bottom-20 pointer-events-none hidden xl:block"
          style={{ width: 110, color: "#6b5a44", opacity: 0.22 }}
        >
          <SketchBicycle drawn={servicesInView} />
        </div>
        <div
          className="absolute left-6 bottom-28 pointer-events-none hidden xl:block"
          style={{ width: 90, color: "#6b5a44", opacity: 0.18 }}
        >
          <SketchPeople drawn={servicesInView} />
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            opacity: servicesInView ? 1 : 0,
            transform: servicesInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="mb-14">
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#c4734a" }}
            >
              Үйлчилгээ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900">
              Зөвлөх үйлчилгээ
            </h2>
            <div className="w-12 h-1 mt-4" style={{ backgroundColor: "#c4734a" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group p-8 border bg-white/50 hover:bg-white hover:border-[#c4734a] transition-all duration-300"
                style={{
                  borderColor: "#d5c9b8",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Decorative line */}
                <div className="w-8 h-px mb-6 bg-stone-400 group-hover:bg-[#c4734a] transition-colors" />
                <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#c4734a] transition-colors leading-snug">
                  {svc.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{svc.desc}</p>
                <span
                  className="inline-block mt-6 text-sm font-semibold"
                  style={{ color: "#c4734a" }}
                >
                  Дэлгэрэнгүй →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FESTIVAL — charcoal dark ─────────────────────────────────── */}
      <section
        ref={festivalRef}
        className="py-24 overflow-hidden"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            opacity: festivalInView ? 1 : 0,
            transform: festivalInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: "#c4734a" }}
              >
                Тэмдэглэлт арга хэмжээ
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Зөөлөн хот
                <br />
                фестиваль 2025
              </h2>
              <p className="text-stone-400 leading-relaxed mb-10 text-lg max-w-md">
                Монголын анхны хот байгуулалт, нийтийн орон зайн фестиваль.
                Дэлхийн тэргүүлэх мэргэжилтнүүд, Монголын идэвхтэн иргэд нэг дороо.
              </p>
              <Link
                href="/work/projects/festival-2025"
                className="inline-block border text-white px-8 py-3.5 font-semibold hover:bg-white hover:text-stone-900 transition-all duration-300 text-sm tracking-wide"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                Дэлгэрэнгүй
              </Link>
            </div>
            <div className="aspect-video bg-stone-800 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1280&q=80"
                alt="Зөөлөн хот фестиваль 2025"
                className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-500"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, #1a1a1a 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS — white ──────────────────────────────────────── */}
      {articles.length > 0 && (
        <section ref={newsRef} className="py-24 bg-white">
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{
              opacity: newsInView ? 1 : 0,
              transform: newsInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div className="flex justify-between items-end mb-14">
              <div>
                <p
                  className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#c4734a" }}
                >
                  Мэдээлэл
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-stone-900">
                  Сүүлийн мэдээ
                </h2>
                <div className="w-12 h-1 mt-4" style={{ backgroundColor: "#c4734a" }} />
              </div>
              <Link
                href="/news"
                className="text-sm font-semibold hover:underline"
                style={{ color: "#c4734a" }}
              >
                Бүгдийг үзэх →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((a, i) => (
                <Link
                  key={a.id}
                  href={`/news/${a.slug}`}
                  className="group"
                  style={{
                    opacity: newsInView ? 1 : 0,
                    transform: newsInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
                  }}
                >
                  <div className="aspect-video bg-stone-100 mb-5 overflow-hidden">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: "#f5f0e8" }}
                      >
                        <div style={{ width: 80, color: "#a09080", opacity: 0.5 }}>
                          <SketchBenchTree drawn={newsInView} />
                        </div>
                      </div>
                    )}
                  </div>
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: "#c4734a" }}
                  >
                    {CATEGORY_LABELS[a.category] || a.category}
                  </span>
                  <h3 className="font-bold text-xl text-stone-900 mt-2 group-hover:text-[#c4734a] transition-colors leading-snug">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="text-stone-500 text-sm mt-2 line-clamp-2">{a.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PARTNER CTA — warm dark + sketches ──────────────────────── */}
      <section
        ref={ctaRef}
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#2a1f14" }}
      >
        {/* Decorative sketches */}
        <div
          className="absolute right-12 bottom-6 pointer-events-none hidden lg:block"
          style={{ width: 200, color: "#a08060", opacity: 0.15 }}
        >
          <SketchBenchTree drawn={ctaInView} />
        </div>
        <div
          className="absolute left-12 top-10 pointer-events-none hidden lg:block"
          style={{ width: 75, color: "#a08060", opacity: 0.14 }}
        >
          <SketchPeople drawn={ctaInView} />
        </div>
        <div
          className="absolute left-40 bottom-12 pointer-events-none hidden 2xl:block"
          style={{ width: 90, color: "#a08060", opacity: 0.12 }}
        >
          <SketchBicycle drawn={ctaInView} />
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#c4734a" }}
          >
            Хамтран ажиллах
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight max-w-3xl mx-auto">
            Зөөлөн хотын шийдэл НҮТББ-тай хамтран ажиллах
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Бид хотын эрх баригчид, иргэний нийгмийн байгууллагууд, хувийн
            хэвшлийн байгууллагуудтай хамтран ажилладаг.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white px-10 py-4 font-semibold hover:opacity-90 transition-opacity text-sm tracking-wide"
            style={{ backgroundColor: "#c4734a" }}
          >
            Холбоо барих
          </Link>
        </div>
      </section>
    </>
  );
}
