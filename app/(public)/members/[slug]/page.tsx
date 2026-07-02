import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export const dynamic = "force-dynamic";

export default async function MemberContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { slug } = await params;
  const content = await prisma.memberContent.findUnique({ where: { slug } });
  if (!content || !content.published) notFound();

  return (
    <>
      <PageHeader
        label="Masterclass"
        title={content.title}
        backHref="/members"
        backLabel="Гишүүний хэсэг"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          {content.videoUrl && (
            <YouTubeEmbed url={content.videoUrl} title={content.title} className="mb-10 shadow-xl" />
          )}

          {content.description && (
            <p className="text-lg sm:text-xl text-[#55504a] leading-relaxed mb-10 max-w-3xl">
              {content.description}
            </p>
          )}

          {content.fileUrl && (
            <a
              href={content.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 font-semibold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#c4734a" }}
            >
              Файл татах
            </a>
          )}

          {!content.videoUrl && !content.fileUrl && (
            <div className="bg-white border border-[#e7e2d9] p-10 text-center text-[#8a8479]">
              Агуулга удахгүй нэмэгдэнэ.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
