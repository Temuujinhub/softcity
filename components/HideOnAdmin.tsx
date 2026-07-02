"use client";

import { usePathname } from "next/navigation";

/** /admin замуудад доторх агуулгыг (ж: Footer) нуудаг бүрхүүл. */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
