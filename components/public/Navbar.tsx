'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Closes mobile menu on transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Health Blog', href: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-cream-white/95 backdrop-blur-md shadow-sm py-3 border-b border-border-light/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="focus:outline-none">
          <BrandLogo variant="full" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-body text-sm font-medium text-text-primary hover:text-terracotta transition-colors duration-200 py-1"
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
          
          {/* Consult CTA Link */}
          <Link href="/consult">
            <Button variant="primary" size="sm" className="font-body">
              Book Free Consultation
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full text-text-primary hover:bg-cream-dark/20 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] md:hidden bg-cream-white z-30 flex flex-col items-center justify-center gap-8 p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-xl font-medium tracking-wide transition-colors ${
                    isActive ? 'text-terracotta border-b-2 border-terracotta pb-1' : 'text-text-primary hover:text-terracotta'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link href="/consult" className="w-full mt-4">
              <Button variant="primary" size="lg" className="w-full font-body">
                Book Free Consultation
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
