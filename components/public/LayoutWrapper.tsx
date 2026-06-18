'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StickyConsultCTA } from './StickyConsultCTA';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <div className="font-admin min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="font-body bg-cream-white text-text-primary min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px] bg-cream-white">
        {children}
      </main>
      <Footer />
      <StickyConsultCTA />
    </div>
  );
};
