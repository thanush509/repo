import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

interface ApplicationStepsProps {
  currentStep: number; // 1 to 5
  onStepClick?: (step: number) => void;
  maxAccessibleStep?: number;
}

export const ApplicationSteps: React.FC<ApplicationStepsProps> = ({
  currentStep,
  onStepClick,
  maxAccessibleStep = 5,
}) => {
  const steps = [
    { number: 1, label: 'Resume' },
    { number: 2, label: 'Cover letter' },
    { number: 3, label: 'Questions' },
    { number: 4, label: 'Review' },
    { number: 5, label: 'Submit' },
  ];

  return (
    <div className="w-full bg-white border border-zinc-200/80 rounded-xl p-3 sm:p-4 shadow-xs">
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {steps.map((step) => {
          const isComplete = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isAccessible = step.number <= maxAccessibleStep;

          return (
            <button
              key={step.number}
              disabled={!isAccessible}
              onClick={() => onStepClick?.(step.number)}
              className={cn(
                'flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2 p-2 rounded-lg text-left transition-all',
                isCurrent
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : isComplete
                  ? 'text-zinc-700 hover:bg-zinc-50'
                  : 'text-zinc-400 opacity-60 cursor-not-allowed',
                isAccessible && !isCurrent ? 'cursor-pointer' : ''
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors',
                  isComplete
                    ? 'bg-zinc-900 text-white'
                    : isCurrent
                    ? 'border-2 border-zinc-900 text-zinc-900'
                    : 'border border-zinc-300 text-zinc-400'
                )}
              >
                {isComplete ? <Check className="w-3 h-3" /> : `0${step.number}`}
              </div>

              <span className="text-[11px] sm:text-xs truncate text-center sm:text-left">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
