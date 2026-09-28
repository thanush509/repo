import React, { useState } from 'react';
import { useJobStore } from '../stores/useJobStore';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { jobService } from '../services/job.service';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobList } from '../components/jobs/JobList';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AIProgress } from '../components/ai/AIProgress';
import { RefreshCw, Sparkles } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const filters = useJobStore((state) => state.filters);
  const setFilters = useJobStore((state) => state.setFilters);
  const resetFilters = useJobStore((state) => state.resetFilters);
  const isDiscovering = useJobStore((state) => state.isDiscovering);
  const discoveryStep = useJobStore((state) => state.discoveryStep);
  const showDiscoveryModal = useJobStore((state) => state.showDiscoveryModal);
  const setShowDiscoveryModal = useJobStore((state) => state.setShowDiscoveryModal);
  const preferences = usePreferenceStore((state) => state.preferences);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Trigger simulated discovery agent
  const handleFindNewJobs = async () => {
    setIsRefreshing(true);
    await jobService.discoverJobs(preferences);
    setIsRefreshing(false);
  };

  const filteredJobs = jobService.applyFilters(jobs, filters);

  const discoveryStages = [
    { name: 'Connecting to 6 job sources', isComplete: discoveryStep > 1, isCurrent: discoveryStep === 1 },
    { name: 'Scanning ATS integrations (Workday, Greenhouse)', isComplete: discoveryStep > 2, isCurrent: discoveryStep === 2 },
    { name: 'Retrieving hospital & RCM career pages', isComplete: discoveryStep > 3, isCurrent: discoveryStep === 3 },
    { name: 'Analyzing ICD-10 & HCC skill requirements', isComplete: discoveryStep > 4, isCurrent: discoveryStep === 4 },
    { name: 'Ranking match scores against profile', isComplete: discoveryStep > 5, isCurrent: discoveryStep === 5 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Discover Jobs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Real-time opportunities filtered and ranked by JobPilot&apos;s autonomous crawler.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleFindNewJobs}
          isLoading={isRefreshing}
          leftIcon={isRefreshing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
        >
          Find New Jobs
        </Button>
      </div>

      {/* Discovery Progress Modal */}
      <Modal
        isOpen={showDiscoveryModal && isDiscovering}
        onClose={() => setShowDiscoveryModal(false)}
        maxWidth="md"
        showCloseButton={false}
      >
        <AIProgress
          title="Autonomous Job Discovery"
          subtitle="Agent scanning external healthcare & medical coding channels..."
          stages={discoveryStages}
          progress={Math.min(100, discoveryStep * 20)}
        />
      </Modal>

      {/* Filter Bar */}
      <JobFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        totalCount={filteredJobs.length}
      />

      {/* Clean Table/List Hybrid */}
      <div className="space-y-4">
        <JobList
          jobs={filteredJobs}
          onResetFilters={resetFilters}
        />
      </div>
    </div>
  );
};
