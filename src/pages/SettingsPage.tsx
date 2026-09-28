import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { CheckCircle2, Cpu, LogOut, ShieldCheck, User } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const preferences = usePreferenceStore((state) => state.preferences);
  const updatePreferences = usePreferenceStore((state) => state.updatePreferences);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Keerthick R');
  const [email, setEmail] = useState(user?.email || 'keerthick.work@example.com');
  const [aiModel, setAiModel] = useState('Local Agent (Deterministic)');
  const [resumeGenEnabled, setResumeGenEnabled] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [browserNotifs, setBrowserNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 max-w-3xl animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage your account credentials, AI agent engine, and notification channels.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings saved</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Account Section */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            <User className="w-4 h-4 text-zinc-500" />
            <span>Account Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Application Automation Section */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            <Cpu className="w-4 h-4 text-zinc-500" />
            <span>Application Automation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Default Application Mode
              </label>
              <select
                value={preferences.applicationMode}
                onChange={(e) =>
                  updatePreferences({
                    applicationMode: e.target.value as typeof preferences.applicationMode,
                  })
                }
                className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-xs text-zinc-900"
              >
                <option value="MANUAL">Manual (Organize only)</option>
                <option value="ASSISTED">Assisted (Review before submit)</option>
                <option value="AUTO">Auto (Submit automatically)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Daily Application Limit
              </label>
              <input
                type="number"
                value={preferences.dailyApplicationLimit}
                onChange={(e) =>
                  updatePreferences({
                    dailyApplicationLimit: Number(e.target.value),
                  })
                }
                className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-xs text-zinc-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* AI Model Configuration */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            <Cpu className="w-4 h-4 text-zinc-500" />
            <span>AI Reasoning Engine</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Model Provider
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-xs text-zinc-900"
              >
                <option value="Local Agent (Deterministic)">Local Agent (Deterministic Mock Engine)</option>
                <option value="Cloud AI Agent (Claude 3.7 / GPT-4o)">Cloud AI Agent (High-accuracy clinical extraction)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-medium text-zinc-800">Automated Resume Tailoring</span>
                <p className="text-[11px] text-zinc-400">Generate tailored resumes for every discovered role</p>
              </div>
              <input
                type="checkbox"
                checked={resumeGenEnabled}
                onChange={(e) => setResumeGenEnabled(e.target.checked)}
                className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-zinc-500" />
            <span>Notifications & Security</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span>Email notifications for high-match roles (90%+)</span>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Browser notifications for application status updates</span>
              <input
                type="checkbox"
                checked={browserNotifs}
                onChange={(e) => setBrowserNotifs(e.target.checked)}
                className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
            <Button type="submit" variant="primary" size="sm">
              Save Settings
            </Button>

            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleSignOut}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
