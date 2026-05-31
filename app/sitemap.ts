import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cuentosparaninos.app";

  return [
    { url: `${baseUrl}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${baseUrl}/familia`, priority: 0.8, changeFrequency: "daily" },
    { url: `${baseUrl}/control-parental`, priority: 0.7, changeFrequency: "weekly" },
  ];
}
