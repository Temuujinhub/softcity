import { prisma } from "@/lib/prisma";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

const CONTACT_DEFAULTS = {
  contact_email: "info@softcity.mn",
  contact_phone: "",
  contact_address: "",
  contact_facebook: "https://www.facebook.com/softcitymongolia",
};

async function getContactSettings() {
  try {
    const rows = await prisma.siteSettings.findMany({
      where: { key: { in: Object.keys(CONTACT_DEFAULTS) } },
    });
    const result = { ...CONTACT_DEFAULTS };
    for (const row of rows) {
      if (row.key in result) (result as Record<string, string>)[row.key] = row.value;
    }
    return result;
  } catch {
    return CONTACT_DEFAULTS;
  }
}

const staticLinks = [
  { label: "Gehl Architects", href: "https://www.gehlpeople.com" },
  { label: "Think Softer", href: "https://www.thinksofter.com" },
  { label: "Project for Public Spaces", href: "https://www.pps.org" },
  { label: "Congress for the New Urbanism", href: "https://www.cnu.org" },
];

export default async function ContactPage() {
  const contact = await getContactSettings();

  const externalLinks = [
    { label: "Facebook", href: contact.contact_facebook },
    ...staticLinks,
  ];

  return (
    <>
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Харилцаа холбоо
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Холбоо барих</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Холбоо барих</h2>
              <div className="space-y-4 text-stone-600">
                <div>
                  <p className="font-semibold text-stone-900">Байгууллага</p>
                  <p>Зөөлөн хотын шийдэл НҮТББ</p>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Имэйл</p>
                  <a href={`mailto:${contact.contact_email}`} className="hover:underline" style={{ color: "#c4734a" }}>
                    {contact.contact_email}
                  </a>
                </div>
                {contact.contact_phone && (
                  <div>
                    <p className="font-semibold text-stone-900">Утас</p>
                    <a href={`tel:${contact.contact_phone}`} className="hover:underline" style={{ color: "#c4734a" }}>
                      {contact.contact_phone}
                    </a>
                  </div>
                )}
                {contact.contact_address && (
                  <div>
                    <p className="font-semibold text-stone-900">Хаяг</p>
                    <p>{contact.contact_address}</p>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-stone-900">Facebook</p>
                  <a
                    href={contact.contact_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "#c4734a" }}
                  >
                    {contact.contact_facebook.replace("https://www.", "")}
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>

            {/* Links + partner */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Хэрэгтэй холбооснууд</h2>
              <ul className="space-y-3">
                {externalLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border border-stone-200 hover:border-[#c4734a] transition-colors group"
                    >
                      <span className="font-semibold text-stone-800 group-hover:text-[#c4734a] transition-colors">
                        {l.label}
                      </span>
                      <span className="text-stone-400 group-hover:text-[#c4734a] transition-colors">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-8 bg-stone-900 text-white">
                <h3 className="font-bold text-xl mb-3">Хамтран ажиллах</h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  Зөөлөн хотын шийдэл НҮТББ-тай хамтрах, санхүүжилт, хандив өгөх болон бусад асуудлаар холбоо бариарай.
                </p>
                <a
                  href={`mailto:${contact.contact_email}`}
                  className="inline-block px-6 py-3 font-semibold text-sm transition-colors"
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
