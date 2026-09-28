import type { Job } from '../../types';
import { formatSalary, formatRelativeTime } from '../../utils/formatters';
import { Briefcase, Building2, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface JobDetailProps {
  job: Job;
}

export const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="border-b border-zinc-200/80 pb-5 space-y-3">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {job.department || 'Healthcare Operations'}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {job.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-600">
          <div className="flex items-center gap-1.5 font-medium text-zinc-800">
            <Building2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
            <span>{job.employmentType} · {job.workMode}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Posted {formatRelativeTime(job.postedAt)}</span>
          </div>
        </div>
      </div>

      {/* Overview Description */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
          Role Overview
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Key Responsibilities */}
      {job.responsibilities.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Key Responsibilities
          </h3>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {job.requirements.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Qualifications & Requirements
          </h3>
          <ul className="space-y-2">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Skillset */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
          Required Competencies
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 bg-zinc-100 border border-zinc-200/80 rounded-md text-zinc-700 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
