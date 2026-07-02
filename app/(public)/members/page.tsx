import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getContent } from "@/lib/content";
import { getYouTubeThumbnail } from "@/lib/youtube";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Гишүүнчлэл | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const [session, content] = await Promise.all([getServerSession(authOptions), getContent()]);

  let contents: Awaited<ReturnType<typeof prisma.memberContent.findMany>> = [];
  try {
    contents = await prisma.memberContent.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB unavailable
  }

  if (!session) {
    return (
      <>
        <PageHeader label="Гишүүнчлэл" title="Masterclass хичээлүүд" intro={content.members_intro} />

        <section className="py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
              {/* Locked previews */}
              <div className="lg:col-span-7">
                <h2 className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: "#c4734a" }}>
                  Гишүүдэд нээлттэй агуулга
                </h2>
                <div className="space-y-px bg-[#e7e2d9] border border-[#e7e2d9]">
                  {contents.length > 0 ? (
                    contents.map((c) => (
                      <div key={c.id} className="bg-[#faf9f6] p-6 flex items-center gap-5">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: "#141414" }}
                        >
                          🔒
                        </div>
                        <div>
                          <h3 className="font-bold leading-snug">{c.title}</h3>
                          {c.description && (
                            <p className="text-sm text-[#8a8479] mt-1 line-clamp-1">{c.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#faf9f6] p-6 text-[#8a8479] text-sm">
                      Masterclass хичээлүүд удахгүй нэмэгдэнэ.
                    </div>
                  )}
                </div>
              </div>

              {/* Register card */}
              <div className="lg:col-span-5">
                <div className="bg-[#141414] text-white p-10 sticky top-28">
                  <h2 className="text-2xl font-bold mb-4">Имэйлээр бүртгүүлээд үзээрэй</h2>
                  <p className="text-[#b5afa5] text-sm leading-relaxed mb-8">
                    Бүртгэл үнэгүй. Имэйл хаягаараа бүртгүүлснээр дэлхийн шилдэг хот төлөвлөгч,
                    архитекторуудын masterclass видео хичээлүүдийг үзэх эрхтэй болно.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/register"
                      className="block w-full py-3.5 font-semibold text-center text-white text-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#c4734a" }}
                    >
                      Имэйлээр бүртгүүлэх
                    </Link>
                    <Link
                      href="/login"
                      className="block w-full py-3.5 font-semibold text-center border border-[#4a463f] text-white text-sm hover:border-white transition-colors"
                    >
                      Нэвтрэх
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        label="Гишүүний хэсэг"
        title="Masterclass хичээлүүд"
        intro={`Тавтай морил, ${session.user?.name || session.user?.email}`}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {contents.length === 0 ? (
            <p className="text-[#8a8479]">Агуулга байхгүй байна.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contents.map((c) => {
                const thumb = c.videoUrl ? getYouTubeThumbnail(c.videoUrl) : null;
                return (
                  <Link key={c.id} href={`/members/${c.slug}`} className="group">
                    <div className="aspect-video bg-[#141414] mb-4 overflow-hidden relative">
                      {thumb ? (
                        <>
                          <img
                            src={thumb}
                            alt={c.title}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg pl-1"
                              style={{ backgroundColor: "rgba(196,115,74,0.92)" }}
                            >
                              ▶
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#4a463f] text-sm">
                          {c.fileUrl ? "Файл" : "Удахгүй"}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-[#c4734a] transition-colors">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="text-[#6b655c] text-sm mt-2 line-clamp-2">{c.description}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
