import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Зургийн цомог | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ album: "asc" }, { order: "asc" }],
  });

  const albums: Record<string, typeof images> = {};
  for (const img of images) {
    if (!albums[img.album]) albums[img.album] = [];
    albums[img.album].push(img);
  }

  const albumLabels: Record<string, string> = {
    "festival-2025": "Зөөлөн хот фестиваль 2025",
    "festival-2026": "Зөөлөн хот фестиваль 2026",
    general: "Ерөнхий",
  };

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Медиа
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Зургийн цомог</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(albums).length === 0 ? (
            <div className="text-center py-20 text-stone-500">Зураг байхгүй байна.</div>
          ) : (
            Object.entries(albums).map(([album, imgs]) => (
              <div key={album} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-stone-900 mb-3">
                    {albumLabels[album] || album}
                  </h2>
                  <div className="w-10 h-1" style={{ backgroundColor: "#c4734a" }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {imgs.map((img) => (
                    <div key={img.id} className="group aspect-square overflow-hidden bg-stone-100 cursor-pointer">
                      <img
                        src={img.url}
                        alt={img.caption || "Gallery image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
