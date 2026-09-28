import type { Application } from '../../types';
import { Button } from '../common/Button';
import { AlertCircle, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';

interface ApplicationReviewProps {
  application: Application;
  onSubmit: () => void;
  onSaveForLater: () => void;
  onJumpToStep: (step: number) => void;
  isSubmitting?: boolean;
}

export const ApplicationReview: React.FC<ApplicationReviewProps> = ({
  application,
  onSubmit,
  onSaveForLater,
  onJumpToStep,
  isSubmitting = false,
}) => {
  const answeredQuestionsCount = application.questions.filter(
    (q) => q.userAnswer && q.userAnswer.trim().length > 0
  ).length;

  const unansweredQuestions = application.questions.filter(
    (q) => !q.userAnswer || q.userAnswer.trim().length === 0
  );

  const hasIncompleteQuestions = unansweredQuestions.length > 0;

  return (
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-7 space-y-6 shadow-xs">
      <div className="border-b border-zinc-100 pb-4 space-y-1">
        <h3 className="text-base font-semibold text-zinc-900 tracking-tight">
          Review Application
        </h3>
        <p className="text-xs text-zinc-500">
          Verify your tailored materials and answers before submission to {application.job.company}.
        </p>
      </div>

      {/* Review Sections Grid */}
      <div className="space-y-3 divide-y divide-zinc-100 text-xs">
        {/* Resume */}
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900">
                {application.resumeVersion
                  ? `Tailored Resume v${application.resumeVersion.versionNumber}`
                  : 'Master Resume (Keerthick_Resume.pdf)'}
              </div>
              <div className="text-zinc-500 text-[11px]">
                {application.resumeVersion
                  ? `${application.resumeVersion.matchScore}% Optimized match`
                  : 'Standard baseline resume'}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onJumpToStep(1)}>
            Change
          </Button>
        </div>

        {/* Cover Letter */}
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900">
                {application.coverLetter
                  ? `Cover Letter (${application.coverLetter.tone} Tone)`
                  : 'Generated Cover Letter'}
              </div>
              <div className="text-zinc-500 text-[11px]">
                Ready for submission
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onJumpToStep(2)}>
            Edit
          </Button>
        </div>

        {/* Questions Status */}
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900">
                Screening Questions
              </div>
              <div className="text-zinc-500 text-[11px]">
                {answeredQuestionsCount} of {application.questions.length} answered
                {hasIncompleteQuestions && (
                  <span className="text-amber-700 font-medium ml-1">
                    · {unansweredQuestions.length} needs input
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onJumpToStep(3)}>
            Review
          </Button>
        </div>

        {/* Application Mode */}
        <div className="flex items-center justify-between py-2.5">
          <div>
            <div className="font-semibold text-zinc-900">Application Mode</div>
            <div className="text-zinc-500 text-[11px]">
              Assisted · Human in the loop review enabled
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
            Assisted
          </span>
        </div>
      </div>

      {/* Incomplete Question Warning */}
      {hasIncompleteQuestions && (
        <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Action Required</div>
            <p className="mt-0.5 text-amber-800">
              Complete the remaining question before submitting. The employer requires all screening items.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <Button
          variant="primary"
          className="w-full"
          size="lg"
          leftIcon={<Send className="w-4 h-4" />}
          onClick={onSubmit}
          disabled={hasIncompleteQuestions || isSubmitting}
          isLoading={isSubmitting}
        >
          Submit Application
        </Button>

        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={onSaveForLater}
        >
          Save for later
        </Button>
      </div>
    </div>
  );
};
