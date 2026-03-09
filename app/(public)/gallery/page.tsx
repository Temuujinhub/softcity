import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Зургийн цомог | Зөөлөн хот" };

const ALBUMS = [
  { key: "festival-2025", label: "Зөөлөн хот фестиваль 2025" },
  { key: "festival-2026", label: "Зөөлөн хот фестиваль 2026" },
  { key: "general", label: "Ерөнхий" },
  { key: "uploads", label: "Бусад" },
];

function getAlbumImages(album: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", album);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map((f) => `/images/${album}/${f}`);
}

export default function GalleryPage() {
  const albums = ALBUMS.map((a) => ({
    ...a,
    images: getAlbumImages(a.key),
  })).filter((a) => a.images.length > 0);

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#c4734a" }}
          >
            Медиа
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Зургийн цомог</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {albums.length === 0 ? (
            <div className="text-center py-20 text-stone-500">
              Зураг байхгүй байна.
            </div>
          ) : (
            albums.map((album) => (
              <div key={album.key} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-stone-900 mb-3">
                    {album.label}
                  </h2>
                  <div
                    className="w-10 h-1"
                    style={{ backgroundColor: "#c4734a" }}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {album.images.map((url) => (
                    <div
                      key={url}
                      className="group aspect-square overflow-hidden bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={url}
                        alt=""
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
