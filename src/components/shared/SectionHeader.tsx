import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-10', className)}>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
