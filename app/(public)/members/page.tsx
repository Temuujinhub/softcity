import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Нэвтрэх | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const session = await getServerSession(authOptions);
  let contents: Awaited<ReturnType<typeof prisma.memberContent.findMany>> = [];
  if (session) {
    try {
      contents = await prisma.memberContent.findMany({ where: { published: true } });
    } catch {
      // DB unavailable
    }
  }

  if (!session) {
    return (
      <>
        <section className="bg-stone-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
              Гишүүнчлэл
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold">Нэвтрэх</h1>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-12 border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Гишүүний хэсэг</h2>
              <p className="text-stone-600 mb-8">
                Энэ хэсэгт нэвтрэхийн тулд нэвтрэх эсвэл бүртгүүлнэ үү.
              </p>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full py-3 font-semibold text-center text-white transition-colors"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  Нэвтрэх
                </Link>
                <Link
                  href="/register"
                  className="block w-full py-3 font-semibold text-center border border-stone-300 text-stone-700 hover:border-stone-700 transition-colors"
                >
                  Бүртгүүлэх
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold text-stone-900 mb-4">Гишүүний хэсэгт юу байдаг вэ?</h3>
              <ul className="text-left space-y-2 text-stone-600 text-sm">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#c4734a" }}>✓</span>
                  Мастер класс 1: Дэвид Сим @Зөөлөн хот фестиваль 2025
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#c4734a" }}>✓</span>
                  Зөөлөн хот ном (цахим хувилбар)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Гишүүний хэсэг
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Нэвтрэх</h1>
          <p className="mt-4 text-stone-300">Тавтай морил, {session.user?.name || session.user?.email}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Гишүүний агуулга</h2>
            <div className="w-12 h-1" style={{ backgroundColor: "#c4734a" }} />
          </div>

          {contents.length === 0 ? (
            <p className="text-stone-500">Агуулга байхгүй байна.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((c) => (
                <Link key={c.id} href={`/members/${c.slug}`} className="group p-8 bg-white border border-stone-200 hover:border-[#c4734a] transition-colors">
                  <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#c4734a] transition-colors">
                    {c.title}
                  </h3>
                  {c.description && <p className="text-stone-600 text-sm">{c.description}</p>}
                  <span className="inline-block mt-4 text-sm font-semibold" style={{ color: "#c4734a" }}>
                    Нээх →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
