import type { Metadata } from "next";
import { Manrope, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

import Script from "next/script";

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
    canonical: `${COMPANY.siteUrl}/`,
  },
  openGraph: {
    type: "website",
    locale: COMPANY.seo.locale,
    siteName: COMPANY.name,
    title: COMPANY.seo.defaultTitle,
    description: COMPANY.seo.defaultDescription,
    url: `${COMPANY.siteUrl}/`,
    images: [
      {
        url: `${COMPANY.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SOMYA INNOVATIONS — AI, IT & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY.seo.defaultTitle,
    description: COMPANY.seo.defaultDescription,
    images: [`${COMPANY.siteUrl}/og-image.jpg`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
        {/* Google Analytics 4 (Only active when configured) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
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
        <Analytics />
      </body>
    </html>
  );
}
