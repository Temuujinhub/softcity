import Link from "next/link";
import { getContent } from "@/lib/content";
import NewsletterForm from "./NewsletterForm";

export default async function Footer() {
  const content = await getContent();

  const socials = [
    { label: "Facebook", href: content.contact_facebook },
    { label: "Instagram", href: content.contact_instagram },
    { label: "LinkedIn", href: content.contact_linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#141414] text-[#b5afa5] mt-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-white font-bold text-2xl tracking-tight mb-4">ЗӨӨЛӨН ХОТ</h3>
            <p className="text-sm leading-relaxed max-w-sm">{content.footer_about}</p>
            {socials.length > 0 && (
              <div className="flex gap-5 mt-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8a8479] hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-xs mb-5 tracking-[0.25em] uppercase">Холбооснууд</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/story" className="hover:text-white transition-colors">Бидний түүх</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">Бидний ажил</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Мэдээлэл</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Зургийн цомог</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Арга хэмжээнд бүртгүүлэх</Link></li>
              <li><Link href="/members" className="hover:text-white transition-colors">Гишүүнчлэл</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Холбоо барих</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold text-xs mb-5 tracking-[0.25em] uppercase">Мэдээллийн захиалга</h4>
            <p className="text-sm mb-4">Зөөлөн хотын мэдээ, мэдээллийг имэйлээр хүлээн авах.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-[#2b2823] mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6b655c]">
          <p>© {new Date().getFullYear()} Зөөлөн хотын шийдэл НҮТББ. Бүх эрх хуулиар хамгаалагдсан.</p>
          <Link href="/admin" className="hover:text-[#b5afa5] transition-colors">Админ</Link>
        </div>
      </div>
    </footer>
  );
}
