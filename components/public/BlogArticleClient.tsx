'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/types';
import { LeadForm } from './LeadForm';
import { BlogCard } from './BlogCard';
import { TipTapRenderer, TipTapNode } from './TipTapRenderer';
import { formatDate } from '@/lib/utils';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';

interface BlogArticleClientProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export const BlogArticleClient: React.FC<BlogArticleClientProps> = ({ blog, relatedBlogs }) => {
  // Determine which language to render first (must be one from available_languages, defaulting to 'en')
  const defaultLang = (blog.available_languages?.includes('en') 
    ? 'en' 
    : (blog.available_languages?.[0] || 'en')) as 'en' | 'hi' | 'hinglish';

  const [lang, setLang] = useState<'en' | 'hi' | 'hinglish'>(defaultLang);

  // Retrieve correct title and content based on language tab selection
  const title = useMemo(() => {
    if (lang === 'hi' && blog.title_hi) return blog.title_hi;
    if (lang === 'hinglish' && blog.title_hinglish) return blog.title_hinglish;
    return blog.title; // Default to English title
  }, [blog, lang]);

  const contentJson = useMemo(() => {
    if (lang === 'hi' && blog.content_hi) return blog.content_hi;
    if (lang === 'hinglish' && blog.content_hinglish) return blog.content_hinglish;
    return blog.content_en; // Default to English content JSON
  }, [blog, lang]);

  // Fallback image using Unsplash
  const imageSrc = blog.featured_image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop';

  // Programmatically split nodes to insert LeadForm after 3rd paragraph
  const contentSection = useMemo(() => {
    if (!contentJson) return null;
    
    try {
      const doc = JSON.parse(contentJson);
      if (doc.type !== 'doc' || !Array.isArray(doc.content)) {
        return <TipTapRenderer jsonStr={contentJson} />;
      }

      const nodes = doc.content as TipTapNode[];
      let paragraphCount = 0;
      const firstSection: TipTapNode[] = [];
      const secondSection: TipTapNode[] = [];

      nodes.forEach((node) => {
        if (paragraphCount < 3) {
          firstSection.push(node);
          if (node.type === 'paragraph') {
            paragraphCount++;
          }
        } else {
          secondSection.push(node);
        }
      });

      const firstJson = JSON.stringify({ type: 'doc', content: firstSection });
      const secondJson = JSON.stringify({ type: 'doc', content: secondSection });

      return (
        <div className="flex flex-col gap-6">
          <TipTapRenderer jsonStr={firstJson} />
          
          {/* Embedded Inline Lead Form */}
          <div className="my-8 bg-cream border border-border-light rounded-2xl p-4 md:p-6 shadow-sm">
            <LeadForm variant="inline" />
          </div>

          {secondSection.length > 0 && <TipTapRenderer jsonStr={secondJson} />}
        </div>
      );
    } catch {
      // Catch parsing errors, render standard block
      return <TipTapRenderer jsonStr={contentJson} />;
    }
  }, [contentJson]);

  // Article Schema Markup for Google SEO
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'name': title,
    'description': blog.excerpt || 'Ayurvedic health advice from Ayurvedic Promise.',
    'image': imageSrc,
    'datePublished': blog.published_at || blog.created_at,
    'dateModified': blog.updated_at,
    'author': {
      '@type': 'Person',
      'name': 'Dr. Priya Sharma',
      'jobTitle': 'Senior Ayurvedic Physician',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Ayurvedic Promise',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ayurvedicpromise.com/logo-full.png',
      },
    },
  };

  return (
    <article className="min-h-screen bg-cream-white pb-16">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-cream border-b border-border-light/40 py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-2 text-xs font-body text-text-muted">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-terracotta">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-primary line-clamp-1">{title}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* Language Tabs bar */}
        {blog.available_languages && blog.available_languages.length > 1 && (
          <div className="flex items-center gap-2 bg-cream p-1 rounded-full border border-border-light max-w-sm mb-6">
            {blog.available_languages.includes('en') && (
              <button
                onClick={() => setLang('en')}
                className={`flex-1 font-body text-xs font-semibold py-2 rounded-full transition-all focus:outline-none ${
                  lang === 'en' ? 'bg-white text-terracotta shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                English
              </button>
            )}
            {blog.available_languages.includes('hi') && (
              <button
                onClick={() => setLang('hi')}
                className={`flex-1 font-body text-xs font-semibold py-2 rounded-full transition-all focus:outline-none ${
                  lang === 'hi' ? 'bg-white text-terracotta shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                हिन्दी
              </button>
            )}
            {blog.available_languages.includes('hinglish') && (
              <button
                onClick={() => setLang('hinglish')}
                className={`flex-1 font-body text-xs font-semibold py-2 rounded-full transition-all focus:outline-none ${
                  lang === 'hinglish' ? 'bg-white text-terracotta shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Hinglish
              </button>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-sage-dark mb-4 leading-tight">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-body text-text-muted mb-8 border-b border-border-light pb-4">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            By Dr. Priya Sharma
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Published: {formatDate(blog.published_at || blog.created_at)}
          </span>
          {blog.category && (
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Category: {blog.category}
            </span>
          )}
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm bg-cream border border-border-light/40 mb-10">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-w-768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Article Text Content */}
        <div className="prose max-w-none text-left">
          {contentSection}
        </div>

        {/* Author Block */}
        <div className="mt-16 bg-cream border border-border-light rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-cream-dark shadow flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
              alt="Dr. Priya Sharma BAMS"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-body font-bold text-terracotta uppercase tracking-wider">
              Article Author & Medical Reviewer
            </span>
            <h3 className="font-display text-xl font-bold text-sage-dark">
              Dr. Priya Sharma, BAMS
            </h3>
            <p className="font-body text-xs text-text-muted">
              Senior Ayurvedic Physician & Gynecological Specialist at Ayurvedic Promise. Dr. Priya reviews all published health guides to ensure clinical accuracy and compliance with traditional formulations.
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 border-t border-border-light pt-12">
            <h3 className="font-display text-2xl font-bold text-sage-dark text-left mb-8">
              Related Articles You Might Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((relBlog) => (
                <BlogCard key={relBlog.id} blog={relBlog} />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
