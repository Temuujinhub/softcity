import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Сургалт, арга хэмжээ | Зөөлөн хот" };

export default function ConsultingEventsPage() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">← Бидний ажил</Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>Зөвлөх үйлчилгээ</p>
          <h1 className="text-5xl sm:text-6xl font-bold">Сургалт, арга хэмжээ зохион байгуулах</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              Байгууллага, нийгэмлэгийн хэрэгцээнд тохируулан хот байгуулалт, нийтийн орон зайн сэдвээр сургалт, семинар зохион байгуулна.
            </p>
            <h2>Бид юу санал болгодог вэ?</h2>
            <ul>
              <li>Хүний хэмжээний хот байгуулалтын сургалт</li>
              <li>Нийтийн орон зайн дизайн семинар</li>
              <li>Плейсмэйкингийн практик дадлага</li>
              <li>Геhl арга зүйн танилцуулга</li>
            </ul>
            <h2>Хамтрах</h2>
            <p>
              Та байгууллагынхаа хэрэгцээнд тулгуурласан сургалт, арга хэмжээ зохион байгуулахыг хүсвэл бидэнтэй холбоо бариарай.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contact" className="inline-block px-8 py-3 font-semibold text-white" style={{ backgroundColor: "#c4734a" }}>
              Холбоо барих
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
