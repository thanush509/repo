import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, Experience } from '../types';

interface ProfileState {
  profile: Profile;
  updateProfile: (partial: Partial<Profile>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: Profile = {
  id: 'prof-1',
  firstName: 'Keerthick',
  lastName: 'R',
  email: 'keerthick.work@example.com',
  phone: '+91 98765 43210',
  location: 'Chennai, Tamil Nadu, India',
  headline: 'Certified Professional Coder (CPC) · HCC Risk Adjustment Specialist',
  summary:
    'Results-driven Medical Coder with 1+ years of experience specialized in ICD-10-CM coding, HCC risk adjustment, and retrospective chart review for Medicare Advantage programs. Experienced in maintaining 97%+ audit accuracy and MEAT documentation adherence.',
  skills: [
    'ICD-10-CM',
    'HCC Coding',
    'Risk Adjustment',
    'Medical Coding',
    'CPT',
    'MEAT Criteria',
    'EHR Navigation',
    'Chart Auditing',
    'Medical Terminology',
    'HIPAA Compliance',
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'MediCare RCM Solutions',
      role: 'Junior Medical Coder / Risk Adjustment Specialist',
      startDate: '2024-07',
      endDate: '',
      current: true,
      description:
        'Auditing outpatient medical records for Medicare Advantage risk adjustment programs. Performing ICD-10-CM coding, verifying MEAT documentation criteria, and maintaining 97.4% QA audit accuracy.',
      highlights: [
        'Reviewed 60+ complex outpatient charts per day with 97.4% accuracy benchmark',
        'Identified chronic disease categories in adherence to official CMS coding guidelines',
        'Collaborated with quality auditors and clinical leads on documentation addendums',
      ],
    },
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'University of Madras',
      degree: 'Bachelor of Science',
      field: 'Biotechnology',
      startYear: '2020',
      endYear: '2023',
    },
  ],
  certifications: [
    'Certified Professional Coder (CPC) · AAPC (2024)',
    'Certified Risk Adjustment Coder (CRC) Coursework (2024)',
  ],
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      updateProfile: (partial) => {
        set((state) => ({
          profile: { ...state.profile, ...partial },
        }));
      },
      addSkill: (skill) => {
        const trimmed = skill.trim();
        if (!trimmed) return;
        set((state) => {
          if (state.profile.skills.includes(trimmed)) return state;
          return {
            profile: {
              ...state.profile,
              skills: [...state.profile.skills, trimmed],
            },
          };
        });
      },
      removeSkill: (skillToRemove) => {
        set((state) => ({
          profile: {
            ...state.profile,
            skills: state.profile.skills.filter((s) => s !== skillToRemove),
          },
        }));
      },
      addExperience: (expData) => {
        const newExp: Experience = {
          ...expData,
          id: `exp-${Date.now()}`,
        };
        set((state) => ({
          profile: {
            ...state.profile,
            experiences: [newExp, ...state.profile.experiences],
          },
        }));
      },
      updateExperience: (id, expData) => {
        set((state) => ({
          profile: {
            ...state.profile,
            experiences: state.profile.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...expData } : exp
            ),
          },
        }));
      },
      removeExperience: (id) => {
        set((state) => ({
          profile: {
            ...state.profile,
            experiences: state.profile.experiences.filter((exp) => exp.id !== id),
          },
        }));
      },
      resetProfile: () => {
        set({ profile: DEFAULT_PROFILE });
      },
    }),
    {
      name: 'jobpilot-profile-storage',
    }
  )
);
