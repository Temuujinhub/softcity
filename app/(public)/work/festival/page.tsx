import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Зөөлөн хот фестиваль | Зөөлөн хот",
};
export const dynamic = "force-dynamic";

export default async function FestivalPage() {
  const content = await getContent();

  return (
    <>
      <PageHeader
        label="Төсөл, хөтөлбөр"
        title="Зөөлөн хот фестиваль"
        intro={content.festival_intro}
        backHref="/work"
        backLabel="Бидний ажил"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          {/* 2026 */}
          <details open className="group border border-[#e7e2d9] bg-white" id="festival-2026">
            <summary className="flex items-center justify-between cursor-pointer list-none p-8 sm:p-10 select-none">
              <div className="flex items-baseline gap-6">
                <span className="text-4xl sm:text-6xl font-bold tracking-tight" style={{ color: "#c4734a" }}>
                  2026
                </span>
                <span className="text-lg sm:text-2xl font-semibold">Зөөлөн хот фестиваль 2026</span>
              </div>
              <span className="text-2xl text-[#8a8479] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-8 sm:px-10 pb-10 border-t border-[#e7e2d9] pt-8">
              <p className="text-lg text-[#55504a] leading-relaxed max-w-3xl mb-8">
                {content.festival_desc}
              </p>
              <p className="text-[#8a8479] mb-8">
                Хөтөлбөр, зочин илтгэгчдийн мэдээлэл удахгүй зарлагдана.
              </p>
              <Link
                href="/events"
                className="inline-block text-white px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#c4734a" }}
              >
                Бүртгүүлэх
              </Link>
            </div>
          </details>

          {/* 2025 */}
          <details className="group border border-[#e7e2d9] bg-white" id="festival-2025">
            <summary className="flex items-center justify-between cursor-pointer list-none p-8 sm:p-10 select-none">
              <div className="flex items-baseline gap-6">
                <span className="text-4xl sm:text-6xl font-bold tracking-tight text-[#c8beac]">2025</span>
                <span className="text-lg sm:text-2xl font-semibold">Зөөлөн хот фестиваль 2025</span>
              </div>
              <span className="text-2xl text-[#8a8479] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-8 sm:px-10 pb-10 border-t border-[#e7e2d9] pt-8">
              <p className="text-lg text-[#55504a] leading-relaxed max-w-3xl mb-10">
                {content.festival_desc}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#c4734a" }}>
                    Зочин илтгэгч
                  </h3>
                  <div className="border-l-2 pl-6" style={{ borderColor: "#c4734a" }}>
                    <h4 className="font-bold text-xl">Дэвид Сим (David Sim)</h4>
                    <p className="text-[#6b655c] mt-2 leading-relaxed">
                      Gehl Architects-ийн гүйцэтгэх захирал, <em>Soft City</em> номын зохиогч.
                      Дэлхийн 40 гаруй улсад хүний хэмжээний хот байгуулалтад ажилласан туршлагатай.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#c4734a" }}>
                    Хөтөлбөр
                  </h3>
                  <ul className="space-y-3 text-[#33302b]">
                    <li className="pb-3 border-b border-[#efe9de]">Мастер класс: Зөөлөн хотыг бүтээх нь — Дэвид Сим</li>
                    <li className="pb-3 border-b border-[#efe9de]">Нийтийн орон зайн дизайн практик</li>
                    <li className="pb-3 border-b border-[#efe9de]">Монголын хотын ирээдүйн талаарх хэлэлцүүлэг</li>
                    <li>Field trip — Улаанбаатар хотын нийтийн орон зайн судалгаа</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/gallery/festival-2025"
                  className="inline-block border border-[#141414] px-6 py-3 font-semibold text-sm hover:bg-[#141414] hover:text-white transition-colors"
                >
                  Зургийн цомог үзэх
                </Link>
                <Link
                  href="/members"
                  className="inline-block px-6 py-3 font-semibold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  Мастер классын бичлэг үзэх
                </Link>
              </div>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
