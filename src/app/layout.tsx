import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diesel Labs | Build. Maintain. Monitor.",
  description: "AI solutions for businesses that want results, not research projects. We bridge the gap between AI hype and real business value.",
  keywords: ["AI", "artificial intelligence", "machine learning", "automation", "business solutions", "AI consulting"],
  authors: [{ name: "Diesel Labs" }],
  openGraph: {
    title: "Diesel Labs | Build. Maintain. Monitor.",
    description: "AI solutions for businesses that want results, not research projects.",
    type: "website",
    url: "https://diesel.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
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
