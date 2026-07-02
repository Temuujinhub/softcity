import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Туршлага судлах аялал | Зөөлөн хот" };
export const dynamic = "force-dynamic";

const DESTINATION_IMAGES = [
  "https://images.unsplash.com/photo-1552560880-2482cef14240?w=1200&q=80",
  "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80",
];

export default async function StudyToursPage() {
  const content = await getContent();
  const destinations = content.tours_destinations.split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <>
      <PageHeader
        label="Зөвлөх үйлчилгээ"
        title="Туршлага судлах аялал"
        intro={content.tours_intro}
        backHref="/work"
        backLabel="Бидний ажил"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: "#c4734a" }}>
            Чиглэлүүд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((dest, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/2] overflow-hidden bg-stone-200 mb-5">
                  <img
                    src={DESTINATION_IMAGES[i % DESTINATION_IMAGES.length]}
                    alt={dest}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-bold text-xl">{dest}</h3>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10 border-t border-[#e7e2d9]">
            <p className="text-[#6b655c] mb-6 max-w-2xl">
              Аялалд оролцохыг хүсвэл эсвэл байгууллагын хэрэгцээнд тохируулсан аялал зохион
              байгуулах бол бидэнтэй холбоо бариарай.
            </p>
            <Link
              href="/contact"
              className="inline-block text-white px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#c4734a" }}
            >
              Холбоо барих
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
