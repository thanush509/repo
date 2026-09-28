import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  barClassName?: string;
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  barClassName,
  size = 'sm',
  showLabel = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-zinc-500 mb-1">
          <span>Progress</span>
          <span className="font-medium text-zinc-800">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50',
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            'bg-zinc-900 h-full transition-all duration-300 ease-out rounded-full',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
