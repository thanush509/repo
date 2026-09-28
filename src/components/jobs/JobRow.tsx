import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../../types';
import { JobMatch } from './JobMatch';
import { formatSalary, formatRelativeTime } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import { ArrowUpRight } from 'lucide-react';

interface JobRowProps {
  job: Job;
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

export const JobRow: React.FC<JobRowProps> = ({
  job,
  onClick,
  className,
  isCompact = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group bg-white border border-zinc-200/80 hover:border-zinc-300/90 rounded-xl p-4 sm:p-5',
        'transition-all duration-150 cursor-pointer shadow-xs hover:shadow-sm',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Role, Company, Location & Metadata */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-semibold text-zinc-900 group-hover:text-black tracking-tight truncate">
              {job.title}
            </h4>
            {job.isDiscovered && (
              <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-600 rounded font-medium">
                New
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600">
            <span className="font-medium text-zinc-800">{job.company}</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-500">{job.location}</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-500 font-medium text-zinc-700">
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>
        </div>

        {/* Right: Match Score & Action */}
        <div className="flex items-center sm:items-end justify-between sm:flex-col shrink-0 gap-1.5">
          <JobMatch score={job.matchScore} size={isCompact ? 'sm' : 'md'} />
          <div className="text-[11px] text-zinc-400 font-mono hidden sm:block">
            {formatRelativeTime(job.postedAt)}
          </div>
        </div>
      </div>

      {/* Bottom Row: Skills Tags & Mobile Posted Time */}
      <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {job.skills.slice(0, isCompact ? 3 : 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] px-2 py-0.5 bg-zinc-50 border border-zinc-200/60 rounded text-zinc-600"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > (isCompact ? 3 : 4) && (
            <span className="text-[11px] text-zinc-400">
              +{job.skills.length - (isCompact ? 3 : 4)} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-400 sm:hidden">
            {formatRelativeTime(job.postedAt)}
          </span>
          <span className="text-xs text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-0.5 font-medium">
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
