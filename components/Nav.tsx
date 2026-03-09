"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { label: "НҮҮР", href: "/" },
  { label: "БИДНИЙ ТҮҮХ", href: "/story" },
  {
    label: "БИДНИЙ АЖИЛ",
    href: "/work",
    children: [
      {
        label: "Төсөл, хөтөлбөр",
        children: [
          { label: "Зөөлөн хот фестиваль 2025", href: "/work/projects/festival-2025" },
          { label: "Зөөлөн хот фестиваль 2026", href: "/work/projects/festival-2026" },
        ],
      },
      {
        label: "Сургалт, семинар",
        children: [
          { label: "Зөөлөн хот уулзалт, ярилцлага", href: "/work/training/meetings" },
        ],
      },
      {
        label: "Зөвлөх үйлчилгээ",
        children: [
          { label: "Сургалт, арга хэмжээ", href: "/work/consulting/events" },
          { label: "Туршлага судлах аялал", href: "/work/consulting/study-tours" },
          { label: "Орчуулгын үйлчилгээ", href: "/work/consulting/translation" },
        ],
      },
    ],
  },
  {
    label: "МЭДЭЭЛЭЛ",
    href: "/news",
    children: [
      { label: "Ярилцлага", href: "/news?category=interview" },
      { label: "Шинэ бүтээл", href: "/news?category=publication" },
      { label: "Мэдээ", href: "/news?category=news" },
    ],
  },
  { label: "ЗУРГИЙН ЦОМОГ", href: "/gallery" },
  { label: "НЭВТРЭХ", href: "/members" },
  { label: "ХОЛБОО БАРИХ", href: "/contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-stone-900 tracking-tight">
              ЗӨӨЛӨН ХОТ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
                {"children" in item && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg min-w-[200px] py-2">
                    {item.children?.map((group) => (
                      "children" in group ? (
                        <div key={group.label}>
                          <div className="px-4 py-1 text-xs font-bold text-stone-500 uppercase tracking-wider mt-2">
                            {group.label}
                          </div>
                          {group.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={group.label}
                          href={group.href || "#"}
                          className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        >
                          {group.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            {session && (
              <button
                onClick={() => signOut()}
                className="px-3 py-2 text-xs font-semibold text-stone-500 hover:text-stone-900 tracking-wide"
              >
                ГАРАХ
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-stone-700"
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
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2 text-sm font-semibold text-stone-800"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {"children" in item && item.children?.map((group) => (
                "children" in group ? (
                  <div key={group.label} className="pl-4">
                    {group.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-1.5 text-sm text-stone-600"
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={group.label}
                    href={group.href || "#"}
                    className="block pl-4 py-1.5 text-sm text-stone-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {group.label}
                  </Link>
                )
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
