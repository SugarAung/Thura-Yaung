import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const VARIANT_STYLES = {
  primary:   'bg-brand-lavender-600 text-white hover:bg-brand-lavender-700 active:scale-95',
  secondary: 'bg-brand-teal-500 text-white hover:bg-brand-teal-700 active:scale-95',
  ghost:     'bg-transparent text-brand-lavender-600 border border-brand-lavender-200 hover:bg-brand-lavender-50 active:scale-95',
  danger:    'bg-red-100 text-red-700 hover:bg-red-200 active:scale-95',
  success:   'bg-green-100 text-green-700 hover:bg-green-200 active:scale-95',
};

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-3.5 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        'font-medium transition-all duration-150 inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender-400',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed active:scale-100',
        className
      )}
    >
      {children}
    </button>
  );
}
