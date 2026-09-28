import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useJobStore } from '../stores/useJobStore';
import { useApplicationStore } from '../stores/useApplicationStore';
import { JobRow } from '../components/jobs/JobRow';
import { Button } from '../components/common/Button';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const jobs = useJobStore((state) => state.jobs);
  const applications = useApplicationStore((state) => state.applications);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Keerthick';

  // Top matches for today
  const todaysMatches = jobs.slice(0, 5);

  // Metrics counts
  const newMatchesCount = jobs.length;
  const readyAppsCount = applications.filter((a) => a.status === 'READY').length;
  const appliedCount = applications.filter((a) => a.status === 'APPLIED').length;
  const interviewCount = applications.filter((a) => a.status === 'INTERVIEW').length;

  // Recent application activity timeline entries
  const recentActivities = [
    {
      time: '09:42',
      title: 'Resume tailored for HCC Coder',
      subtitle: 'Version 2 with risk adjustment metrics for ABC Healthcare Global',
    },
    {
      time: '10:05',
      title: 'Application submitted to ABC Healthcare',
      subtitle: 'Direct candidate portal submission confirmed (Ref: #ABC-92841)',
    },
    {
      time: '11:20',
      title: 'New matching job found',
      subtitle: 'Risk Adjustment Specialist at CarePulse Health (92% match)',
    },
    {
      time: '12:15',
      title: 'Screening questions auto-synthesized',
      subtitle: '5 of 5 questions answered with high profile confidence',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Command Center Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Good morning, {firstName}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Your job search is running. 6 channels actively monitored.</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/discover')}
            leftIcon={<Compass className="w-3.5 h-3.5" />}
          >
            Discover Jobs
          </Button>
        </div>
      </div>

      {/* Compact Metrics Bar (Typography + Dividers, NOT huge colorful cards) */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 text-left">
          <div className="p-2 sm:px-4 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-mono">
              {newMatchesCount}
            </div>
            <div className="text-xs text-zinc-500">New Matches Found</div>
          </div>

          <div className="p-2 sm:px-4 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-mono">
              {readyAppsCount}
            </div>
            <div className="text-xs text-zinc-500">Applications Ready</div>
          </div>

          <div className="p-2 sm:px-4 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-mono">
              {appliedCount}
            </div>
            <div className="text-xs text-zinc-500">Applications Sent</div>
          </div>

          <div className="p-2 sm:px-4 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-mono flex items-center gap-2">
              <span>{interviewCount}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-purple-50 text-purple-700 border border-purple-200 rounded font-normal font-sans">
                Active
              </span>
            </div>
            <div className="text-xs text-zinc-500">Interviews Scheduled</div>
          </div>
        </div>
      </div>

      {/* Next Action Banner */}
      {readyAppsCount > 0 && (
        <div className="p-4 rounded-xl bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold">
                {readyAppsCount} applications prepared & awaiting your review
              </div>
              <div className="text-xs text-zinc-400">
                Tailored resumes and answers generated. Review and dispatch in 1 click.
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/applications')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Review Now
          </Button>
        </div>
      )}

      {/* Main Grid: Today's Matches & Application Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Matches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 tracking-tight">
                Today&apos;s Matches
              </h2>
              <p className="text-xs text-zinc-500">
                Top opportunities ranked by ICD-10 & HCC skill compatibility.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/discover')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View all
            </Button>
          </div>

          <div className="space-y-2.5">
            {todaysMatches.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Application Activity Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 tracking-tight">
                Agent Activity
              </h2>
              <p className="text-xs text-zinc-500">
                Real-time stream of agent events.
              </p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/90 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="relative group text-xs">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-zinc-900 border-2 border-white shadow-2xs" />
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-900">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {act.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      {act.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 text-center">
              <button
                type="button"
                onClick={() => navigate('/applications')}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors cursor-pointer"
              >
                View full application history →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
