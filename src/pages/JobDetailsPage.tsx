import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobStore } from '../stores/useJobStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useApplicationStore } from '../stores/useApplicationStore';
import { useAIStore } from '../stores/useAIStore';
import { aiService } from '../services/ai.service';
import { JobDetail } from '../components/jobs/JobDetail';
import { MatchBreakdown } from '../components/jobs/MatchBreakdown';
import { Modal } from '../components/common/Modal';
import { AIProgress } from '../components/ai/AIProgress';
import { ResumeComparison } from '../components/resume/ResumeComparison';
import { ArrowLeft } from 'lucide-react';
import type { ResumeVersion } from '../types';

export const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const jobs = useJobStore((state) => state.jobs);
  const profile = useProfileStore((state) => state.profile);
  const createOrGetApplication = useApplicationStore((state) => state.createOrGetApplication);
  const applications = useApplicationStore((state) => state.applications);

  const isTailoring = useAIStore((state) => state.isTailoring);
  const tailoringProgress = useAIStore((state) => state.tailoringProgress);
  const tailoringStage = useAIStore((state) => state.tailoringStage);
  const showTailorModal = useAIStore((state) => state.showTailorModal);
  const setShowTailorModal = useAIStore((state) => state.setShowTailorModal);
  const latestTailoredResume = useAIStore((state) => state.latestTailoredResume);

  const [isRegenerating, setIsRegenerating] = useState(false);

  const job = jobs.find((j) => j.id === jobId) || jobs[0];
  const match = aiService.matchJob(job, profile);
  const existingApp = applications.find((a) => a.jobId === job.id);

  const handleStartTailoring = async () => {
    setShowTailorModal(true);
    await aiService.tailorResume(job, profile);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await aiService.tailorResume(job, profile);
    setIsRegenerating(false);
  };

  const handleUseTailoredVersion = (version: ResumeVersion) => {
    setShowTailorModal(false);
    const app = createOrGetApplication(job);
    useApplicationStore.getState().updateApplication(app.id, {
      resumeVersionId: version.id,
      resumeVersion: version,
    });
    navigate(`/applications/${app.id}`);
  };

  const handlePrepareApplication = () => {
    const app = createOrGetApplication(job);
    navigate(`/applications/${app.id}`);
  };

  const tailoringStages = [
    { name: 'Analyzing job requirements', isComplete: tailoringProgress > 25, isCurrent: tailoringProgress <= 25 && isTailoring },
    { name: 'Selecting relevant coding experience & metrics', isComplete: tailoringProgress > 55, isCurrent: tailoringProgress > 25 && tailoringProgress <= 55 },
    { name: 'Optimizing summary and MEAT criteria keywords', isComplete: tailoringProgress > 80, isCurrent: tailoringProgress > 55 && tailoringProgress <= 80 },
    { name: 'Generating tailored version', isComplete: tailoringProgress >= 100, isCurrent: tailoringProgress > 80 && tailoringProgress < 100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to jobs</span>
        </button>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-xl p-6 sm:p-8 shadow-xs">
          <JobDetail job={job} />
        </div>

        {/* Right Column: Match Breakdown & Actions */}
        <div className="lg:col-span-1">
          <MatchBreakdown
            job={job}
            match={match}
            onTailorResume={handleStartTailoring}
            onPrepareApplication={handlePrepareApplication}
            hasApplied={existingApp?.status === 'APPLIED'}
          />
        </div>
      </div>

      {/* Resume Tailoring Modal */}
      <Modal
        isOpen={showTailorModal}
        onClose={() => setShowTailorModal(false)}
        maxWidth="3xl"
        title={isTailoring ? undefined : `Tailored Resume for ${job.company}`}
        subtitle={isTailoring ? undefined : `Optimized specifically for ${job.title}`}
      >
        {isTailoring ? (
          <AIProgress
            title="Tailoring your resume"
            subtitle={`Aligning your experience with ${job.company}'s requirements...`}
            stages={tailoringStages}
            progress={tailoringProgress}
          />
        ) : latestTailoredResume ? (
          <ResumeComparison
            tailoredVersion={latestTailoredResume}
            onUseVersion={handleUseTailoredVersion}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
          />
        ) : null}
      </Modal>
    </div>
  );
};
