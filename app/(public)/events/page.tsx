import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EventsClient from "./EventsClient";

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
    </>
  );
}
