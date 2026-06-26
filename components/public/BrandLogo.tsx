import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'white';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className = '' }) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-cream-white text-white' : 'text-sage-dark';

  const Icon = () => (
    <Image
      src="/images/logo.svg"
      alt="Ayurvedic Promise Logo"
      width={53}
      height={40}
      className="h-10 w-auto select-none"
      priority
    />
  );

  if (variant === 'icon') {
    return <Icon />;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Icon />
      <span className={`font-display font-semibold text-base md:text-lg tracking-wider ${textColor} uppercase leading-none`}>
        Ayurvedic Promise
      </span>
    </div>
  );
};
