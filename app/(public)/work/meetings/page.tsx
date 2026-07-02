import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Зөөлөн хот уулзалт, ярилцлага | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const content = await getContent();

  return (
    <>
      <PageHeader
        label="Уулзалт"
        title="Зөөлөн хот уулзалт, ярилцлага"
        intro={content.meetings_intro}
        backHref="/work"
        backLabel="Бидний ажил"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/2] overflow-hidden bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80"
                alt="Уулзалт, ярилцлага"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg text-[#55504a] leading-relaxed mb-8">
                Зочин илтгэгчид, мэргэжилтнүүд, идэвхтэн иргэдтэй хамтран хот байгуулалтын
                асуудлыг хэлэлцдэг цуврал арга хэмжээ.
              </p>
              <Link
                href="/events"
                className="inline-block text-white px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#c4734a" }}
              >
                Удахгүй болох уулзалтад бүртгүүлэх
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
