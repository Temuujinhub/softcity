"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Нүүр", href: "/" },
  { label: "Бидний түүх", href: "/story" },
  {
    label: "Бидний ажил",
    href: "/work",
    children: [
      { label: "Зөөлөн хот фестиваль", href: "/work/festival" },
      { label: "Зөөлөн хот уулзалт, ярилцлага", href: "/work/meetings" },
      { label: "Чадавх бэхжүүлэх сургалт", href: "/work/training" },
      { label: "Туршлага судлах аялал", href: "/work/study-tours" },
      { label: "Орчуулгын үйлчилгээ", href: "/work/translation" },
    ],
  },
  {
    label: "Мэдээлэл",
    href: "/news",
    children: [
      { label: "Ярилцлага", href: "/news?category=interview" },
      { label: "Шинэ бүтээл", href: "/news?category=publication" },
      { label: "Мэдээ", href: "/news?category=news" },
    ],
  },
  { label: "Зургийн цомог", href: "/gallery" },
  { label: "Бүртгүүлэх", href: "/events" },
  { label: "Гишүүнчлэл", href: "/members" },
  { label: "Холбоо барих", href: "/contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: transparent ? "rgba(0,0,0,0)" : "rgba(250,249,246,0.94)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        borderBottom: transparent ? "1px solid rgba(255,255,255,0.14)" : "1px solid #e7e2d9",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span
              className="font-bold text-lg tracking-tight transition-colors duration-300"
              style={{ color: transparent ? "white" : "#141414" }}
            >
              ЗӨӨЛӨН ХОТ
            </span>
            <span
              className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: transparent ? "rgba(255,255,255,0.6)" : "#8a8479" }}
            >
              Softcity Mongolia
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-[13px] font-medium transition-colors duration-300 hover:opacity-70"
                  style={{
                    color: transparent ? "rgba(255,255,255,0.9)" : "#33302b",
                    borderBottom:
                      pathname === item.href
                        ? `2px solid ${transparent ? "white" : "#c4734a"}`
                        : "2px solid transparent",
                  }}
                >
                  {item.label}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-[#faf9f6] border border-[#e7e2d9] shadow-xl min-w-[260px] py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-[#33302b] hover:bg-[#f0ece3] hover:text-[#c4734a] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {session && (
              <button
                onClick={() => signOut()}
                className="px-3 py-2 text-[13px] font-medium transition-colors hover:opacity-70"
                style={{ color: transparent ? "rgba(255,255,255,0.6)" : "#8a8479" }}
              >
                Гарах
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 transition-colors duration-300"
            style={{ color: transparent ? "white" : "#141414" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-t border-[#e7e2d9] px-5 py-6 space-y-1 max-h-[calc(100vh-72px)] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2.5 text-base font-semibold text-[#141414]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className="block pl-4 py-2 text-sm text-[#6b655c]"
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          {session && (
            <button
              onClick={() => signOut()}
              className="block py-2.5 text-sm text-[#8a8479]"
            >
              Гарах
            </button>
          )}
        </div>
      )}
    </header>
  );
}
