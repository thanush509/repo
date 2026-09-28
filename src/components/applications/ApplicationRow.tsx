import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types';
import { Badge } from '../common/Badge';
import { JobMatch } from '../jobs/JobMatch';
import { formatRelativeTime } from '../../utils/formatters';
import { ArrowRight } from 'lucide-react';

interface ApplicationRowProps {
  application: Application;
}

export const ApplicationRow: React.FC<ApplicationRowProps> = ({
  application,
}) => {
  const navigate = useNavigate();

  const getStatusBadgeVariant = (status: Application['status']) => {
    switch (status) {
      case 'READY':
        return 'ready';
      case 'APPLIED':
        return 'applied';
      case 'INTERVIEW':
        return 'interview';
      case 'REJECTED':
        return 'rejected';
      case 'NEEDS_INPUT':
        return 'needs_input';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'READY':
        return 'Ready to apply';
      case 'APPLIED':
        return 'Applied';
      case 'INTERVIEW':
        return 'Interview';
      case 'REJECTED':
        return 'Not selected';
      case 'NEEDS_INPUT':
        return 'Needs input';
      default:
        return status;
    }
  };

  return (
    <div
      onClick={() => navigate(`/applications/${application.id}`)}
      className="bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer shadow-xs group"
    >
      {/* Left: Role & Company */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
          {application.job.companyLogo || application.job.company.charAt(0)}
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-black tracking-tight truncate">
              {application.job.title}
            </h4>
            <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
              · {application.mode} mode
            </span>
          </div>

          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <span className="font-medium text-zinc-700">{application.job.company}</span>
            <span>·</span>
            <span>{application.job.location}</span>
          </div>
        </div>
      </div>

      {/* Middle & Right: Match, Date, Status Badge & Action */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
        <div className="hidden md:block">
          <JobMatch score={application.job.matchScore} size="sm" showBar={false} />
        </div>

        <div className="text-right">
          <div className="text-[11px] text-zinc-400 font-mono">
            {application.appliedAt
              ? `Applied ${formatRelativeTime(application.appliedAt)}`
              : `Created ${formatRelativeTime(application.createdAt)}`}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={getStatusBadgeVariant(application.status)}
            size="md"
            dot
          >
            {getStatusLabel(application.status)}
          </Badge>

          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
