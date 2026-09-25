import type { Metadata } from "next";
import { Ancizar_Serif, Inter, Lora, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/Toaster";
import "./globals.css";

// Only the families actually used by the built frames (Geist, Hanken Grotesk and
// Zalando Sans Expanded appear only in the reference frames).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], style: ["normal", "italic"] });
const ancizar = Ancizar_Serif({ variable: "--font-ancizar", subsets: ["latin"], weight: ["400", "500"], style: ["italic"] });
const manrope = Manrope({ variable: "--font-manrope-var", subsets: ["latin"], weight: ["500", "800"] });
const lora = Lora({ variable: "--font-lora-var", subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: { default: "AFL Beauty Bar", template: "%s | AFL Beauty Bar" },
  description: "Personalized injectables, skin, body and wellness treatments with a clear consultation and booking process.",
  robots: { index: false, follow: false }, // review build — keep out of search engines
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${ancizar.variable} ${manrope.variable} ${lora.variable}`}>
      <body>
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
