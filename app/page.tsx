import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

const HERO_DEFAULTS = {
  hero_image_url:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80",
  hero_title: "Зөөлөн хот",
  hero_subtitle:
    "Хүний хэмжээний, тогтвортой, амьдрахад таатай хот байгуулалтыг Монголд дэлгэрүүлж байна.",
  hero_badge: "Зөөлөн хотын шийдэл НҮТББ",
};

async function getSiteSettings() {
  try {
    const rows = await prisma.siteSettings.findMany({
      where: { key: { in: Object.keys(HERO_DEFAULTS) } },
    });
    const result = { ...HERO_DEFAULTS };
    for (const row of rows) {
      if (row.key in result) (result as Record<string, string>)[row.key] = row.value;
    }
    return result;
  } catch {
    return HERO_DEFAULTS;
  }
}

async function getLatestArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [articles, settings] = await Promise.all([
    getLatestArticles(),
    getSiteSettings(),
  ]);

  return <HomeClient articles={articles} settings={settings} />;
}
