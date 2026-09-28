import type { Application, ApplicationStatus, Job } from '../types';
import { useApplicationStore } from '../stores/useApplicationStore';
import { useUIStore } from '../stores/useUIStore';

export const applicationService = {
  getApplications: (): Application[] => {
    return useApplicationStore.getState().applications;
  },

  getApplicationById: (id: string): Application | undefined => {
    return useApplicationStore.getState().applications.find((app) => app.id === id);
  },

  createApplication: (job: Job): Application => {
    return useApplicationStore.getState().createOrGetApplication(job);
  },

  updateAnswer: (appId: string, questionId: string, answer: string) => {
    useApplicationStore.getState().updateQuestionAnswer(appId, questionId, answer);
  },

  updateStatus: (appId: string, status: ApplicationStatus) => {
    useApplicationStore.getState().updateStatus(appId, status);
  },

  submitApplication: async (
    appId: string,
    onStageChange?: (stage: number) => void
  ): Promise<Application | undefined> => {
    const store = useApplicationStore.getState();
    const app = store.applications.find((a) => a.id === appId);
    if (!app) return undefined;

    // Stage 1: Preparing
    store.setSubmissionState(true, 1);
    onStageChange?.(1);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Stage 2: Uploading resume
    store.setSubmissionState(true, 2);
    onStageChange?.(2);
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Stage 3: Transmitting application to ATS
    store.setSubmissionState(true, 3);
    onStageChange?.(3);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Stage 4: Completed
    const submissionTimestamp = new Date().toISOString();
    const newEvent = {
      id: `ev-sub-${Date.now()}`,
      timestamp: submissionTimestamp,
      title: 'Application Submitted',
      description: `Dispatched to ${app.job.company} candidate portal (Confirmation Ref: #${Math.floor(
        100000 + Math.random() * 900000
      )}).`,
      type: 'submitted' as const,
    };

    store.updateApplication(appId, {
      status: 'APPLIED',
      appliedAt: submissionTimestamp,
      events: [newEvent, ...app.events],
    });

    store.setSubmissionState(false, 4);
    onStageChange?.(4);

    useUIStore.getState().addNotification({
      title: 'Application submitted successfully',
      description: `Your application for ${app.job.title} at ${app.job.company} was submitted.`,
      type: 'application',
      link: `/applications/${app.id}`,
    });

    return store.applications.find((a) => a.id === appId);
  },
};
