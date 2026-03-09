import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

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

  console.log("✓ Seed completed!");
  console.log("Admin login: admin@softcity.mn / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
