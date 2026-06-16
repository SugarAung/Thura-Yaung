import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'verified' | 'pending' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  className?: string;
}

const BADGE_STYLES = {
  verified: 'bg-brand-teal-100 text-brand-teal-700',
  pending:  'bg-amber-100 text-amber-700',
  success:  'bg-green-100 text-green-700',
  warning:  'bg-yellow-100 text-yellow-700',
  danger:   'bg-red-100 text-red-700',
  info:     'bg-blue-100 text-blue-700',
  default:  'bg-gray-100 text-gray-700',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        BADGE_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
