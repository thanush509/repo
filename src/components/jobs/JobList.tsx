import type { Job } from '../../types';
import { JobRow } from './JobRow';
import { EmptyState } from '../common/EmptyState';
import { Briefcase } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  onSelectJob?: (job: Job) => void;
  isCompact?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onSelectJob,
  isCompact = false,
  emptyTitle = 'No matching jobs found',
  emptyDescription = 'Try adjusting your search query or relaxing your filter parameters.',
  onResetFilters,
}) => {
  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={<Briefcase className="w-5 h-5" />}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Reset Filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {jobs.map((job) => (
        <JobRow
          key={job.id}
          job={job}
          onClick={onSelectJob ? () => onSelectJob(job) : undefined}
          isCompact={isCompact}
        />
      ))}
    </div>
  );
};
