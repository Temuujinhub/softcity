import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Туршлага судлах аялал | Зөөлөн хот" };

export default function StudyToursPage() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">← Бидний ажил</Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>Зөвлөх үйлчилгээ</p>
          <h1 className="text-5xl sm:text-6xl font-bold">Туршлага судлах аялал</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              Дэлхийн шилдэг хот байгуулалтын туршлага, шийдлийг биечлэн судлах олон улсын аялал.
            </p>
            <h2>Хаашаа явдаг вэ?</h2>
            <ul>
              <li><strong>Копенхаген, Данмарк</strong> — Gehl Architects-ийн нутаг, дэлхийн хамгийн явган хүнд ээлтэй хот</li>
              <li><strong>Амстердам, Нидерланд</strong> — Дугуйч хотын жишиг</li>
              <li><strong>Сингапур</strong> — Ази дахь тогтвортой хот байгуулалтын нэг</li>
            </ul>
            <h2>Хамтрах</h2>
            <p>Аялалд оролцохыг хүсвэл эсвэл байгууллагын хэрэгцээнд тохируулсан аялал зохион байгуулах бол бидэнтэй холбоо бариарай.</p>
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
