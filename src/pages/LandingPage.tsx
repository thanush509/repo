import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowRight, CheckCircle2, Compass, FileText, Send, Sparkles, Zap } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleStartOnboarding = () => {
    login('keerthick.work@example.com', 'Keerthick R', true);
    navigate('/onboarding');
  };

  const handleQuickDemo = () => {
    login('keerthick.work@example.com', 'Keerthick R', false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] selection:bg-zinc-900 selection:text-white antialiased">
      {/* Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border-b border-zinc-200/70">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            JP
          </div>
          <span className="font-semibold text-base tracking-tight text-zinc-900">
            JobPilot
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/login')}
          >
            Sign in
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleStartOnboarding}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>Minimalist AI Job Search Agent</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.15] max-w-2xl mx-auto">
          Automate your job search with calm precision.
        </h1>

        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed">
          JobPilot continuously discovers high-match opportunities, tailors your resume for every role, answers screening questions, and prepares applications for your review.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartOnboarding}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Setup Job Search Agent
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleQuickDemo}
          >
            Explore Live Dashboard
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600" />
            No credentials needed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600" />
            Full local simulation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600" />
            Zero visual clutter
          </span>
        </div>
      </section>

      {/* Interactive UI Mock Window */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Mock Window Top Bar */}
          <div className="bg-zinc-50 border-b border-zinc-200/80 px-4 py-3 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500">
                jobpilot.app/dashboard
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Agent Running (Assisted Mode)</span>
            </div>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#FAFAFA]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Good morning, Keerthick
                </h2>
                <p className="text-xs text-zinc-500">
                  Your job search agent is actively scanning 6 healthcare channels.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
                <span>12 matches</span>
                <span>·</span>
                <span>4 ready</span>
                <span>·</span>
                <span>18 sent</span>
                <span>·</span>
                <span className="text-zinc-900 font-bold">2 interviews</span>
              </div>
            </div>

            {/* Featured Job Card Mock */}
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900">HCC Coder</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    Strong match
                  </span>
                </div>
                <div className="text-xs text-zinc-500">
                  ABC Healthcare Global · Chennai · Remote · ₹5L – ₹8L
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-bold text-zinc-900">94% match</div>
                  <div className="w-20 h-1 bg-zinc-100 rounded-full overflow-hidden mt-1">
                    <div className="bg-zinc-900 h-full w-[94%]" />
                  </div>
                </div>
                <Button size="sm" onClick={handleQuickDemo}>
                  Review & Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-zinc-200/80 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2.5 p-5 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Intelligent Discovery</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Continuously crawls ATS feeds, career pages, and job listings, semantically matching roles against your skills and experience.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Precision Tailoring</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Generates targeted resume versions and personalized cover letters aligned with the exact requirements of each employer.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Controlled Automation</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Choose between Assisted or Auto modes. Review AI answers for uncertain questions or let JobPilot handle seamless submissions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 py-8 text-center text-xs text-zinc-400">
        <p>JobPilot · Autonomous Job Search Agent Prototype · Built with React, Zustand & Tailwind</p>
      </footer>
    </div>
  );
};
