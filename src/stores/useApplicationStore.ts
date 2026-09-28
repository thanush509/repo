import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Application, ApplicationStatus, Job } from '../types';
import { mockApplications } from '../data/mockApplications';
import { mockDefaultQuestions } from '../data/mockQuestions';

interface ApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  activeStep: number;
  isSubmitting: boolean;
  submissionStage: number; // 0: Idle, 1: Preparing, 2: Uploading, 3: Submitting, 4: Success
  setSelectedApplication: (app: Application | null) => void;
  setActiveStep: (step: number) => void;
  setSubmissionState: (isSubmitting: boolean, stage?: number) => void;
  createOrGetApplication: (job: Job) => Application;
  updateApplication: (id: string, partial: Partial<Application>) => void;
  updateQuestionAnswer: (appId: string, questionId: string, answer: string) => void;
  updateStatus: (appId: string, status: ApplicationStatus) => void;
  resetApplications: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: mockApplications,
      selectedApplication: null,
      activeStep: 1,
      isSubmitting: false,
      submissionStage: 0,
      setSelectedApplication: (app) => set({ selectedApplication: app }),
      setActiveStep: (step) => set({ activeStep: step }),
      setSubmissionState: (isSubmitting, stage = 0) =>
        set({ isSubmitting, submissionStage: stage }),
      createOrGetApplication: (job: Job) => {
        const existing = get().applications.find((a) => a.jobId === job.id);
        if (existing) {
          set({ selectedApplication: existing });
          return existing;
        }

        const newApp: Application = {
          id: `app-${Date.now()}`,
          jobId: job.id,
          job,
          status: 'READY',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          mode: 'ASSISTED',
          questions: mockDefaultQuestions.map((q) => ({
            ...q,
            id: `q-${job.id}-${q.id}`,
            jobId: job.id,
          })),
          events: [
            {
              id: `ev-${Date.now()}-1`,
              timestamp: new Date().toISOString(),
              title: 'Job Discovered & Matched',
              description: `Matched with ${job.matchScore}% score for ${job.title} at ${job.company}.`,
              type: 'matched',
            },
            {
              id: `ev-${Date.now()}-2`,
              timestamp: new Date().toISOString(),
              title: 'Application Preparation Initiated',
              description: 'AI synthesized screening responses and prepared baseline package.',
              type: 'prepared',
            },
          ],
        };

        set((state) => ({
          applications: [newApp, ...state.applications],
          selectedApplication: newApp,
          activeStep: 1,
        }));

        return newApp;
      },
      updateApplication: (id, partial) => {
        set((state) => {
          const updatedApps = state.applications.map((app) =>
            app.id === id ? { ...app, ...partial, updatedAt: new Date().toISOString() } : app
          );
          const updatedSelected =
            state.selectedApplication?.id === id
              ? { ...state.selectedApplication, ...partial, updatedAt: new Date().toISOString() }
              : state.selectedApplication;

          return {
            applications: updatedApps,
            selectedApplication: updatedSelected,
          };
        });
      },
      updateQuestionAnswer: (appId, questionId, answer) => {
        set((state) => {
          const updateApp = (app: Application) => {
            if (app.id !== appId) return app;
            const updatedQuestions = app.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    userAnswer: answer,
                    needsReview: !answer.trim(),
                  }
                : q
            );
            return {
              ...app,
              questions: updatedQuestions,
              updatedAt: new Date().toISOString(),
            };
          };

          return {
            applications: state.applications.map(updateApp),
            selectedApplication: state.selectedApplication
              ? updateApp(state.selectedApplication)
              : null,
          };
        });
      },
      updateStatus: (appId, status) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === appId
              ? { ...app, status, updatedAt: new Date().toISOString() }
              : app
          ),
          selectedApplication:
            state.selectedApplication?.id === appId
              ? { ...state.selectedApplication, status, updatedAt: new Date().toISOString() }
              : state.selectedApplication,
        }));
      },
      resetApplications: () =>
        set({
          applications: mockApplications,
          selectedApplication: null,
          activeStep: 1,
          isSubmitting: false,
          submissionStage: 0,
        }),
    }),
    {
      name: 'jobpilot-applications-storage',
    }
  )
);
