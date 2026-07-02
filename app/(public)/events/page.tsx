import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import EventsClient from "./EventsClient";
import BoothRentSection from "./BoothRentSection";

export const metadata: Metadata = { title: "Арга хэмжээнд бүртгүүлэх | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  try {
    events = await prisma.event.findMany({
      where: { published: true },
      orderBy: [{ year: "asc" }, { order: "asc" }],
    });
  } catch {
    // DB unavailable
  }
  const content = await getContent();

  return (
    <>
      <PageHeader
        label="Арга хэмжээ"
        title="Бүртгүүлэх"
        intro="Болох гэж буй арга хэмжээнүүдийн жагсаалт. Тов нь гарсан арга хэмжээнүүд тодоор харагдах бөгөөд дээр нь дарж урьдчилан бүртгүүлэх боломжтой."
      />
      <EventsClient
        events={events.map((e) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          location: e.location,
          dateText: e.dateText,
          year: e.year,
          confirmed: e.confirmed,
          registrationOpen: e.registrationOpen,
        }))}
      />
      <BoothRentSection
        title={content.booth_title}
        intro={content.booth_intro}
        mapUrl={content.booth_map_url}
      />
    </>
  );
}
