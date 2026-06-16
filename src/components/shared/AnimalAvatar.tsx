'use client';

import { AnimalKey } from '@/types';
import { cn } from '@/lib/utils';

const ANIMAL_MAP: Record<AnimalKey, { emoji: string; bg: string }> = {
  owl:      { emoji: '🦉', bg: 'bg-amber-100' },
  fox:      { emoji: '🦊', bg: 'bg-orange-100' },
  bear:     { emoji: '🐻', bg: 'bg-yellow-100' },
  deer:     { emoji: '🦌', bg: 'bg-lime-100' },
  rabbit:   { emoji: '🐰', bg: 'bg-pink-100' },
  panda:    { emoji: '🐼', bg: 'bg-gray-100' },
  elephant: { emoji: '🐘', bg: 'bg-slate-100' },
  tiger:    { emoji: '🐯', bg: 'bg-orange-50' },
  cat:      { emoji: '🐱', bg: 'bg-rose-100' },
  dog:      { emoji: '🐶', bg: 'bg-yellow-50' },
  lion:     { emoji: '🦁', bg: 'bg-amber-50' },
  penguin:  { emoji: '🐧', bg: 'bg-blue-100' },
};

interface AnimalAvatarProps {
  animal: AnimalKey;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLabel?: boolean;
}

const SIZE_MAP = {
  sm: { container: 'w-8 h-8 text-base', label: 'text-xs' },
  md: { container: 'w-12 h-12 text-2xl', label: 'text-sm' },
  lg: { container: 'w-16 h-16 text-3xl', label: 'text-sm' },
  xl: { container: 'w-24 h-24 text-5xl', label: 'text-base' },
};

export default function AnimalAvatar({ animal, size = 'md', className, showLabel }: AnimalAvatarProps) {
  const { emoji, bg } = ANIMAL_MAP[animal] ?? ANIMAL_MAP.owl;
  const { container, label } = SIZE_MAP[size];

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div className={cn('rounded-full flex items-center justify-center flex-shrink-0', bg, container)}>
        {emoji}
      </div>
      {showLabel && (
        <span className={cn('text-gray-500 capitalize', label)}>{animal}</span>
      )}
    </div>
  );
}

// Picker variant — grid of selectable avatars
interface AnimalAvatarPickerProps {
  selected: AnimalKey;
  onSelect: (key: AnimalKey) => void;
}

const ALL_ANIMALS = Object.keys(ANIMAL_MAP) as AnimalKey[];

export function AnimalAvatarPicker({ selected, onSelect }: AnimalAvatarPickerProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
      {ALL_ANIMALS.map((key) => {
        const { emoji, bg } = ANIMAL_MAP[key];
        const isSelected = selected === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all',
              isSelected
                ? 'border-brand-lavender-600 bg-brand-lavender-50 scale-105'
                : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
            )}
          >
            <div className={cn('w-12 h-12 rounded-full flex items-center justify-center text-2xl', bg)}>
              {emoji}
            </div>
            <span className="text-xs text-gray-500 capitalize">{key}</span>
          </button>
        );
      })}
    </div>
  );
}
