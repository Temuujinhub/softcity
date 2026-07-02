import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Фестиваль 2025 зургийн цомог | Зөөлөн хот",
};
export const dynamic = "force-dynamic";

function getFsImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "festival-2025");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map((f) => `/images/festival-2025/${f}`);
}

export default async function Festival2025GalleryPage() {
  let images: string[] = [];
  try {
    const dbImages = await prisma.galleryImage.findMany({
      where: { album: "festival-2025" },
      orderBy: { order: "asc" },
      select: { url: true },
    });
    images = dbImages.map((i) => i.url);
  } catch {
    // DB unavailable
  }
  const existing = new Set(images);
  for (const url of getFsImages()) {
    if (!existing.has(url)) images.push(url);
  }

  return (
    <>
      <PageHeader
        label="Медиа"
        title="Зөөлөн хот фестиваль 2025"
        backHref="/gallery"
        backLabel="Зургийн цомог"
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {images.length === 0 ? (
            <div className="text-center py-20 text-[#8a8479]">Зураг байхгүй байна.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((url) => (
                <div key={url} className="group aspect-square overflow-hidden bg-[#efe9de]">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
