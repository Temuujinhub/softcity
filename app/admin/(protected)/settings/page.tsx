"use client";

import { useEffect, useState } from "react";

const DEFAULTS = {
  hero_image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80",
  hero_title: "Зөөлөн хот",
  hero_subtitle: "Хүний хэмжээний, тогтвортой, амьдрахад таатай хот байгуулалтыг Монголд дэлгэрүүлж байна.",
  hero_badge: "Зөөлөн хотын шийдэл НҮТББ",
  contact_email: "info@softcity.mn",
  contact_phone: "",
  contact_address: "",
  contact_facebook: "https://www.facebook.com/softcitymongolia",
};

type SettingsKey = keyof typeof DEFAULTS;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ ...DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "contact">("hero");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setSettings((prev) => ({ ...prev, ...data }));
        setLoading(false);
      });
  }, []);

  function update(key: SettingsKey, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="p-8 text-stone-500">Ачааллаж байна...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Тохиргоо</h1>
        <button
          onClick={save}
          disabled={saving}
          className="px-5 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Хадгалж байна..." : saved ? "✓ Хадгалагдлаа" : "Хадгалах"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-stone-200">
        {(["hero", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "border-b-2 border-stone-900 text-stone-900"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab === "hero" ? "Нүүр хуудас (Hero)" : "Холбоо барих"}
          </button>
        ))}
      </div>

      {activeTab === "hero" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Нүүр зураг URL
            </label>
            <input
              type="url"
              value={settings.hero_image_url}
              onChange={(e) => update("hero_image_url", e.target.value)}
              placeholder="https://..."
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
            <p className="text-xs text-stone-400 mt-1">
              Unsplash эсвэл өөр зурагны URL оруулна уу. Vercel дээр файл upload хийхэд файл алддаг тул URL ашиглах нь дээр.
            </p>
          </div>

          {/* Preview */}
          {settings.hero_image_url && (
            <div className="relative h-48 overflow-hidden border border-stone-200">
              <img
                src={settings.hero_image_url}
                alt="Hero preview"
                className="w-full h-full object-cover opacity-70"
                style={{ backgroundColor: "#1c1c1c" }}
              />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="text-white">
                  <p className="text-xs text-stone-300">{settings.hero_badge}</p>
                  <p className="text-2xl font-bold">{settings.hero_title}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Badge текст (жижиг дээрх)
            </label>
            <input
              type="text"
              value={settings.hero_badge}
              onChange={(e) => update("hero_badge", e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Гарчиг
            </label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) => update("hero_title", e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Тайлбар текст
            </label>
            <textarea
              value={settings.hero_subtitle}
              onChange={(e) => update("hero_subtitle", e.target.value)}
              rows={3}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Имэйл</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => update("contact_email", e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Утас</label>
            <input
              type="text"
              value={settings.contact_phone}
              onChange={(e) => update("contact_phone", e.target.value)}
              placeholder="+976 ..."
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Хаяг</label>
            <input
              type="text"
              value={settings.contact_address}
              onChange={(e) => update("contact_address", e.target.value)}
              placeholder="Улаанбаатар, ..."
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Facebook URL</label>
            <input
              type="url"
              value={settings.contact_facebook}
              onChange={(e) => update("contact_facebook", e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
