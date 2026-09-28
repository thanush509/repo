import React, { useState } from 'react';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { preferenceService } from '../services/preference.service';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import type { ApplicationMode, EmploymentType, WorkMode } from '../types';
import { Check, CheckCircle2, Save } from 'lucide-react';
import { cn } from '../utils/cn';

export const PreferencesPage: React.FC = () => {
  const preferences = usePreferenceStore((state) => state.preferences);
  const [formData, setFormData] = useState({ ...preferences });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await preferenceService.updatePreferences(formData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const toggleRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const toggleLocation = (loc: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
  };

  const toggleWorkMode = (mode: WorkMode) => {
    setFormData((prev) => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter((m) => m !== mode)
        : [...prev.workModes, mode],
    }));
  };

  const toggleEmploymentType = (type: EmploymentType) => {
    setFormData((prev) => ({
      ...prev,
      employmentTypes: prev.employmentTypes.includes(type)
        ? prev.employmentTypes.filter((t) => t !== type)
        : [...prev.employmentTypes, type],
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Job & Agent Preferences
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Configure matching rules, target salaries, and automation boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Preferences updated</span>
            </span>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Job Criteria */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            Target Job Criteria
          </h3>

          {/* Roles */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-700">
              Target Roles
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Medical Coder',
                'HCC Coder',
                'Risk Adjustment Coder',
                'Medical Billing Specialist',
                'Clinical Data Analyst',
                'Inpatient Coder',
              ].map((role) => {
                const isSelected = formData.roles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5',
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 font-medium shadow-2xs'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-700">
              Locations
            </label>
            <div className="flex flex-wrap gap-2">
              {['Chennai', 'Bangalore', 'Remote', 'Hyderabad', 'Mumbai'].map((loc) => {
                const isSelected = formData.locations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5',
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 font-medium shadow-2xs'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{loc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary & Experience */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Experience (Years)"
              type="number"
              value={formData.experienceYears}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  experienceYears: Number(e.target.value),
                }))
              }
            />

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Salary Target (INR)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryMin: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-white border border-zinc-200 rounded-md px-2.5 py-1.5 text-xs text-zinc-900"
                  placeholder="Min"
                />
                <span className="text-zinc-400 text-xs">–</span>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryMax: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-white border border-zinc-200 rounded-md px-2.5 py-1.5 text-xs text-zinc-900"
                  placeholder="Max"
                />
                <span className="text-xs text-zinc-500 font-mono">L</span>
              </div>
            </div>
          </div>

          {/* Work Mode */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-700">
              Work Modes
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Remote', 'Hybrid', 'On-site'] as WorkMode[]).map((mode) => {
                const isSelected = formData.workModes.includes(mode);
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => toggleWorkMode(mode)}
                    className={cn(
                      'p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer font-medium',
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                    )}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-700">
              Employment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Full-time', 'Part-time', 'Contract'] as EmploymentType[]).map((type) => {
                const isSelected = formData.employmentTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleEmploymentType(type)}
                    className={cn(
                      'p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer font-medium',
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Agent Automation Settings */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
            Agent Automation Settings
          </h3>

          {/* Application Mode */}
          <div className="space-y-3">
            <label className="block text-xs font-medium text-zinc-700">
              Application Mode
            </label>
            <div className="space-y-2">
              {[
                {
                  mode: 'MANUAL' as ApplicationMode,
                  title: 'Manual Mode',
                  desc: 'Find and organize matching opportunities. No automated submissions.',
                },
                {
                  mode: 'ASSISTED' as ApplicationMode,
                  title: 'Assisted Mode (Default)',
                  desc: 'Prepare applications and let you review before final submission.',
                },
                {
                  mode: 'AUTO' as ApplicationMode,
                  title: 'Auto Mode',
                  desc: 'Automatically submit applications when supported with high match confidence.',
                },
              ].map((item) => {
                const isSelected = formData.applicationMode === item.mode;
                return (
                  <div
                    key={item.mode}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        applicationMode: item.mode,
                      }))
                    }
                    className={cn(
                      'p-3.5 rounded-lg border text-left transition-all cursor-pointer space-y-1',
                      isSelected
                        ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    )}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-900">{item.title}</span>
                      <div
                        className={cn(
                          'w-3.5 h-3.5 rounded-full border flex items-center justify-center',
                          isSelected ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300'
                        )}
                      >
                        {isSelected && <Check className="w-2 h-2" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Match Score Threshold Slider */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-700">Minimum Match Score</span>
              <span className="font-bold text-zinc-900 font-mono">{formData.minMatchScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={formData.minMatchScore}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  minMatchScore: Number(e.target.value),
                }))
              }
              className="w-full accent-zinc-900 cursor-pointer"
            />
          </div>

          {/* Daily Limit */}
          <div className="space-y-1 pt-2 border-t border-zinc-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-medium text-zinc-700">Daily Application Cap</span>
                <p className="text-[11px] text-zinc-400">Max submissions allowed per 24 hours</p>
              </div>
              <input
                type="number"
                value={formData.dailyApplicationLimit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dailyApplicationLimit: Number(e.target.value),
                  }))
                }
                className="w-20 bg-zinc-50 border border-zinc-200 rounded-md px-2.5 py-1 text-xs text-zinc-900 font-mono text-right"
              />
            </div>
          </div>

          {/* Require Review Toggle */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-700">
                Require review for uncertain questions
              </span>
              <p className="text-[11px] text-zinc-400">
                Pause submission if AI confidence is low
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  requireReviewForUncertain: !prev.requireReviewForUncertain,
                }))
              }
              className={cn(
                'w-10 h-6 rounded-full transition-colors relative cursor-pointer',
                formData.requireReviewForUncertain ? 'bg-zinc-900' : 'bg-zinc-200'
              )}
            >
              <span
                className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-1 transition-transform',
                  formData.requireReviewForUncertain ? 'right-1' : 'left-1'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
