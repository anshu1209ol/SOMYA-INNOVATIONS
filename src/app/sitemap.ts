import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants/company";
import { getProducts } from "@/lib/products";
import { getResources } from "@/lib/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = COMPANY.siteUrl;
  
  // Stable content release dates to prevent false lastmod churn on every deployment
  const staticContentDate = "2025-03-15T00:00:00.000Z";
  const productContentDate = "2025-03-10T00:00:00.000Z";

  // Canonical Indexable Public URLs per Section 9
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/ai-automation`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/it-solutions`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/digital-solutions`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: staticContentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: staticContentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request-quote`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Legal & Compliance Pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticContentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticContentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: staticContentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: staticContentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Public Products (only published, non-placeholder records)
  const products = await getProducts();
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => !product.isDemoPlaceholder)
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: productContentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Dynamic Public Resources
  const articles = await getResources();
  const resourceRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/resources/${article.slug}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : staticContentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...resourceRoutes];
}
