'use client';

import React, { useState, useMemo } from 'react';
import { Blog } from '@/types';
import { BlogCard } from './BlogCard';

interface BlogListingClientProps {
  initialBlogs: Blog[];
}

const CATEGORIES = ['All', 'PCOS', 'Hair Fall', 'Weight Loss', 'Diet', 'Lifestyle'];
const LANGUAGES = [
  { code: 'en', label: 'English (EN)' },
  { code: 'hi', label: 'हिन्दी (HI)' },
  { code: 'hinglish', label: 'Hinglish' },
] as const;

export const BlogListingClient: React.FC<BlogListingClientProps> = ({ initialBlogs }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');

  // Filter blogs in-memory for instant feedback and zero DB load
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      // 1. Filter by category if not 'All'
      const matchCategory =
        selectedCategory === 'All' ||
        blog.category?.toLowerCase() === selectedCategory.toLowerCase();

      // 2. Filter by language check in available_languages array
      // Available languages might look like: ['en', 'hi', 'hinglish']
      const matchLanguage = blog.available_languages?.includes(selectedLanguage);

      return matchCategory && matchLanguage;
    });
  }, [initialBlogs, selectedCategory, selectedLanguage]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider self-center">
          Knowledge Base
        </span>
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Ayurvedic Promise Health Hub
        </h1>
        <p className="font-body text-sm md:text-base text-text-muted">
          Doctor-verified articles, remedies, and recipes to help you heal hormonal imbalances naturally.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border-light">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none justify-start">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-all flex-shrink-0 focus:outline-none ${
                  isSelected
                    ? 'bg-sage text-white shadow-sm'
                    : 'bg-cream text-text-muted hover:bg-cream-dark/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-2 bg-cream p-1 rounded-full self-start md:self-auto border border-border-light">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`font-body text-xs font-semibold px-4 py-2 rounded-full transition-all focus:outline-none ${
                  isSelected
                    ? 'bg-white text-terracotta shadow'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cream rounded-3xl border border-border-light max-w-md mx-auto">
          <svg className="w-12 h-12 text-text-muted/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="font-body text-lg font-bold text-text-primary mb-1">
            No Articles Found
          </h3>
          <p className="font-body text-sm text-text-muted px-6">
            We don&apos;t have any articles under &quot;{selectedCategory}&quot; in {LANGUAGES.find(l => l.code === selectedLanguage)?.label} yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};
