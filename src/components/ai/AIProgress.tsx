import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Stage {
  name: string;
  isComplete: boolean;
  isCurrent: boolean;
}

interface AIProgressProps {
  title: string;
  subtitle?: string;
  stages: Stage[];
  progress: number;
}

export const AIProgress: React.FC<AIProgressProps> = ({
  title,
  subtitle,
  stages,
  progress,
}) => {
  return (
    <div className="p-6 sm:p-8 text-center space-y-6 max-w-md mx-auto">
      {/* Title & Spinner */}
      <div className="space-y-2">
        <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mx-auto">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
        </div>
        <h3 className="text-base font-semibold text-zinc-900 tracking-tight">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
      </div>

      {/* Thin Linear Progress Bar */}
      <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden border border-zinc-200/50">
        <div
          className="bg-zinc-900 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stage Checklist */}
      <div className="space-y-2.5 text-left border border-zinc-200/70 rounded-xl p-4 bg-zinc-50/50">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center justify-between text-xs transition-colors py-1',
              stage.isComplete
                ? 'text-zinc-900 font-medium'
                : stage.isCurrent
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-400'
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  'w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0',
                  stage.isComplete
                    ? 'bg-zinc-900 text-white'
                    : stage.isCurrent
                    ? 'border-2 border-zinc-900 text-zinc-900'
                    : 'border border-zinc-300 text-zinc-400'
                )}
              >
                {stage.isComplete ? <Check className="w-2.5 h-2.5" /> : idx + 1}
              </div>
              <span>{stage.name}</span>
            </div>

            {stage.isCurrent && (
              <span className="text-[10px] text-zinc-500 font-mono animate-pulse">
                Processing...
              </span>
            )}
            {stage.isComplete && (
              <span className="text-[10px] text-emerald-600 font-mono">
                ✓ Done
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
