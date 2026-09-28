import React from 'react';
import { cn } from '../../utils/cn';

interface JobMatchProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showBar?: boolean;
  className?: string;
}

export const JobMatch: React.FC<JobMatchProps> = ({
  score,
  size = 'md',
  showBar = true,
  className,
}) => {
  // Determine subtle styling
  const isHigh = score >= 90;
  const isMedium = score >= 75 && score < 90;

  const textStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  const barWidth = `${Math.min(100, Math.max(10, score))}%`;

  return (
    <div className={cn('inline-flex flex-col items-start gap-1', className)}>
      <div className="flex items-center gap-1.5 font-medium leading-none">
        <span
          className={cn(
            'tabular-nums font-semibold tracking-tight',
            textStyles[size],
            isHigh ? 'text-zinc-900' : isMedium ? 'text-zinc-700' : 'text-zinc-500'
          )}
        >
          {score}%
        </span>
        <span className="text-[11px] text-zinc-400 font-normal">match</span>
      </div>

      {showBar && (
        <div className="w-16 sm:w-20 h-1 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              isHigh ? 'bg-zinc-900' : isMedium ? 'bg-zinc-600' : 'bg-zinc-400'
            )}
            style={{ width: barWidth }}
          />
        </div>
      )}
    </div>
  );
};
