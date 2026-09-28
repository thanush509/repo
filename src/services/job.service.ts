import type { Job, JobPreferences } from '../types';
import { useJobStore } from '../stores/useJobStore';
import { useUIStore } from '../stores/useUIStore';

export const jobService = {
  getJobs: (): Job[] => {
    return useJobStore.getState().jobs;
  },

  getJobById: (id: string): Job | undefined => {
    return useJobStore.getState().jobs.find((job) => job.id === id);
  },

  discoverJobs: async (
    _preferences: JobPreferences,
    onStepChange?: (step: number, logs: string[]) => void
  ): Promise<Job[]> => {
    const jobStore = useJobStore.getState();
    jobStore.setShowDiscoveryModal(true);
    jobStore.setDiscovering(true, 1, ['Initiating multi-source agent crawler...'], 0);

    const steps = [
      {
        step: 1,
        log: 'Connecting to 6 integrated healthcare recruitment channels...',
        delay: 500,
      },
      {
        step: 2,
        log: 'Crawling ATS integrations (Workday, Greenhouse, Lever, SmartRecruiters)...',
        delay: 600,
      },
      {
        step: 3,
        log: 'Aggregating hospital systems & RCM career portals (ABC Healthcare, CarePulse)...',
        delay: 600,
      },
      {
        step: 4,
        log: 'Analyzing ICD-10-CM, HCC, and risk adjustment requirements with semantic matcher...',
        delay: 700,
      },
      {
        step: 5,
        log: 'Ranking match scores and filtering duplicate listings...',
        delay: 600,
      },
    ];

    const currentLogs: string[] = ['Initiating multi-source agent crawler...'];

    for (const s of steps) {
      await new Promise((resolve) => setTimeout(resolve, s.delay));
      currentLogs.push(s.log);
      jobStore.setDiscovering(true, s.step, currentLogs, 0);
      onStepChange?.(s.step, currentLogs);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    currentLogs.push('Discovery complete! 18 matching opportunities identified.');

    const allJobs = jobStore.jobs;
    jobStore.setDiscovering(false, 6, currentLogs, 18);

    useUIStore.getState().addNotification({
      title: '18 matching jobs found',
      description: 'Agent refreshed job feed based on your medical coding preferences.',
      type: 'match',
      link: '/discover',
    });

    return allJobs;
  },

  applyFilters: (jobs: Job[], filters: ReturnType<typeof useJobStore.getState>['filters']): Job[] => {
    return jobs.filter((job) => {
      // Search term
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesQuery =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.skills.some((s) => s.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Role filter
      if (filters.role !== 'all') {
        if (!job.title.toLowerCase().includes(filters.role.toLowerCase())) return false;
      }

      // Location filter
      if (filters.location !== 'all') {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      }

      // Work mode
      if (filters.workMode !== 'all') {
        if (job.workMode.toLowerCase() !== filters.workMode.toLowerCase()) return false;
      }

      // Min match score
      if (filters.minMatchScore > 0) {
        if (job.matchScore < filters.minMatchScore) return false;
      }

      return true;
    });
  },
};
