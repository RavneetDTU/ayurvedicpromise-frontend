import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SymptomCardProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const SymptomCard: React.FC<SymptomCardProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-cream-white rounded-2xl border border-border-light shadow-sm hover:border-terracotta hover:bg-terracotta/5 hover:shadow transition-all duration-300 w-full min-w-[130px] aspect-square flex-shrink-0 text-center select-none active:scale-95 group focus:outline-none focus:ring-2 focus:ring-terracotta"
    >
      <div className="w-12 h-12 rounded-full bg-cream-dark/20 text-terracotta group-hover:bg-terracotta group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <span className="font-body text-sm font-semibold text-text-primary group-hover:text-terracotta-dark transition-colors">
        {label}
      </span>
    </button>
  );
};
