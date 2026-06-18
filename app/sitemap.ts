import { MetadataRoute } from 'next';
import { getPublishedBlogs } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayurvedicpromise.com';

  // Core static marketing and compliance pages
  const staticRoutes = [
    '',
    '/about',
    '/consult',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/disclaimer',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch published blogs from API to append to the sitemap dynamically
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublishedBlogs('All', 1, 100);
    blogRoutes = blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap generation:', error);
    // Fallback static blog route for build reliability
    blogRoutes = [
      {
        url: `${BASE_URL}/blog/understanding-pcos-ayurvedic-perspective`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ];
  }

  return [...staticRoutes, ...blogRoutes];
}
