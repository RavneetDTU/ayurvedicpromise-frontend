import { getPublishedBlogs } from '@/lib/api';
import { BlogListingClient } from '@/components/public/BlogListingClient';

export const revalidate = 60; // Incremental Static Regeneration (ISR) revalidate rate in seconds

export const metadata = {
  title: 'Hormonal Health Blog',
  description: 'Read doctor-backed Ayurvedic articles on managing PCOS symptoms, weight gain, acne, fatigue, and hair fall naturally.',
};

const fallbackBlogs = [
  {
    id: '1',
    slug: 'understanding-pcos-ayurvedic-perspective',
    title: 'Understanding PCOS: The Gentle Ayurvedic Perspective to Healing',
    content_en: '{}',
    excerpt: 'Discover how Ayurveda looks at PCOS/PCOD not as a disease, but as a temporary dosha imbalance that can be resolved with lifestyle, herbs, and diet.',
    category: 'PCOS',
    featured_image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    available_languages: ['en', 'hi'],
    status: 'published' as const,
    author_id: 'doctor-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'ayurvedic-herbs-for-pcos-hair-loss',
    title: '5 Powerful Ayurvedic Herbs to Stop PCOS Hair Fall',
    content_en: '{}',
    excerpt: 'Struggling with thinning hair and scalp exposure? Learn how herbs like Bhringraj, Amla, and Brahmi restore hair follicles naturally.',
    category: 'Hair Fall',
    featured_image_url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=600&auto=format&fit=crop',
    available_languages: ['en'],
    status: 'published' as const,
    author_id: 'doctor-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'diet-chart-for-pcos-weight-loss',
    title: 'The Ultimate Ayurvedic Diet Chart for PCOS Weight Loss',
    content_en: '{}',
    excerpt: 'Struggling to lose weight despite eating less? It might be low Kapha metabolism. Follow this simple Ayurvedic meal guide to trigger fat burn.',
    category: 'Weight Loss',
    featured_image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
    available_languages: ['en', 'hinglish'],
    status: 'published' as const,
    author_id: 'doctor-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export default async function BlogListingPage() {
  let blogs = [];
  try {
    const fetched = await getPublishedBlogs('All', 1, 100, { next: { revalidate: 60 } }); // Fetch up to 100 blogs for static filtering
    if (!fetched || fetched.length === 0) {
      blogs = fallbackBlogs;
    } else {
      blogs = fetched;
    }
  } catch (error) {
    console.error('Failed to fetch blogs in list page:', error);
    blogs = fallbackBlogs;
  }

  return <BlogListingClient initialBlogs={blogs} />;
}
