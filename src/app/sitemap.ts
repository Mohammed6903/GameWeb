import { fetchAllGamesForSitemap } from '@/lib/controllers/games';
import { getAllCategoriesForSitemap } from '@/lib/controllers/categories';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetchAllGamesForSitemap();
  const categories = await getAllCategoriesForSitemap();

  const staticUrls = [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL!,
      lastModified: '2021-01-01',
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/about`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/contacts`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/cookies-policy`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/dmca`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/privacy-policy`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/terms`,
      lastModified: '2021-01-01',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/trending`,
      lastModified: '2021-01-01',
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/new`,
      lastModified: '2021-01-01',
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ];

  return [
    ...staticUrls,
    ...(response
      ? response.map((game) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/games/${game.id}`,
          lastModified: game.updated_at,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      : []),
    ...(categories
      ? categories.map((category) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category.category}`,
          lastModified: '2021-01-01',
          changeFrequency: 'monthly' as const,
          priority: 0.4,
        }))
      : []),
  ];
}