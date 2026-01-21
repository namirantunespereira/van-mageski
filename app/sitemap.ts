
import type { MetadataRoute } from "next";
import { getTattoosFromNotion } from "@/lib/notion";
import { getAllLocalTattoos } from "@/lib/gallery";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || "https://van-mageski.vercel.app";
  const notion = await getTattoosFromNotion();
  const items = notion.length ? notion : getAllLocalTattoos();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = items.map((t) => ({
    url: `${base}/portfolio/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
