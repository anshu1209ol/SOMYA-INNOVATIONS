import type { Metadata } from "next";
import { COMPANY } from "./constants/company";

export interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  openGraphType?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  openGraphType = "website",
  image = "/branding/og-card.png",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${COMPANY.siteUrl}${cleanPath}`;
  const fullImageUrl = image.startsWith("http") ? image : `${COMPANY.siteUrl}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: openGraphType,
      locale: COMPANY.seo.locale,
      url: canonicalUrl,
      title: `${title} | SOMYA INNOVATIONS`,
      description,
      siteName: COMPANY.name,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - SOMYA INNOVATIONS`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SOMYA INNOVATIONS`,
      description,
      images: [fullImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
}

/**
 * Generates Schema.org JSON-LD for Organization.
 * Strictly avoids fabricated data, fake certifications, or simulated testimonials.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.siteUrl,
    logo: `${COMPANY.siteUrl}/favicon.svg`,
    description: COMPANY.seo.defaultDescription,
    email: COMPANY.contact.email,
    telephone: COMPANY.contact.phone,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning Solutions",
      "IT Infrastructure",
      "Enterprise Computer Hardware",
      "Structured Networking",
      "Digital Software Solutions",
      "Technology Products",
      "Enterprise Systems Architecture",
    ],
  };
}

/**
 * Generates Schema.org JSON-LD for WebSite.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.siteUrl,
    description: COMPANY.seo.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
    },
  };
}
