import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Зөөлөн хот фестиваль 2026 | Зөөлөн хот",
};

export default function Festival2026Page() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">
            ← Бидний ажил
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Төсөл, хөтөлбөр
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Зөөлөн хот фестиваль 2026</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-20">
            <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: "#c4734a" }} />
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Удахгүй</h2>
            <p className="text-stone-600 leading-relaxed max-w-md mx-auto">
              Зөөлөн хот фестиваль 2026-ын мэдээлэл удахгүй гарна. Мэдэгдэл авахын тулд мейлээ бүртгүүлнэ үү.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 px-8 py-3 font-semibold text-white transition-colors"
              style={{ backgroundColor: "#c4734a" }}
            >
              Мэдэгдэл авах
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
