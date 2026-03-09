import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Орчуулгын үйлчилгээ | Зөөлөн хот" };

export default function TranslationPage() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">← Бидний ажил</Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>Зөвлөх үйлчилгээ</p>
          <h1 className="text-5xl sm:text-6xl font-bold">Орчуулгын үйлчилгээ</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              Хот байгуулалт, архитектур, нийтийн орон зайн чиглэлийн мэргэжлийн орчуулга.
            </p>
            <h2>Бид юу орчуулдаг вэ?</h2>
            <ul>
              <li>Хот байгуулалтын хууль, дүрэм, стандарт</li>
              <li>Архитектурын зохиол, судалгааны ажлууд</li>
              <li>Олон улсын байгууллагуудын материалууд</li>
              <li>Нийтийн орон зайн дизайны удирдамж</li>
            </ul>
            <p>Бид Монгол-Англи, Англи-Монгол орчуулга хийдэг.</p>
          </div>
          <div className="mt-8">
            <Link href="/contact" className="inline-block px-8 py-3 font-semibold text-white" style={{ backgroundColor: "#c4734a" }}>
              Захиалга өгөх
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
