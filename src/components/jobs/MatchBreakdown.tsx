import type { Job, JobMatch } from '../../types';
import { JobMatch as MatchBar } from './JobMatch';
import { Button } from '../common/Button';
import { Check, Sparkles, Wand2, Send, AlertCircle } from 'lucide-react';

interface MatchBreakdownProps {
  job: Job;
  match: JobMatch;
  onTailorResume: () => void;
  onPrepareApplication: () => void;
  hasApplied?: boolean;
}

export const MatchBreakdown: React.FC<MatchBreakdownProps> = ({
  job: _job,
  match,
  onTailorResume,
  onPrepareApplication,
  hasApplied = false,
}) => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs sticky top-20">
      {/* Top Match Score */}
      <div className="border-b border-zinc-100 pb-4 space-y-2">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          AI Match Analysis
        </div>
        <div className="flex items-baseline justify-between">
          <MatchBar score={match.score} size="lg" />
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/70">
            {match.recommendation}
          </span>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-3.5 text-xs">
        {/* Skills */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-500 font-medium">
            <span>Skills Alignment</span>
            <span className="text-zinc-900 font-semibold">{match.skillsMatch}%</span>
          </div>
          <div className="space-y-1 pt-1">
            {match.matchedSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-2 text-zinc-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
            {match.missingSkills.length > 0 && (
              <div className="flex items-center gap-2 text-zinc-400 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Missing: {match.missingSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-zinc-700">
          <span className="text-zinc-500">Experience</span>
          <div className="flex items-center gap-1.5 font-medium text-zinc-900">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>1 year</span>
          </div>
        </div>

        {/* Location */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-zinc-700">
          <span className="text-zinc-500">Location</span>
          <div className="flex items-center gap-1.5 font-medium text-zinc-900">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Remote / Chennai match</span>
          </div>
        </div>

        {/* Salary */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-zinc-700">
          <span className="text-zinc-500">Salary Target</span>
          <div className="flex items-center gap-1.5 font-medium text-zinc-900">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Within range</span>
          </div>
        </div>
      </div>

      {/* AI Recommendation Reason */}
      <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
          <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
          <span>Agent Rationale</span>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          {match.explanation}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <Button
          variant="primary"
          className="w-full"
          leftIcon={<Send className="w-4 h-4" />}
          onClick={onPrepareApplication}
        >
          {hasApplied ? 'View Application' : 'Prepare Application'}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          leftIcon={<Wand2 className="w-4 h-4" />}
          onClick={onTailorResume}
        >
          Tailor Resume
        </Button>
      </div>
    </div>
  );
};
