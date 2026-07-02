"use client";

import { useEffect, useState } from "react";
import { CONTENT_DEFAULTS, parseSlides, type ContentKey } from "@/lib/content-defaults";

interface Field {
  key: ContentKey;
  label: string;
  multiline?: boolean;
  help?: string;
  slides?: boolean;
}

interface Group {
  key: string;
  label: string;
  fields: Field[];
}

const GROUPS: Group[] = [
  {
    key: "home",
    label: "Нүүр хуудас",
    fields: [
      { key: "hero_badge", label: "Дээд жижиг текст (badge)" },
      { key: "hero_title", label: "Том гарчиг" },
      { key: "hero_subtitle", label: "Тайлбар текст", multiline: true },
      {
        key: "hero_slides",
        label: "Нүүр зургууд (слайд)",
        multiline: true,
        slides: true,
        help: "Мөр бүрд нэг зургийн URL. Хүмүүстэй, үйл явдалтай бодит зургууд ашиглахыг зөвлөж байна.",
      },
      { key: "home_quote", label: "Ишлэл (том текст)", multiline: true },
      { key: "home_events_title", label: "Арга хэмжээ хэсгийн гарчиг" },
      { key: "home_events_subtitle", label: "Арга хэмжээ хэсгийн тайлбар", multiline: true },
      { key: "home_members_title", label: "Гишүүнчлэл хэсгийн гарчиг" },
      { key: "home_members_text", label: "Гишүүнчлэл хэсгийн текст", multiline: true },
      { key: "home_cta_title", label: "Хамтран ажиллах гарчиг" },
      { key: "footer_about", label: "Footer доод текст", multiline: true },
    ],
  },
  {
    key: "story",
    label: "Бидний түүх",
    fields: [
      {
        key: "story_intro",
        label: "Танилцуулга",
        multiline: true,
        help: "Хоосон мөрөөр догол мөр тусгаарлана.",
      },
      { key: "story_goal", label: "Зорилго", multiline: true },
      { key: "story_why_title", label: "«Хот яагаад Зөөлөн байх ёстой вэ?» гарчиг" },
      { key: "story_why_text", label: "«Хот яагаад Зөөлөн байх ёстой вэ?» текст", multiline: true },
    ],
  },
  {
    key: "work",
    label: "Бидний ажил",
    fields: [
      { key: "festival_intro", label: "Фестиваль — танилцуулга", multiline: true },
      { key: "festival_desc", label: "Фестиваль — дэлгэрэнгүй", multiline: true },
      { key: "meetings_intro", label: "Уулзалт, ярилцлага — танилцуулга", multiline: true },
      { key: "training_intro", label: "Чадавх бэхжүүлэх сургалт — танилцуулга", multiline: true },
      {
        key: "training_topics",
        label: "Сургалтын сэдвүүд",
        multiline: true,
        help: "Мөр бүрд нэг сэдэв.",
      },
      { key: "tours_intro", label: "Туршлага судлах аялал — танилцуулга", multiline: true },
      {
        key: "tours_destinations",
        label: "Аяллын чиглэлүүд",
        multiline: true,
        help: "Мөр бүрд нэг чиглэл.",
      },
      { key: "translation_intro", label: "Орчуулга — танилцуулга", multiline: true },
      {
        key: "translation_items",
        label: "Орчуулгын төрлүүд",
        multiline: true,
        help: "Мөр бүрд нэг төрөл. Хоосон мөрийн дараах текст тайлбар болж харагдана.",
      },
    ],
  },
  {
    key: "members",
    label: "Гишүүнчлэл",
    fields: [{ key: "members_intro", label: "Гишүүнчлэлийн танилцуулга", multiline: true }],
  },
  {
    key: "contact",
    label: "Холбоо барих",
    fields: [
      { key: "contact_email", label: "Имэйл" },
      { key: "contact_phone", label: "Утас" },
      { key: "contact_address", label: "Хаяг" },
      { key: "contact_facebook", label: "Facebook URL" },
      { key: "contact_instagram", label: "Instagram URL" },
      { key: "contact_linkedin", label: "LinkedIn URL" },
    ],
  },
];

function displayValue(field: Field, value: string): string {
  if (field.slides) return parseSlides(value).join("\n");
  return value;
}

export default function AdminContentPage() {
  const [values, setValues] = useState<Record<string, string>>({ ...CONTENT_DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(GROUPS[0].key);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setValues((prev) => {
          const merged = { ...prev };
          for (const key of Object.keys(CONTENT_DEFAULTS)) {
            if (data[key] !== undefined && data[key] !== "") merged[key] = data[key];
          }
          return merged;
        });
      })
      .finally(() => setLoading(false));
  }, []);

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="p-8 text-stone-500">Ачааллаж байна...</div>;

  const group = GROUPS.find((g) => g.key === activeTab)!;
  const slides = parseSlides(values.hero_slides || "");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Контент</h1>
          <p className="text-sm text-stone-500 mt-1">Сайтын бүх хэсгийн текст, зургийг эндээс өөрчилнө.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-5 py-2 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Хадгалж байна..." : saved ? "✓ Хадгалагдлаа" : "Хадгалах"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-stone-200 overflow-x-auto">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveTab(g.key)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === g.key
                ? "border-b-2 border-stone-900 text-stone-900"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 max-w-3xl">
        {group.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-stone-700 mb-1">{field.label}</label>
            {field.multiline ? (
              <textarea
                value={displayValue(field, values[field.key] || "")}
                onChange={(e) => update(field.key, e.target.value)}
                rows={field.slides ? 5 : Math.min(8, Math.max(3, (values[field.key] || "").split("\n").length + 1))}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500 font-[inherit]"
              />
            ) : (
              <input
                type="text"
                value={values[field.key] || ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-500"
              />
            )}
            {field.help && <p className="text-xs text-stone-400 mt-1">{field.help}</p>}

            {/* Slide preview */}
            {field.slides && slides.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {slides.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Слайд ${i + 1}`}
                    className="h-20 w-32 object-cover border border-stone-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
