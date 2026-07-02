import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Холбоо барих | Зөөлөн хот" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getContent();

  const socialLinks = [
    { label: "Facebook", href: content.contact_facebook },
    { label: "Instagram", href: content.contact_instagram },
    { label: "LinkedIn", href: content.contact_linkedin },
  ].filter((l) => l.href);

  const usefulLinks = [
    { label: "Gehl Architects", href: "https://www.gehlpeople.com" },
    { label: "Think Softer", href: "https://www.thinksofter.com" },
  ];

  return (
    <>
      <PageHeader label="Харилцаа холбоо" title="Холбоо барих" />

      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-2">
                    Байгууллага
                  </p>
                  <p className="text-lg font-medium">Зөөлөн хотын шийдэл НҮТББ</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-2">
                    Имэйл
                  </p>
                  <a
                    href={`mailto:${content.contact_email}`}
                    className="text-lg font-medium hover:underline"
                    style={{ color: "#c4734a" }}
                  >
                    {content.contact_email}
                  </a>
                </div>
                {content.contact_phone && (
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-2">
                      Утас
                    </p>
                    <a
                      href={`tel:${content.contact_phone}`}
                      className="text-lg font-medium hover:underline"
                      style={{ color: "#c4734a" }}
                    >
                      {content.contact_phone}
                    </a>
                  </div>
                )}
                {content.contact_address && (
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-2">
                      Хаяг
                    </p>
                    <p className="text-lg">{content.contact_address}</p>
                  </div>
                )}
                {socialLinks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-3">
                      Сошиал сувгууд
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#d5cec2] px-5 py-2.5 text-sm font-semibold hover:border-[#c4734a] hover:text-[#c4734a] transition-colors"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <ContactForm />
            </div>

            {/* Links + collaborate */}
            <div>
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8479] mb-6">
                Хэрэгтэй холбооснууд
              </h2>
              <ul className="space-y-px bg-[#e7e2d9] border border-[#e7e2d9]">
                {usefulLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 bg-[#faf9f6] hover:bg-white transition-colors group"
                    >
                      <span className="font-semibold group-hover:text-[#c4734a] transition-colors">
                        {l.label}
                      </span>
                      <span className="text-[#c8beac] group-hover:text-[#c4734a] transition-colors">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-10 bg-[#141414] text-white">
                <h3 className="font-bold text-2xl mb-4 tracking-tight">Хамтран ажиллах</h3>
                <p className="text-[#b5afa5] text-sm leading-relaxed mb-8">
                  Зөөлөн хоттой хамтрах, санхүүжилт, хандив өгөх болон бусад асуудлаар холбоо
                  бариарай.
                </p>
                <a
                  href={`mailto:${content.contact_email}`}
                  className="inline-block px-7 py-3.5 font-semibold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#c4734a" }}
                >
                  Имэйл илгээх
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
