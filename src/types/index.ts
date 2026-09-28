export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';
export type ApplicationMode = 'MANUAL' | 'ASSISTED' | 'AUTO';
export type MatchRecommendation = 'Strong match' | 'Good match' | 'Moderate match' | 'Low match';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type ApplicationStatus =
  | 'DISCOVERED'
  | 'MATCHED'
  | 'READY'
  | 'APPLIED'
  | 'INTERVIEW'
  | 'REJECTED'
  | 'NEEDS_INPUT'
  | 'FAILED';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  onboardingCompleted: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  educations: Education[];
  certifications: string[];
}

export interface JobPreferences {
  roles: string[];
  locations: string[];
  experienceYears: number;
  salaryMin: number; // in Lakhs (INR)
  salaryMax: number;
  workModes: WorkMode[];
  employmentTypes: EmploymentType[];
  applicationMode: ApplicationMode;
  minMatchScore: number;
  dailyApplicationLimit: number;
  requireReviewForUncertain: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  salaryMin: number; // in Lakhs
  salaryMax: number;
  salaryCurrency: string;
  experienceRequired: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  postedAt: string;
  matchScore: number;
  source: string;
  sourceUrl?: string;
  department?: string;
  isDiscovered?: boolean;
}

export interface JobMatch {
  jobId: string;
  score: number;
  skillsMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  explanation: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengthPoints: string[];
  recommendation: MatchRecommendation;
}

export interface ResumeDiff {
  field: string;
  original: string;
  tailored: string;
  explanation: string;
}

export interface ResumeVersion {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  versionNumber: number;
  createdAt: string;
  matchScore: number;
  summary: string;
  tailoredHighlights: string[];
  diffs: ResumeDiff[];
  fullText: string;
}

export interface Resume {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  parsed: boolean;
  parsedData: {
    experienceCount: number;
    skills: string[];
    education: string[];
    certifications: string[];
  };
  summary: string;
  versions: ResumeVersion[];
}

export type CoverLetterTone = 'Professional' | 'Concise' | 'Warm';
export type CoverLetterLength = 'Short' | 'Medium' | 'Detailed';

export interface CoverLetter {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  tone: CoverLetterTone;
  length: CoverLetterLength;
  content: string;
  createdAt: string;
}

export interface ApplicationQuestion {
  id: string;
  jobId: string;
  question: string;
  type: 'text' | 'choice' | 'number' | 'boolean';
  options?: string[];
  aiSuggestedAnswer: string;
  confidence: ConfidenceLevel;
  source: string;
  userAnswer?: string;
  needsReview: boolean;
}

export interface ApplicationEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'discovered' | 'matched' | 'tailored' | 'prepared' | 'submitted' | 'interview' | 'update';
}

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  resumeVersionId?: string;
  resumeVersion?: ResumeVersion;
  coverLetter?: CoverLetter;
  questions: ApplicationQuestion[];
  status: ApplicationStatus;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
  events: ApplicationEvent[];
  mode: ApplicationMode;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'match' | 'tailor' | 'application' | 'system';
  link?: string;
}

export interface DiscoverySource {
  name: string;
  type: 'career_page' | 'ats' | 'job_board';
  status: 'pending' | 'searching' | 'completed' | 'found';
  jobsCount: number;
}

// Runtime constants to ensure valid module evaluation
export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'DISCOVERED',
  'MATCHED',
  'READY',
  'APPLIED',
  'INTERVIEW',
  'REJECTED',
  'NEEDS_INPUT',
  'FAILED',
];
