import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIResultProps {
  title: string;
  badgeText?: string;
  children: React.ReactNode;
}

export const AIResult: React.FC<AIResultProps> = ({
  title,
  badgeText,
  children,
}) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
          <h4 className="text-xs font-semibold text-zinc-900">{title}</h4>
        </div>
        {badgeText && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-mono text-zinc-600">
            {badgeText}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};
