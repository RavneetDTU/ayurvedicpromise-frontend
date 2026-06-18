import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-sage-dark text-white pt-16 pb-8 border-t border-sage/20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <BrandLogo variant="white" />
            <p className="font-body text-sm text-cream/80 leading-relaxed max-w-xs">
              Doctor-backed Ayurvedic healing for women dealing with PCOS, hair fall, and weight imbalance. Natural solutions that work.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold tracking-wider text-cream/70 uppercase mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/consult" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Conditions We Help */}
          <div>
            <h4 className="font-body text-sm font-semibold tracking-wider text-cream/70 uppercase mb-4">
              Conditions We Help
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/consult?symptom=Irregular+Periods" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  PCOS / PCOD
                </Link>
              </li>
              <li>
                <Link href="/consult?symptom=Hair+Fall" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Severe Hair Fall
                </Link>
              </li>
              <li>
                <Link href="/consult?symptom=Weight+Gain" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Weight Gain
                </Link>
              </li>
              <li>
                <Link href="/consult?symptom=Adult+Acne" className="font-body text-sm text-cream/90 hover:text-terracotta-light transition-colors">
                  Acne & Fatigue
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Info */}
          <div>
            <h4 className="font-body text-sm font-semibold tracking-wider text-cream/70 uppercase mb-4">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5 text-sm text-cream/90">
                <Phone className="h-4 w-4 text-terracotta-light flex-shrink-0" />
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-light transition-colors">
                  +91 (WhatsApp Support)
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream/90">
                <Mail className="h-4 w-4 text-terracotta-light flex-shrink-0" />
                <a href="mailto:support@ayurvedicpromise.com" className="hover:text-terracotta-light transition-colors">
                  support@ayurvedicpromise.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Ayurvedic Promise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-cream/60">
            <Link href="/privacy-policy" className="hover:text-terracotta-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-terracotta-light transition-colors">
              Medical Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
