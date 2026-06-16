import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const PADDING = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-8',
};

export default function Card({ children, className, hover, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-card shadow-card',
        PADDING[padding],
        hover && 'transition-shadow duration-200 hover:shadow-card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
