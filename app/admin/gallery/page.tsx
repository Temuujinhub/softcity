"use client";

import { useEffect, useState, useCallback } from "react";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  album: string;
  order: number;
}

const ALBUMS = [
  { value: "festival-2025", label: "Фестиваль 2025" },
  { value: "festival-2026", label: "Фестиваль 2026" },
  { value: "general", label: "Ерөнхий" },
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("festival-2025");
  const [newCaption, setNewCaption] = useState("");
  const [error, setError] = useState("");

  const fetchImages = useCallback(async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      // Create gallery entry
      const galleryRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, caption: newCaption, album: selectedAlbum, order: images.length }),
      });
      if (!galleryRes.ok) throw new Error("Gallery save failed");

      setNewCaption("");
      await fetchImages();
    } catch {
      setError("Зураг нэмэх амжилтгүй боллоо.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  const albums: Record<string, GalleryImage[]> = {};
  for (const img of images) {
    if (!albums[img.album]) albums[img.album] = [];
    albums[img.album].push(img);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Зургийн цомог</h1>

      {/* Upload section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
        <h2 className="font-bold text-stone-900 mb-4">Зураг нэмэх</h2>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Цомог</label>
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
            >
              {ALBUMS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Тайлбар (заавал биш)</label>
            <input
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Зураг файл</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-sm border border-stone-300 px-3 py-2 file:mr-4 file:border-0 file:bg-stone-900 file:text-white file:px-3 file:py-1 file:text-xs file:font-semibold"
            />
          </div>
        </div>
        {uploading && <p className="text-sm text-stone-500 mt-3">Зураг нэмж байна...</p>}
      </div>

      {/* Gallery grid by album */}
      {loading ? (
        <div className="text-stone-500">Ачааллаж байна...</div>
      ) : (
        Object.entries(albums).map(([album, imgs]) => {
          const albumLabel = ALBUMS.find((a) => a.value === album)?.label || album;
          return (
            <div key={album} className="mb-10">
              <h2 className="text-lg font-bold text-stone-900 mb-4">{albumLabel} ({imgs.length} зураг)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {imgs.map((img) => (
                  <div key={img.id} className="group relative aspect-square bg-stone-100 overflow-hidden">
                    <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="bg-red-600 text-white text-xs px-3 py-1 font-semibold"
                      >
                        Устгах
                      </button>
                    </div>
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
      {Object.keys(albums).length === 0 && !loading && (
        <div className="text-center py-20 text-stone-500">Зураг байхгүй байна.</div>
      )}
    </div>
  );
}
