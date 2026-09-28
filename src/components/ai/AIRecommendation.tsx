import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIRecommendationProps {
  score: number;
  recommendation: string;
  explanation: string;
  strengthPoints?: string[];
}

export const AIRecommendation: React.FC<AIRecommendationProps> = ({
  score,
  recommendation,
  explanation,
  strengthPoints = [],
}) => {
  return (
    <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-zinc-800" />
          <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
            Agent Evaluation
          </h4>
        </div>
        <span className="text-xs font-semibold text-zinc-900 px-2 py-0.5 rounded bg-white border border-zinc-200">
          {score}% · {recommendation}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
        {explanation}
      </p>

      {strengthPoints.length > 0 && (
        <div className="pt-2 border-t border-zinc-200/60 space-y-1.5">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Key Match Factors
          </div>
          <ul className="space-y-1 text-xs text-zinc-600">
            {strengthPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
