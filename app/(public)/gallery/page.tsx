import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Зургийн цомог | Зөөлөн хот" };
export const dynamic = "force-dynamic";

const ALBUM_LABELS: Record<string, string> = {
  "festival-2025": "Зөөлөн хот фестиваль 2025",
  "festival-2026": "Зөөлөн хот фестиваль 2026",
  general: "Ерөнхий",
  uploads: "Бусад",
};

function getFsAlbumImages(album: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", album);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map((f) => `/images/${album}/${f}`);
}

export default async function GalleryPage() {
  // Админаас нэмсэн зургууд (DB)
  let dbImages: { url: string; caption: string | null; album: string }[] = [];
  try {
    dbImages = await prisma.galleryImage.findMany({
      orderBy: [{ album: "asc" }, { order: "asc" }],
      select: { url: true, caption: true, album: true },
    });
  } catch {
    // DB unavailable
  }

  // Файл систем дэх хуучин зургуудтай нэгтгэнэ
  const albumMap = new Map<string, { url: string; caption: string | null }[]>();
  for (const img of dbImages) {
    const list = albumMap.get(img.album) || [];
    list.push({ url: img.url, caption: img.caption });
    albumMap.set(img.album, list);
  }
  for (const key of Object.keys(ALBUM_LABELS)) {
    const fsImages = getFsAlbumImages(key);
    if (fsImages.length) {
      const list = albumMap.get(key) || [];
      const existing = new Set(list.map((i) => i.url));
      for (const url of fsImages) {
        if (!existing.has(url)) list.push({ url, caption: null });
      }
      albumMap.set(key, list);
    }
  }

  const albums = [...albumMap.entries()]
    .filter(([, images]) => images.length > 0)
    .map(([key, images]) => ({ key, label: ALBUM_LABELS[key] || key, images }));

  return (
    <>
      <PageHeader label="Медиа" title="Зургийн цомог" />

      <section className="py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {albums.length === 0 ? (
            <div className="text-center py-20 text-[#8a8479]">Зураг байхгүй байна.</div>
          ) : (
            albums.map((album) => (
              <div key={album.key} className="mb-20">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 pt-8 border-t border-[#e7e2d9]">
                  {album.label}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {album.images.map((img) => (
                    <div key={img.url} className="group aspect-square overflow-hidden bg-[#efe9de]">
                      <img
                        src={img.url}
                        alt={img.caption || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
