import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Inter } from 'next/font/google';
import { LayoutWrapper } from '@/components/public/LayoutWrapper';
import './globals.css';

// Configure Playfair Display font for displays and headers
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Configure DM Sans font for body text
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Configure Inter font for admin views
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Global SEO and Meta Tags defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://ayurvedicpromise.com'),
  title: {
    default: 'Ayurvedic Promise — Natural PCOS Treatment for Women',
    template: '%s | Ayurvedic Promise',
  },
  description:
    'Doctor-backed Ayurvedic treatment for PCOS, hair fall, weight gain, and irregular periods. Personalized plans for Indian women.',
  openGraph: {
    siteName: 'Ayurvedic Promise',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-terracotta/20 selection:text-terracotta">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
