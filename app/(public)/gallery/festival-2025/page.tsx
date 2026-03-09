import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Фестиваль 2025 зургийн цомог | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function Festival2025GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    where: { album: "festival-2025" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/gallery" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">← Зургийн цомог</Link>
          <h1 className="text-5xl sm:text-6xl font-bold">Зөөлөн хот фестиваль 2025</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <div className="text-center py-20 text-stone-500">Зураг байхгүй байна.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.id} className="group aspect-square overflow-hidden bg-stone-100">
                  <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
