import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@softcity.mn" },
    update: {},
    create: {
      email: "admin@softcity.mn",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Sample articles
  await prisma.article.upsert({
    where: { slug: "david-sim-interview" },
    update: {},
    create: {
      title: "Дэвид Сим: Зөөлөн хотыг бүтээх нь",
      slug: "david-sim-interview",
      excerpt: "Gehl Architects-ийн гүйцэтгэх захирал Дэвид Симтэй хийсэн ярилцлага.",
      content: "<p>Дэвид Сим бол дэлхийд тэргүүлэгч хот байгуулагч, зохиолч юм. Тэрээр Данийн Gehl Architects байгууллагын гүйцэтгэх захирал бөгөөд <em>Soft City</em> номын зохиогч.</p><p>Зөөлөн хот фестиваль 2025 дээр тэрээр мастер класс хичээл зааж, Монголын идэвхтэн иргэд, мэргэжилтнүүдтэй хамтран ажиллав.</p>",
      category: "interview",
      published: true,
      publishedAt: new Date(),
    },
  });

  await prisma.article.upsert({
    where: { slug: "soft-city-festival-2025-recap" },
    update: {},
    create: {
      title: "Зөөлөн хот фестиваль 2025 — Дүгнэлт",
      slug: "soft-city-festival-2025-recap",
      excerpt: "2025 оны Зөөлөн хот фестивалийн товч тойм.",
      content: "<p>2025 оны Зөөлөн хот фестиваль амжилттай зохион байгуулагдлаа. 200 гаруй оролцогчид фестивальд хамрагдаж, Дэвид Симын мастер классыг сонсов.</p>",
      category: "news",
      published: true,
      publishedAt: new Date(),
    },
  });

  // Member content
  await prisma.memberContent.upsert({
    where: { slug: "masterclass-david-sim-2025" },
    update: {},
    create: {
      title: "Мастер класс 1: Дэвид Сим @Зөөлөн хот фестиваль 2025",
      slug: "masterclass-david-sim-2025",
      description: "Дэвид Симын мастер классын бичлэг болон материалууд.",
      published: true,
    },
  });

  await prisma.memberContent.upsert({
    where: { slug: "softcity-book" },
    update: {},
    create: {
      title: "Зөөлөн хот ном",
      slug: "softcity-book",
      description: "Зөөлөн хот номын цахим хувилбар.",
      published: true,
    },
  });

  // Partners (Excel: Хамтрагч байгууллагууд)
  const partners = [
    { name: "Хот байгуулалт, барилга, орон сууцжуулалтын яам", url: "" },
    { name: "Think Softer Planning", url: "https://www.thinksofter.com" },
    { name: "UN-Habitat Mongolia", url: "https://unhabitat.org" },
    { name: "Монголын Архитекторуудын Эвлэл", url: "" },
    { name: "GerHub", url: "https://www.gerhub.org" },
    { name: "Meguun Media", url: "" },
    { name: "Аясгал үл хөдлөх хөрөнгийн менежмент", url: "" },
    { name: "Volcano", url: "" },
  ];
  const partnerCount = await prisma.partner.count();
  if (partnerCount === 0) {
    await prisma.partner.createMany({
      data: partners.map((p, i) => ({ ...p, order: i })),
    });
  }

  // Team placeholders
  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    await prisma.teamMember.createMany({
      data: [
        { name: "Баг гишүүн 1", role: "Гүйцэтгэх захирал", order: 0 },
        { name: "Баг гишүүн 2", role: "Хөтөлбөрийн менежер", order: 1 },
        { name: "Баг гишүүн 3", role: "Харилцаа холбооны мэргэжилтэн", order: 2 },
      ],
    });
  }

  // 2026 events
  await prisma.event.upsert({
    where: { slug: "soft-city-festival-2026" },
    update: {},
    create: {
      title: "Зөөлөн хот фестиваль 2026",
      slug: "soft-city-festival-2026",
      description:
        "Хот байгуулалтын мэргэжилтнүүд, судлаачид, олон нийтийг нэг дор нэгтгэж, мэдлэг, туршлага хуваалцах орон зай.",
      location: "Улаанбаатар",
      dateText: "2026 оны зун",
      year: 2026,
      confirmed: false,
      registrationOpen: false,
      published: true,
      order: 0,
    },
  });

  await prisma.event.upsert({
    where: { slug: "soft-city-meetup-2026-1" },
    update: {},
    create: {
      title: "Зөөлөн хот уулзалт, ярилцлага №1",
      slug: "soft-city-meetup-2026-1",
      description:
        "Хот байгуулалт, нийтийн орон зай, тогтвортой амьдралын сэдвээр нээлттэй уулзалт.",
      location: "Улаанбаатар",
      dateText: "2026 оны хавар",
      year: 2026,
      confirmed: false,
      registrationOpen: true,
      published: true,
      order: 1,
    },
  });

  console.log("✓ Seed completed!");
  console.log("Admin login: admin@softcity.mn / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
