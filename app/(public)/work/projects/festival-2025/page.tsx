import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Зөөлөн хот фестиваль 2025 | Зөөлөн хот",
};

export default function Festival2025Page() {
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
          <h1 className="text-5xl sm:text-6xl font-bold">Зөөлөн хот фестиваль 2025</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              Монголын анхны хот байгуулалт, нийтийн орон зайн фестиваль. Дэлхийн тэргүүлэх мэргэжилтнүүдтэй уулзаж, Монголын хотын ирээдүйг хамтдаа бодолцоно.
            </p>

            <h2>Тухай</h2>
            <p>
              Зөөлөн хот фестиваль 2025 нь хот байгуулалт, архитектур, нийтийн орон зайн талаар мэдлэг, туршлага солилцох платформ юм.
            </p>

            <h2>Зочин илтгэгчид</h2>
            <div className="bg-stone-50 p-6 border-l-4" style={{ borderColor: "#c4734a" }}>
              <h3 className="mt-0">Дэвид Сим (David Sim)</h3>
              <p className="text-stone-600">
                Gehl Architects-ийн гүйцэтгэх захирал, <em>Soft City</em> номын зохиогч. Дэлхийн 40 гаруй улсад хүний хэмжээний хот байгуулалтад ажилласан туршлагатай.
              </p>
            </div>

            <h2>Хөтөлбөр</h2>
            <ul>
              <li>Мастер класс: Зөөлөн хотыг бүтээх нь — Дэвид Сим</li>
              <li>Нийтийн орон зайн дизайн практик</li>
              <li>Монголын хотын ирээдүйн талаарх хэлэлцүүлэг</li>
              <li>Field trip — Улаанбаатар хотын нийтийн орон зайн судалгаа</li>
            </ul>
          </div>

          <div className="mt-12 pt-12 border-t border-stone-200">
            <Link
              href="/gallery/festival-2025"
              className="inline-block border border-stone-900 text-stone-900 px-6 py-3 font-semibold hover:bg-stone-900 hover:text-white transition-colors mr-4"
            >
              Зургийн цомог үзэх
            </Link>
            <Link
              href="/members"
              className="inline-block px-6 py-3 font-semibold transition-colors text-white"
              style={{ backgroundColor: "#c4734a" }}
            >
              Мастер классын бичлэг үзэх
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
