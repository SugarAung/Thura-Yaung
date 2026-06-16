import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function Tag({ children, color, className, onClick, active }: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        active
          ? 'bg-brand-lavender-600 text-white'
          : 'bg-neutral-warm100 text-gray-600 hover:bg-neutral-warm200',
        onClick && 'cursor-pointer transition-colors',
        color,
        className
      )}
    >
      {children}
    </span>
  );
}
