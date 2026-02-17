import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diesel Labs | Build. Maintain. Monitor.",
  description: "AI solutions for businesses that want results, not research projects. We bridge the gap between AI hype and real business value.",
  keywords: ["AI", "artificial intelligence", "machine learning", "automation", "business solutions", "AI consulting", "AI development", "workflow automation"],
  authors: [{ name: "Diesel Labs" }],
  metadataBase: new URL("https://diesel.dev"),
  openGraph: {
    title: "Diesel Labs | Build. Maintain. Monitor.",
    description: "AI solutions for businesses that want results, not research projects. Custom AI development, workflow automation, and ongoing support.",
    type: "website",
    url: "https://diesel.dev",
    siteName: "Diesel Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diesel Labs - Build. Maintain. Monitor.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diesel Labs | Build. Maintain. Monitor.",
    description: "AI solutions for businesses that want results, not research projects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="diesel.dev"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
