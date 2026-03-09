import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Админ | Зөөлөн хот" };

const adminNav = [
  { href: "/admin", label: "Хяналтын самбар" },
  { href: "/admin/articles", label: "Нийтлэл" },
  { href: "/admin/gallery", label: "Зургийн цомог" },
  { href: "/admin/members", label: "Гишүүний агуулга" },
  { href: "/admin/users", label: "Хэрэглэгчид" },
  { href: "/admin/subscribers", label: "Мейл бүртгэл" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <Link href="/" className="font-bold text-lg text-white">ЗӨӨЛӨН ХОТ</Link>
          <p className="text-stone-400 text-xs mt-1">Админ хэнэл</p>
        </div>
        <nav className="flex-1 p-4">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors mb-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800">
          <Link
            href="/api/auth/signout"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            Гарах
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
