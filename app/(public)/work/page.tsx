import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бидний ажил | Зөөлөн хот",
};

const categories = [
  {
    title: "Төсөл, хөтөлбөр",
    items: [
      { label: "Зөөлөн хот фестиваль 2025", href: "/work/projects/festival-2025", desc: "Монголын анхны хот байгуулалт, нийтийн орон зайн фестиваль" },
      { label: "Зөөлөн хот фестиваль 2026", href: "/work/projects/festival-2026", desc: "2026 оны фестивалийн мэдээлэл удахгүй" },
    ],
  },
  {
    title: "Сургалт, семинар",
    items: [
      { label: "Зөөлөн хот уулзалт, ярилцлага", href: "/work/training/meetings", desc: "Хот байгуулалтын сэдвээр зохион байгуулж буй уулзалт, ярилцлагууд" },
    ],
  },
  {
    title: "Зөвлөх үйлчилгээ",
    items: [
      { label: "Сургалт, арга хэмжээ зохион байгуулах", href: "/work/consulting/events", desc: "Байгууллага, нийгэмлэгт зориулсан сургалт, семинар" },
      { label: "Туршлага судлах аялал", href: "/work/consulting/study-tours", desc: "Дэлхийн шилдэг хот байгуулалтын туршлагыг биечлэн судлах аялал" },
      { label: "Орчуулгын үйлчилгээ", href: "/work/consulting/translation", desc: "Хот байгуулалт, архитектурын чиглэлийн мэргэжлийн орчуулга" },
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Үйл ажиллагаа
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Бидний ажил</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat, i) => (
            <div key={cat.title} className={i > 0 ? "mt-20" : ""}>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{cat.title}</h2>
                <div className="w-10 h-1" style={{ backgroundColor: "#c4734a" }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group p-8 bg-white border border-stone-200 hover:border-[#c4734a] transition-colors"
                  >
                    <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#c4734a] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                    <span className="inline-block mt-4 text-sm font-semibold" style={{ color: "#c4734a" }}>
                      Дэлгэрэнгүй →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
