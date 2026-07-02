import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Зөөлөн хот — Softcity Mongolia",
  description:
    "Зөөлөн хотын шийдэл НҮТББ — Монгол улсад хүн төвтэй, тогтвортой хот төлөвлөлтийг дэмждэг байгууллага.",
  keywords: ["soft city", "зөөлөн хот", "placemaking", "Mongolia", "urban planning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={inter.variable}>
      <body className="antialiased bg-[#FAF9F6] text-[#141414]" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
