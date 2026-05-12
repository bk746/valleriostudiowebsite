import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteJsonLd from "@/components/layouts/SiteJsonLd";
import { SITE_DEFAULT_TITLE, SITE_DESCRIPTION } from "@/lib/seo-copy";
import { SITE_NAME, getSiteOrigin } from "@/lib/site";
import { SITE_KEYWORDS } from "@/lib/site-keywords";
import brandIcon from "@/src/images/vallerio-logo-noir.svg";
import "./globals.css";
import "./hero-arrow.css";
import "./hero-letters.css";
import "./hero-words.css";
import "./services-anim.css";
import "./service-page-anim.css";
import "./approche-anim.css";
import "./intro-anim.css";
import "./section-transition-anim.css";
import "./cursor.css";
import ScrollResetOnLoad from "@/components/layouts/ScrollResetOnLoad";
import Intro from "@/components/layouts/Intro";
import SectionTransition from "@/components/layouts/SectionTransition";
import HomePendingSectionTransition from "@/components/layouts/HomePendingSectionTransition";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SmoothScroll from "@/components/layouts/SmoothScroll";
import ScrollRouteSync from "@/components/layouts/ScrollRouteSync";
import Cursor from "@/components/layouts/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: getSiteOrigin() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [...SITE_KEYWORDS],
  category: "digital_product_studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: brandIcon.src, type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: [{ url: brandIcon.src }],
    apple: [{ url: brandIcon.src }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SiteJsonLd />
        <SmoothScroll />
        <ScrollRouteSync />
        <Cursor />
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
