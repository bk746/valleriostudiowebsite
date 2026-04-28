import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./hero-arrow.css";
import "./hero-letters.css";
import "./hero-words.css";
import "./services-anim.css";
import "./approche-anim.css";
import "./intro-anim.css";
import "./section-transition-anim.css";
import ScrollResetOnLoad from "@/components/layouts/ScrollResetOnLoad";
import Intro from "@/components/layouts/Intro";
import SectionTransition from "@/components/layouts/SectionTransition";
import HomePendingSectionTransition from "@/components/layouts/HomePendingSectionTransition";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vallerio Studio — On conçoit des sites qui convertissent",
  description:
    "Studio digital basé à Annecy. On imagine, on conçoit et on développe des sites web qui transforment vos visiteurs en clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ScrollResetOnLoad />
        <Intro />
        <SectionTransition />
        <HomePendingSectionTransition />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
