'use client';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number; // 1-based
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      {/* Mobile: compact */}
      <div className="flex items-center justify-between sm:hidden mb-2">
        <span className="text-sm font-medium text-brand-lavender-600">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-sm text-gray-500">{steps[currentStep - 1]}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden sm:hidden">
        <div
          className="h-full bg-brand-lavender-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Desktop: full steps */}
      <div className="hidden sm:flex items-center">
        {steps.map((label, idx) => {
          const step = idx + 1;
          const isCompleted = step < currentStep;
          const isActive    = step === currentStep;
          return (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  isCompleted && 'bg-brand-teal-500 text-white',
                  isActive    && 'bg-brand-lavender-600 text-white ring-4 ring-brand-lavender-100',
                  !isCompleted && !isActive && 'bg-gray-100 text-gray-400'
                )}>
                  {isCompleted ? '✓' : step}
                </div>
                <span className={cn(
                  'text-xs mt-1 text-center leading-tight max-w-[70px]',
                  isActive ? 'text-brand-lavender-600 font-medium' : 'text-gray-400'
                )}>
                  {label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-2 mb-4 transition-all',
                  step < currentStep ? 'bg-brand-teal-500' : 'bg-gray-200'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
