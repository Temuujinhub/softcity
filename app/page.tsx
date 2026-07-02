import { prisma } from "@/lib/prisma";
import { getContent, parseSlides } from "@/lib/content";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

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

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { published: true, year: { gte: new Date().getFullYear() } },
      orderBy: [{ year: "asc" }, { order: "asc" }],
      take: 4,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [articles, events, content] = await Promise.all([
    getLatestArticles(),
    getUpcomingEvents(),
    getContent(),
  ]);

  const slides = parseSlides(content.hero_slides);

  return (
    <HomeClient
      articles={articles}
      events={events.map((e) => ({
        id: e.id,
        title: e.title,
        dateText: e.dateText,
        location: e.location,
        year: e.year,
        confirmed: e.confirmed,
        registrationOpen: e.registrationOpen,
      }))}
      content={content}
      slides={slides.length ? slides : ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1920&q=80"]}
    />
  );
}
