import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeadCapturePopup } from "@/components/lead-capture-popup";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Makeup Artist | Book Your Look",
  description: "High-conversion website showcasing premium bridal, event, and editorial makeup artistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen pt-20`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <LeadCapturePopup />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
