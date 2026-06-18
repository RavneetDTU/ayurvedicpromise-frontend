'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const StickyConsultCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream-white/95 backdrop-blur-md border-t border-border-light shadow-lg px-6 py-4 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-body text-xs text-text-muted">Personalized Doctor Plan</span>
          <span className="font-body text-sm font-bold text-text-primary">First Call is 100% Free</span>
        </div>
        <Link href="/consult" className="flex-1 max-w-[200px]">
          <Button variant="primary" size="sm" className="w-full font-body text-sm py-2.5 px-4">
            Book Free Consult
          </Button>
        </Link>
      </div>
    </div>
  );
};
