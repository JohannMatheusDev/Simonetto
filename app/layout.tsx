import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Simonetto Guarapuava | Móveis Planejados",
    template: "%s | Simonetto Guarapuava",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [{ url: "/images/loja/living-cozinha.jpg", width: 1360, height: 907 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
