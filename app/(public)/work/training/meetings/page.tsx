import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Зөөлөн хот уулзалт, ярилцлага | Зөөлөн хот",
};

export default function MeetingsPage() {
  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">
            ← Бидний ажил
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Сургалт, семинар
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Зөөлөн хот уулзалт, ярилцлага</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              Хот байгуулалт, нийтийн орон зай, тогтвортой амьдралын сэдвээр тогтмол зохион байгуулагддаг уулзалт, ярилцлагууд.
            </p>
            <p>
              Зочин илтгэгчид, мэргэжилтнүүд, идэвхтэн иргэдтэй хамтран хот байгуулалтын асуудлыг хэлэлцдэг цуврал арга хэмжээ.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Өнгөрсөн уулзалтууд</h2>
            <Link href="/news?category=interview" className="text-sm font-semibold hover:underline" style={{ color: "#c4734a" }}>
              Ярилцлагуудыг уншина уу →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
