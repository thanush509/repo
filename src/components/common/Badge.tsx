import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'neutral'
    | 'ready'
    | 'applied'
    | 'interview'
    | 'rejected'
    | 'needs_input'
    | 'matched'
    | 'outline'
    | 'success'
    | 'warning';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded gap-1.5',
    md: 'text-xs px-2.5 py-1 rounded-md gap-1.5',
  };

  const variantStyles = {
    neutral: 'bg-zinc-100 text-zinc-700 border border-zinc-200/60',
    matched: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-medium',
    ready: 'bg-emerald-50 text-emerald-800 border border-emerald-200/70',
    applied: 'bg-blue-50 text-blue-800 border border-blue-200/70',
    interview: 'bg-purple-50 text-purple-800 border border-purple-200/70',
    rejected: 'bg-zinc-100 text-zinc-500 border border-zinc-200',
    needs_input: 'bg-amber-50 text-amber-800 border border-amber-200/70',
    outline: 'bg-transparent text-zinc-600 border border-zinc-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/70',
  };

  const dotStyles = {
    neutral: 'bg-zinc-400',
    matched: 'bg-zinc-700',
    ready: 'bg-emerald-500',
    applied: 'bg-blue-500',
    interview: 'bg-purple-500',
    rejected: 'bg-zinc-400',
    needs_input: 'bg-amber-500',
    outline: 'bg-zinc-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium leading-none whitespace-nowrap',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotStyles[variant])}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
