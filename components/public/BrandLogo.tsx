import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'white';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className = '' }) => {
  const isWhite = variant === 'white';
  const iconColor = isWhite ? '#FDFAF7' : '#C97B5A'; // terracotta or warm-white
  const textColor = isWhite ? 'text-cream-white text-white' : 'text-sage-dark'; // sage-dark or cream-white

  // Lotus + Pulse heartbeat line SVG
  const Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-10 h-10 select-none"
      aria-hidden="true"
    >
      {/* Lotus Petals */}
      <path
        d="M50 25 C40 40 30 45 30 60 C30 75 45 78 50 78 C55 78 70 75 70 60 C70 45 60 40 50 25 Z"
        fill="none"
        stroke={iconColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 38 C43 48 37 53 37 63 C37 72 45 74 50 74 C55 74 63 72 63 63 C63 53 57 48 50 38 Z"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50 50 C46 56 42 60 42 66 C42 70 47 71 50 71 C53 71 58 70 58 66 C58 60 54 56 50 50 Z"
        fill={iconColor}
        opacity="0.8"
      />
      {/* Heartbeat Pulse line overlay */}
      <path
        d="M15 65 L32 65 L38 50 L44 80 L52 40 L58 70 L64 60 L70 65 L85 65"
        fill="none"
        stroke={isWhite ? '#A8C090' : '#5A7A4A'} // sage-light or sage-green
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
