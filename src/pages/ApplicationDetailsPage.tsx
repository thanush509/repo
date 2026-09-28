import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../stores/useApplicationStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useResumeStore } from '../stores/useResumeStore';
import { applicationService } from '../services/application.service';
import { aiService } from '../services/ai.service';
import { ApplicationSteps } from '../components/applications/ApplicationSteps';
import { QuestionCard } from '../components/applications/QuestionCard';
import { ApplicationReview } from '../components/applications/ApplicationReview';
import { ApplicationTimeline } from '../components/applications/ApplicationTimeline';
import { Button } from '../components/common/Button';
import { JobMatch } from '../components/jobs/JobMatch';
import { Badge } from '../components/common/Badge';
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2, RotateCw, Sparkles } from 'lucide-react';
import type { CoverLetterLength, CoverLetterTone } from '../types';

export const ApplicationDetailsPage: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const applications = useApplicationStore((state) => state.applications);
  const updateApplication = useApplicationStore((state) => state.updateApplication);
  const updateQuestionAnswer = useApplicationStore((state) => state.updateQuestionAnswer);
  const profile = useProfileStore((state) => state.profile);
  const resume = useResumeStore((state) => state.resume);

  const application = applications.find((a) => a.id === applicationId) || applications[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionStage, setSubmissionStage] = useState(0); // 0: Idle, 1: Preparing, 2: Uploading, 3: Transmitting, 4: Complete
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cover letter controls
  const [tone, setTone] = useState<CoverLetterTone>('Professional');
  const [length, setLength] = useState<CoverLetterLength>('Medium');
  const [isRegeneratingLetter, setIsRegeneratingLetter] = useState(false);

  if (!application) {
    return (
      <div className="p-12 text-center text-xs text-zinc-500">
        Application not found.
      </div>
    );
  }

  const isSubmitted =
    application.status === 'APPLIED' ||
    application.status === 'INTERVIEW' ||
    application.status === 'REJECTED';

  // Handle cover letter regeneration
  const handleRegenerateCoverLetter = async () => {
    setIsRegeneratingLetter(true);
    const letter = await aiService.generateCoverLetter(application.job, profile, tone, length);
    updateApplication(application.id, { coverLetter: letter });
    setIsRegeneratingLetter(false);
  };

  // Handle submission simulation
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setCurrentStep(5);
    await applicationService.submitApplication(application.id, (stage) => {
      setSubmissionStage(stage);
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to applications</span>
        </button>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Application
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-xs text-zinc-400 font-mono">
              Mode: {application.mode}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
            {application.job.title} — {application.job.company}
          </h1>
          <p className="text-xs text-zinc-500">
            {application.job.location} · {application.job.workMode}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <JobMatch score={application.job.matchScore} size="md" />
          <Badge
            variant={
              application.status === 'APPLIED'
                ? 'applied'
                : application.status === 'INTERVIEW'
                ? 'interview'
                : application.status === 'READY'
                ? 'ready'
                : 'neutral'
            }
            size="md"
            dot
          >
            {application.status}
          </Badge>
        </div>
      </div>

      {/* IF APPLICATION IS ALREADY SUBMITTED: SHOW DETAIL TIMELINE & SUBMITTED MATERIALS */}
      {isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Submitted Materials Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume used */}
            <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-600" />
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Submitted Resume
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {application.resumeVersion ? `Version ${application.resumeVersion.versionNumber}` : 'Master Resume'}
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-mono bg-zinc-50 p-3 rounded-lg border border-zinc-200/60">
                {application.resumeVersion?.summary || resume.summary}
              </p>
            </div>

            {/* Cover letter */}
            {application.coverLetter && (
              <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-600" />
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Submitted Cover Letter
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {application.coverLetter.tone} Tone
                  </span>
                </div>
                <div className="text-xs text-zinc-700 whitespace-pre-wrap leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-200/60">
                  {application.coverLetter.content}
                </div>
              </div>
            )}

            {/* Screening Answers */}
            <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Submitted Screening Answers
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {application.questions.length} Items Answered
                </span>
              </div>
              <div className="space-y-2.5 divide-y divide-zinc-100">
                {application.questions.map((q, idx) => (
                  <div key={q.id} className="pt-2 space-y-1 text-xs">
                    <div className="text-zinc-500 font-medium">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="font-semibold text-zinc-900 pl-3 border-l-2 border-zinc-900">
                      {q.userAnswer || q.aiSuggestedAnswer || 'Not answered'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1 Col: Chronological Timeline */}
          <div className="lg:col-span-1 bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 shadow-xs sticky top-20 space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
              Application Timeline
            </h3>
            <ApplicationTimeline events={application.events} />
          </div>
        </div>
      )}

      {/* IF APPLICATION IS IN PREPARATION: SHOW 5-STEP WIZARD */}
      {!isSubmitted && (
        <div className="space-y-6">
          {/* 5-Step Stepper Bar */}
          <ApplicationSteps
            currentStep={currentStep}
            onStepClick={(s) => setCurrentStep(s)}
          />

          {/* STEP 1: RESUME SELECTION */}
          {currentStep === 1 && (
            <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-zinc-100 pb-3 space-y-1">
                <h3 className="text-base font-semibold text-zinc-900">
                  Step 1: Select Resume Version
                </h3>
                <p className="text-xs text-zinc-500">
                  Choose the resume version you want JobPilot to attach for {application.job.company}.
                </p>
              </div>

              <div className="space-y-3">
                {/* Tailored version if available */}
                {application.resumeVersion ? (
                  <div className="p-4 rounded-xl border-2 border-zinc-900 bg-zinc-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-zinc-900" />
                        <span className="text-xs font-bold text-zinc-900">
                          Tailored Resume v{application.resumeVersion.versionNumber} (Selected)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-zinc-900 font-mono">
                        {application.resumeVersion.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-mono text-[11px]">
                      {application.resumeVersion.summary}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">
                        Default Resume (Keerthick_Resume.pdf)
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">142 KB</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Using standard baseline profile. You can generate an optimized tailored version.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/jobs/${application.job.id}`)}
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                    >
                      Open Tailor Assistant
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-100">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Cover Letter
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: COVER LETTER */}
          {currentStep === 2 && (
            <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-zinc-100 pb-3 space-y-1">
                <h3 className="text-base font-semibold text-zinc-900">
                  Step 2: Cover Letter
                </h3>
                <p className="text-xs text-zinc-500">
                  Generated cover letter customized for {application.job.title} at {application.job.company}.
                </p>
              </div>

              {/* Tone & Length Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-zinc-50 border border-zinc-200/70 rounded-xl">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-medium">Tone:</span>
                    {(['Professional', 'Concise', 'Warm'] as CoverLetterTone[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          tone === t
                            ? 'bg-zinc-900 text-white font-medium shadow-2xs'
                            : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-medium">Length:</span>
                    {(['Short', 'Medium', 'Detailed'] as CoverLetterLength[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLength(l)}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          length === l
                            ? 'bg-zinc-900 text-white font-medium shadow-2xs'
                            : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateCoverLetter}
                  isLoading={isRegeneratingLetter}
                  leftIcon={<RotateCw className="w-3.5 h-3.5" />}
                >
                  Regenerate
                </Button>
              </div>

              {/* Cover Letter Text Area */}
              <textarea
                rows={10}
                value={
                  application.coverLetter?.content ||
                  `Dear Hiring Team at ${application.job.company},\n\nI am writing to express my interest in the ${application.job.title} role. With 1+ years of experience in ICD-10-CM coding, HCC risk adjustment, and an active CPC certification from AAPC, I am confident in my ability to maintain high chart auditing accuracy for your team.\n\nSincerely,\nKeerthick R`
                }
                onChange={(e) => {
                  const updatedCL = {
                    id: application.coverLetter?.id || `cl-${Date.now()}`,
                    jobId: application.job.id,
                    jobTitle: application.job.title,
                    company: application.job.company,
                    tone,
                    length,
                    content: e.target.value,
                    createdAt: new Date().toISOString(),
                  };
                  updateApplication(application.id, { coverLetter: updatedCL });
                }}
                className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-4 text-xs sm:text-sm text-zinc-900 leading-relaxed font-sans focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />

              <div className="flex justify-between pt-4 border-t border-zinc-100">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(1)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Resume
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(3)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Questions
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: QUESTIONS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-white border border-zinc-200/90 rounded-xl p-5 shadow-xs">
                <h3 className="text-base font-semibold text-zinc-900">
                  Step 3: Screening Questions
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  JobPilot has synthesized responses based on your profile and resume. Review and override where needed.
                </p>
              </div>

              <div className="space-y-3">
                {application.questions.map((question, idx) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={idx}
                    total={application.questions.length}
                    onAnswerChange={(ans) =>
                      updateQuestionAnswer(application.id, question.id, ans)
                    }
                  />
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Cover Letter
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(4)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Review Application
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {currentStep === 4 && (
            <ApplicationReview
              application={application}
              onSubmit={handleSubmit}
              onSaveForLater={() => navigate('/applications')}
              onJumpToStep={(step) => setCurrentStep(step)}
              isSubmitting={isSubmitting}
            />
          )}

          {/* STEP 5: SUBMIT ANIMATION */}
          {currentStep === 5 && (
            <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 shadow-sm">
              {submissionStage < 4 ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-900">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-zinc-900">
                      Submitting Application
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Dispatched to {application.job.company} candidate portal.
                    </p>
                  </div>

                  {/* Submission Steps */}
                  <div className="space-y-2 text-left bg-zinc-50 border border-zinc-200/70 rounded-xl p-4 text-xs">
                    <div className={`flex items-center justify-between ${submissionStage >= 1 ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>
                      <span>1. Preparing application package</span>
                      {submissionStage >= 1 && <span className="text-emerald-600 font-mono">✓ Done</span>}
                    </div>
                    <div className={`flex items-center justify-between ${submissionStage >= 2 ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>
                      <span>2. Uploading tailored resume</span>
                      {submissionStage >= 2 && <span className="text-emerald-600 font-mono">✓ Done</span>}
                    </div>
                    <div className={`flex items-center justify-between ${submissionStage >= 3 ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>
                      <span>3. Transmitting responses & signing</span>
                      {submissionStage >= 3 && <span className="text-emerald-600 font-mono">● Active</span>}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-900">
                      Application Submitted!
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Your application for <strong>{application.job.title}</strong> at <strong>{application.job.company}</strong> was sent.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => navigate('/applications')}
                    >
                      View in Applications Pipeline
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
