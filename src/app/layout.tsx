import type { Metadata } from "next";
import { Manrope, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: COMPANY.seo.defaultTitle,
    template: COMPANY.seo.titleTemplate,
  },
  description: COMPANY.seo.defaultDescription,
  keywords: COMPANY.seo.keywords,
  authors: [{ name: COMPANY.name }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/branding/logo-mark.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/icon.png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: COMPANY.seo.locale,
    siteName: COMPANY.name,
    title: COMPANY.seo.defaultTitle,
    description: COMPANY.seo.defaultDescription,
    url: COMPANY.siteUrl,
    images: [
      {
        url: "/branding/og-card.png",
        width: 1200,
        height: 630,
        alt: "SOMYA INNOVATIONS — Technology • AI • IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY.seo.defaultTitle,
    description: COMPANY.seo.defaultDescription,
    images: ["/branding/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={cn(manrope.variable, instrumentSerif.variable, "font-sans", geist.variable)}>
      <head>
        {/* Schema.org Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Schema.org WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#11110F] text-[#F1EBDD] selection:bg-[#641F2A] selection:text-[#F1EBDD]">
        {/* Skip to Main Content for keyboard & screen reader accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
