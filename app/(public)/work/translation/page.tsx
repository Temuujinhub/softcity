import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Орчуулгын үйлчилгээ | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function TranslationPage() {
  const content = await getContent();
  const blocks = content.translation_items.split("\n\n");
  const items = blocks[0].split("\n").map((s) => s.trim()).filter(Boolean);
  const note = blocks.slice(1).join("\n\n").trim();

  return (
    <>
      <PageHeader
        label="Зөвлөх үйлчилгээ"
        title="Орчуулгын үйлчилгээ"
        intro={content.translation_intro}
        backHref="/work"
        backLabel="Бидний ажил"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: "#c4734a" }}>
            Бид юу орчуулдаг вэ?
          </h2>
          <div className="max-w-3xl">
            {items.map((item, i) => (
              <div key={i} className="flex items-baseline gap-6 py-5 border-b border-[#e7e2d9]">
                <span className="text-[#c8beac] font-semibold text-sm shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg sm:text-xl font-medium">{item}</p>
              </div>
            ))}
          </div>
          {note && <p className="mt-10 text-[#6b655c] text-lg max-w-2xl">{note}</p>}
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block text-white px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#c4734a" }}
            >
              Орчуулга захиалах
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
