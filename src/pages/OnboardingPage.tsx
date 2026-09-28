import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ResumeUpload } from '../components/resume/ResumeUpload';
import { useAuthStore } from '../stores/useAuthStore';
import { useProfileStore } from '../stores/useProfileStore';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import type { ApplicationMode, EmploymentType, WorkMode } from '../types';
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, X } from 'lucide-react';
import { cn } from '../utils/cn';

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const addSkill = useProfileStore((state) => state.addSkill);
  const removeSkill = useProfileStore((state) => state.removeSkill);
  const addExperience = useProfileStore((state) => state.addExperience);
  const removeExperience = useProfileStore((state) => state.removeExperience);

  const preferences = usePreferenceStore((state) => state.preferences);
  const updatePreferences = usePreferenceStore((state) => state.updatePreferences);

  // Local helper states
  const [skillInput, setSkillInput] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpStart, setNewExpStart] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [showAddExp, setShowAddExp] = useState(false);

  const handleFinish = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const handleSaveNewExp = () => {
    if (newExpCompany && newExpRole) {
      addExperience({
        company: newExpCompany,
        role: newExpRole,
        startDate: newExpStart || '2024-01',
        endDate: '',
        current: true,
        description: newExpDesc || 'Medical coding and chart auditing.',
        highlights: [],
      });
      setNewExpCompany('');
      setNewExpRole('');
      setNewExpStart('');
      setNewExpDesc('');
      setShowAddExp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] py-12 px-4 sm:px-6 antialiased flex flex-col justify-between">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between pb-8 border-b border-zinc-200/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              JP
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900">
              JobPilot Setup
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
            <span>Step {currentStep} of 5</span>
            <div className="flex gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'w-6 h-1 rounded-full transition-all',
                    s === currentStep
                      ? 'bg-zinc-900'
                      : s < currentStep
                      ? 'bg-zinc-400'
                      : 'bg-zinc-200'
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step Container */}
        <div className="py-8">
          {/* STEP 1: Job Search Setup */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  Let&apos;s set up your job search.
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Tell JobPilot what kind of work you&apos;re looking for.
                </p>
              </div>

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
                  ].map((role) => {
                    const isSelected = preferences.roles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          const newRoles = isSelected
                            ? preferences.roles.filter((r) => r !== role)
                            : [...preferences.roles, role];
                          updatePreferences({ roles: newRoles });
                        }}
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5',
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 font-medium shadow-2xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
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
                  Preferred Locations
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Chennai', 'Bangalore', 'Remote', 'Hyderabad', 'Mumbai'].map((loc) => {
                    const isSelected = preferences.locations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          const newLocs = isSelected
                            ? preferences.locations.filter((l) => l !== loc)
                            : [...preferences.locations, loc];
                          updatePreferences({ locations: newLocs });
                        }}
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5',
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 font-medium shadow-2xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Years of Experience"
                  type="number"
                  value={preferences.experienceYears}
                  onChange={(e) =>
                    updatePreferences({ experienceYears: Number(e.target.value) })
                  }
                  helperText="e.g. 1 year"
                />

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Expected Salary Range (INR)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={preferences.salaryMin}
                      onChange={(e) =>
                        updatePreferences({ salaryMin: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-xs text-zinc-900"
                      placeholder="Min (e.g. 4)"
                    />
                    <span className="text-zinc-400 text-xs">to</span>
                    <input
                      type="number"
                      value={preferences.salaryMax}
                      onChange={(e) =>
                        updatePreferences({ salaryMax: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-xs text-zinc-900"
                      placeholder="Max (e.g. 8)"
                    />
                    <span className="text-xs text-zinc-500 font-medium">Lakhs</span>
                  </div>
                </div>
              </div>

              {/* Work Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-700">
                  Work Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Remote', 'Hybrid', 'On-site'] as WorkMode[]).map((mode) => {
                    const isSelected = preferences.workModes.includes(mode);
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          const newModes = isSelected
                            ? preferences.workModes.filter((m) => m !== mode)
                            : [...preferences.workModes, mode];
                          updatePreferences({ workModes: newModes });
                        }}
                        className={cn(
                          'p-3 rounded-xl border text-center text-xs transition-all cursor-pointer font-medium',
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
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
                    const isSelected = preferences.employmentTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          const newTypes = isSelected
                            ? preferences.employmentTypes.filter((t) => t !== type)
                            : [...preferences.employmentTypes, type];
                          updatePreferences({ employmentTypes: newTypes });
                        }}
                        className={cn(
                          'p-3 rounded-xl border text-center text-xs transition-all cursor-pointer font-medium',
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Profile */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  Your professional profile
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Provide your baseline credentials and experience timeline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => updateProfile({ firstName: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => updateProfile({ lastName: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                />
              </div>

              <Input
                label="Current Location"
                value={profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
              />

              {/* Skills Tag Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-700">
                  Skills & Certifications
                </label>
                <div className="flex flex-wrap gap-1.5 p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-zinc-800 shadow-2xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddCustomSkill} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add custom skill (e.g. CPT, AAPC, Anatomy)..."
                    className="flex-1 bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Add Skill
                  </Button>
                </form>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                    Experience Timeline
                  </label>
                  {!showAddExp && (
                    <button
                      type="button"
                      onClick={() => setShowAddExp(true)}
                      className="text-xs text-zinc-600 hover:text-zinc-900 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role</span>
                    </button>
                  )}
                </div>

                {profile.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-white space-y-2 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-xs text-zinc-900">
                          {exp.role} · <span className="font-normal text-zinc-600">{exp.company}</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-zinc-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}

                {showAddExp && (
                  <div className="p-4 rounded-xl border border-zinc-300 bg-zinc-50 space-y-3 animate-in fade-in duration-100">
                    <div className="text-xs font-semibold text-zinc-900">New Experience</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Company (e.g. Apex Health)"
                        value={newExpCompany}
                        onChange={(e) => setNewExpCompany(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-xs text-zinc-900"
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. HCC Coder)"
                        value={newExpRole}
                        onChange={(e) => setNewExpRole(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-xs text-zinc-900"
                      />
                    </div>
                    <textarea
                      placeholder="Brief role responsibilities..."
                      rows={2}
                      value={newExpDesc}
                      onChange={(e) => setNewExpDesc(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-md p-2.5 text-xs text-zinc-900"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => setShowAddExp(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSaveNewExp}>
                        Save Role
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Resume Upload */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  Add your resume
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Upload your CV so JobPilot can extract your clinical background and tailor it for applications.
                </p>
              </div>

              <ResumeUpload />
            </div>
          )}

          {/* STEP 4: Application Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  How should JobPilot apply?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Choose the level of automation you prefer for your job search.
                </p>
              </div>

              {/* 3 Application Modes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    mode: 'MANUAL' as ApplicationMode,
                    title: 'Manual',
                    desc: 'Find and organize jobs for manual submission.',
                  },
                  {
                    mode: 'ASSISTED' as ApplicationMode,
                    title: 'Assisted (Recommended)',
                    desc: 'Prepare applications and let me review before submitting.',
                  },
                  {
                    mode: 'AUTO' as ApplicationMode,
                    title: 'Auto',
                    desc: 'Automatically submit applications when supported.',
                  },
                ].map((item) => {
                  const isSelected = preferences.applicationMode === item.mode;
                  return (
                    <div
                      key={item.mode}
                      onClick={() => updatePreferences({ applicationMode: item.mode })}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5',
                        isSelected
                          ? 'border-zinc-900 bg-zinc-50 shadow-xs ring-1 ring-zinc-900'
                          : 'border-zinc-200 hover:border-zinc-300 bg-white'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-zinc-900">
                          {item.title}
                        </span>
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

              {/* Controls */}
              <div className="p-5 bg-white border border-zinc-200 rounded-xl space-y-5">
                {/* Minimum match score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-700">Minimum Match Score</span>
                    <span className="font-bold text-zinc-900 font-mono">{preferences.minMatchScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={preferences.minMatchScore}
                    onChange={(e) =>
                      updatePreferences({ minMatchScore: Number(e.target.value) })
                    }
                    className="w-full accent-zinc-900 cursor-pointer"
                  />
                  <p className="text-[11px] text-zinc-400">
                    Jobs scoring below this threshold will be excluded from automatic queuing.
                  </p>
                </div>

                {/* Daily limit */}
                <div className="space-y-1 pt-3 border-t border-zinc-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-medium text-zinc-700">
                        Daily Application Limit
                      </span>
                      <p className="text-[11px] text-zinc-400">
                        Maximum applications sent per 24 hours.
                      </p>
                    </div>
                    <input
                      type="number"
                      value={preferences.dailyApplicationLimit}
                      onChange={(e) =>
                        updatePreferences({
                          dailyApplicationLimit: Number(e.target.value),
                        })
                      }
                      className="w-20 bg-zinc-50 border border-zinc-200 rounded-md px-2.5 py-1 text-xs text-zinc-900 font-mono text-right"
                    />
                  </div>
                </div>

                {/* Require review toggle */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-zinc-700">
                      Require review for uncertain questions
                    </span>
                    <p className="text-[11px] text-zinc-400">
                      Pause submission if AI confidence on a screening item is below 80%.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updatePreferences({
                        requireReviewForUncertain: !preferences.requireReviewForUncertain,
                      })
                    }
                    className={cn(
                      'w-10 h-6 rounded-full transition-colors relative cursor-pointer',
                      preferences.requireReviewForUncertain ? 'bg-zinc-900' : 'bg-zinc-200'
                    )}
                  >
                    <span
                      className={cn(
                        'w-4 h-4 rounded-full bg-white absolute top-1 transition-transform',
                        preferences.requireReviewForUncertain ? 'right-1' : 'left-1'
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Start */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  Your job search summary
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Everything is configured. JobPilot is ready to start discovering and preparing opportunities.
                </p>
              </div>

              {/* Concise Summary Grid */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-zinc-400 font-medium">Roles</div>
                    <div className="font-semibold text-zinc-900 mt-0.5">
                      {preferences.roles.join(', ') || 'Medical Coder'}
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-400 font-medium">Locations</div>
                    <div className="font-semibold text-zinc-900 mt-0.5">
                      {preferences.locations.join(', ')}
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-400 font-medium">Experience</div>
                    <div className="font-semibold text-zinc-900 mt-0.5">
                      {preferences.experienceYears} year(s)
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-400 font-medium">Expected CTC</div>
                    <div className="font-semibold text-zinc-900 mt-0.5 font-mono">
                      ₹{preferences.salaryMin}L – ₹{preferences.salaryMax}L
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-400 font-medium">Application Mode</div>
                    <div className="font-semibold text-zinc-900 mt-0.5">
                      {preferences.applicationMode}
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-400 font-medium">Minimum Match Threshold</div>
                    <div className="font-semibold text-zinc-900 mt-0.5 font-mono">
                      {preferences.minMatchScore}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stepper Actions */}
        <div className="pt-6 border-t border-zinc-200/80 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinish}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Finding Jobs
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
