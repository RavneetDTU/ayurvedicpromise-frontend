import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, type = 'text', id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="font-body text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          className={`w-full border border-border-light rounded-xl px-4 py-3 bg-cream-white text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="font-body text-xs text-red-500 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
