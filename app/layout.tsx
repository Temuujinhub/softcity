import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Зөөлөн хот — Softcity Mongolia",
  description: "Зөөлөн хотын шийдэл НҮТББ — Монгол улсад хүний хэмжээний, тогтвортой хот байгуулалтыг дэмжигч байгууллага.",
  keywords: ["soft city", "зөөлөн хот", "placemaking", "Mongolia", "urban planning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className="antialiased bg-[#FAF9F6] text-stone-900">
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
