import type { ResumeVersion } from '../../types';
import { Button } from '../common/Button';
import { Check, CheckCircle2, RotateCw, Sparkles } from 'lucide-react';

interface ResumeComparisonProps {
  tailoredVersion: ResumeVersion;
  onUseVersion: (version: ResumeVersion) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export const ResumeComparison: React.FC<ResumeComparisonProps> = ({
  tailoredVersion,
  onUseVersion,
  onRegenerate,
  isRegenerating = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Match Upgrade */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-800" />
            <span className="text-sm font-semibold text-zinc-900">
              Resume Tailored for {tailoredVersion.company}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 text-white font-medium">
              v{tailoredVersion.versionNumber}
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Targeted for <strong className="text-zinc-800">{tailoredVersion.jobTitle}</strong> ({tailoredVersion.matchScore}% Match)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            isLoading={isRegenerating}
            leftIcon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Regenerate
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUseVersion(tailoredVersion)}
            leftIcon={<Check className="w-3.5 h-3.5" />}
          >
            Use this version
          </Button>
        </div>
      </div>

      {/* Key Tailored Highlights */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Key Optimization Highlights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {tailoredVersion.tailoredHighlights.map((hl, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-xs text-emerald-950 flex items-start gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Split Screen Diff Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Side-by-Side Comparison
          </h4>
          <span className="text-[11px] text-zinc-400">
            Green highlights indicate customized enhancements
          </span>
        </div>

        <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200 bg-white">
          {tailoredVersion.diffs.map((diff, index) => (
            <div key={index} className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                <span>{diff.field}</span>
                <span className="text-[11px] text-zinc-500 font-normal italic">
                  {diff.explanation}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Original */}
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Original Baseline
                  </div>
                  <p className="text-zinc-600 leading-relaxed font-mono text-[11px]">
                    {diff.original}
                  </p>
                </div>

                {/* Tailored */}
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                  <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
                    <span>AI Tailored Version</span>
                    <span>✓ Aligned</span>
                  </div>
                  <p className="text-emerald-950 leading-relaxed font-mono text-[11px]">
                    {diff.tailored}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
