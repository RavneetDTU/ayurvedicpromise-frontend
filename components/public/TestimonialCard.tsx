import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  condition: string;
  result: string;
  quote: string;
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  condition,
  result,
  quote,
  rating = 5,
}) => {
  return (
    <div className="bg-cream-white rounded-2xl p-6 border border-border-light shadow-sm flex flex-col justify-between gap-4 h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col gap-3">
        {/* Stars */}
        <div className="flex items-center gap-0.5 text-yellow-500">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <p className="font-body text-sm italic text-text-primary leading-relaxed">
          &quot;{quote}&quot;
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
        <div>
          <h4 className="font-body text-sm font-semibold text-text-primary">
            {name}
          </h4>
          <span className="font-body text-xs text-text-muted">
            {condition}
          </span>
        </div>
        <span className="bg-sage/10 text-sage font-body text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {result}
        </span>
      </div>
    </div>
  );
};
