import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/ceo",
          "/ceo/",
          "/tech-lead",
          "/tech-lead/",
          "/login",
          "/signup",
          "/forgot-password",
          "/reset-password",
          "/unauthorized",
          "/attendance",
          "/attendance/",
          "/api/",
          "/design-system",
          "/design-system/",
        ],
      },
    ],
    sitemap: `${COMPANY.siteUrl}/sitemap.xml`,
    host: COMPANY.siteUrl,
  };
}
