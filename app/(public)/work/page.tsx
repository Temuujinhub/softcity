import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Бидний ажил | Зөөлөн хот",
};
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const content = await getContent();

  const sections = [
    {
      label: "Төсөл, хөтөлбөр",
      title: "Зөөлөн хот фестиваль",
      desc: content.festival_intro,
      href: "/work/festival",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    },
    {
      label: "Уулзалт",
      title: "Зөөлөн хот уулзалт, ярилцлага",
      desc: content.meetings_intro,
      href: "/work/meetings",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    },
    {
      label: "Зөвлөх үйлчилгээ",
      title: "Чадавх бэхжүүлэх сургалт",
      desc: content.training_intro,
      href: "/work/training",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    },
    {
      label: "Зөвлөх үйлчилгээ",
      title: "Туршлага судлах аялал",
      desc: content.tours_intro,
      href: "/work/study-tours",
      image: "https://images.unsplash.com/photo-1552560880-2482cef14240?w=1200&q=80",
    },
    {
      label: "Зөвлөх үйлчилгээ",
      title: "Орчуулгын үйлчилгээ",
      desc: content.translation_intro,
      href: "/work/translation",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80",
    },
  ];

  return (
    <>
      <PageHeader label="Үйл ажиллагаа" title="Бидний ажил" />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {sections.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-[#e7e2d9] items-center"
            >
              <div className="md:col-span-1 text-[#c8beac] font-semibold text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-4 aspect-[3/2] overflow-hidden bg-stone-200">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="md:col-span-7">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#c4734a" }}>
                  {s.label}
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight group-hover:text-[#c4734a] transition-colors">
                  {s.title}
                </h2>
                <p className="text-[#6b655c] mt-4 leading-relaxed max-w-2xl">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
