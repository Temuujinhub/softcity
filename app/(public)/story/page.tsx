import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Бидний түүх | Зөөлөн хот",
};
export const dynamic = "force-dynamic";

async function getTeam() {
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

async function getPartners() {
  try {
    return await prisma.partner.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function StoryPage() {
  const [content, team, partners] = await Promise.all([getContent(), getTeam(), getPartners()]);

  return (
    <>
      <PageHeader
        label="Манай байгууллага"
        title="Бидний түүх"
        intro='"Зөөлөн хотын шийдэл" нь Монгол улсад хүн төвтэй, тогтвортой хот төлөвлөлтийг дэмжих зорилготой иргэний нийгмийн байгууллага юм.'
      />

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c4734a" }}>
                Бид хэн бэ
              </p>
            </div>
            <div className="lg:col-span-9 max-w-3xl">
              {content.story_intro.split("\n\n").map((para, i) => (
                <p key={i} className="text-xl sm:text-2xl leading-relaxed text-[#33302b] mb-8 font-light">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goal */}
      <section className="py-20 bg-[#141414] text-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c4734a" }}>
                Зорилго
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="text-2xl sm:text-4xl font-medium leading-snug tracking-tight max-w-3xl">
                {content.story_goal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why soft city */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                {content.story_why_title}
              </h2>
            </div>
            <div className="lg:col-span-7 max-w-2xl">
              <p className="text-lg sm:text-xl leading-relaxed text-[#55504a]">
                {content.story_why_text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 sm:py-28 border-t border-[#e7e2d9]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">Манай баг</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {team.map((member) => (
                <div key={member.id} className="group">
                  <div className="aspect-[4/5] bg-[#efe9de] overflow-hidden mb-4">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#c8beac] text-5xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-[#8a8479] text-sm mt-1">{member.role}</p>
                  {member.bio && (
                    <p className="text-[#6b655c] text-sm mt-2 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="py-20 sm:py-28 border-t border-[#e7e2d9]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">
              Хамтрагч байгууллагууд
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[#e7e2d9] border border-[#e7e2d9]">
              {partners.map((p) => {
                const inner = p.logoUrl ? (
                  <img src={p.logoUrl} alt={p.name} className="max-h-14 max-w-[70%] object-contain" />
                ) : (
                  <span className="text-[#55504a] font-semibold text-sm text-center leading-snug">
                    {p.name}
                  </span>
                );
                return p.url ? (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#faf9f6] flex items-center justify-center p-8 min-h-[120px] hover:bg-white transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={p.id}
                    className="bg-[#faf9f6] flex items-center justify-center p-8 min-h-[120px]"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
