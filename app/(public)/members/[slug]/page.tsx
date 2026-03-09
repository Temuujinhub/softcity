import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MemberContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { slug } = await params;
  const content = await prisma.memberContent.findUnique({ where: { slug } });
  if (!content || !content.published) notFound();

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/members" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">
            ← Гишүүний хэсэг
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{content.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {content.description && (
            <p className="text-xl text-stone-600 leading-relaxed mb-8">{content.description}</p>
          )}

          {content.videoUrl && (
            <div className="aspect-video bg-stone-900 mb-8">
              <iframe
                src={content.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title={content.title}
              />
            </div>
          )}

          {content.fileUrl && (
            <a
              href={content.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 font-semibold text-white transition-colors"
              style={{ backgroundColor: "#c4734a" }}
            >
              Файл татах
            </a>
          )}

          {!content.videoUrl && !content.fileUrl && (
            <div className="bg-stone-50 p-8 text-center text-stone-500">
              Агуулга удахгүй нэмэгдэнэ.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
