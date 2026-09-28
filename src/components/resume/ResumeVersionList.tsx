import type { ResumeVersion } from '../../types';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';

interface ResumeVersionListProps {
  versions: ResumeVersion[];
  onSelectVersion: (version: ResumeVersion) => void;
}

export const ResumeVersionList: React.FC<ResumeVersionListProps> = ({
  versions,
  onSelectVersion,
}) => {
  if (versions.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-zinc-400 bg-zinc-50 border border-zinc-200/70 rounded-xl">
        No tailored versions generated yet. Tailor your resume for any discovered job to generate targeted versions.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {versions.map((version) => (
        <div
          key={version.id}
          onClick={() => onSelectVersion(version)}
          className="bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-black">
                  {version.jobTitle} — {version.company}
                </h4>
                <span className="text-[10px] px-1.5 py-0.2 bg-zinc-100 text-zinc-600 rounded font-medium">
                  Version {version.versionNumber}
                </span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-1">
                {version.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
            <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900">
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              <span>{version.matchScore}% match</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">
              {formatRelativeTime(version.createdAt)}
            </span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      ))}
    </div>
  );
};
