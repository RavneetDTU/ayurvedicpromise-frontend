import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Calendar, BookOpen } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { slug, title, excerpt, category, featured_image_url, created_at } = blog;
  
  // Fallback image using Unsplash
  const imageSrc = featured_image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop';
  
  const trimmedExcerpt = excerpt
    ? excerpt.length > 100
      ? `${excerpt.substring(0, 100)}...`
      : excerpt
    : 'Read our latest blog post on Ayurvedic remedies and women\'s health tips.';

  const readTime = '5 min read';

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="bg-cream-white rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            priority={false}
          />
          {category && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="primary" className="bg-terracotta text-white font-medium shadow-sm border-0">
                {category}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col gap-3">
          {/* Date and Read Time Row */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="font-body text-sm text-text-muted line-clamp-3 leading-relaxed mt-1">
            {trimmedExcerpt}
          </p>
          
          {/* Read More Link */}
          <div className="mt-auto pt-4 flex items-center font-body text-sm font-semibold text-terracotta group-hover:text-terracotta-dark transition-colors gap-1">
            Read Article
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};
