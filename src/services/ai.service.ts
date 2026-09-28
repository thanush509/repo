import type { CoverLetter, CoverLetterLength, CoverLetterTone, Job, JobMatch, Profile, ResumeVersion } from '../types';
import { useAIStore } from '../stores/useAIStore';
import { useResumeStore } from '../stores/useResumeStore';
import { useUIStore } from '../stores/useUIStore';

export const aiService = {
  matchJob: (job: Job, profile: Profile): JobMatch => {
    const profileSkills = profile.skills.map((s) => s.toLowerCase());

    const matched = job.skills.filter((s) =>
      profileSkills.some((ps) => ps.includes(s.toLowerCase()) || s.toLowerCase().includes(ps))
    );
    const missing = job.skills.filter((s) => !matched.includes(s));

    const skillsScore = Math.min(
      100,
      Math.round((matched.length / Math.max(1, job.skills.length)) * 100)
    );
    const expScore = 92;
    const locScore = job.workMode === 'Remote' || job.location.toLowerCase().includes('chennai') ? 100 : 85;
    const salScore = 90;

    const overallScore = Math.round(
      skillsScore * 0.45 + expScore * 0.25 + locScore * 0.15 + salScore * 0.15
    );

    let recommendation: JobMatch['recommendation'] = 'Strong match';
    if (overallScore < 75) recommendation = 'Moderate match';
    else if (overallScore < 85) recommendation = 'Good match';

    return {
      jobId: job.id,
      score: job.matchScore || overallScore,
      skillsMatch: skillsScore,
      experienceMatch: expScore,
      locationMatch: locScore,
      salaryMatch: salScore,
      explanation: `Your ${matched.slice(0, 3).join(', ')} background closely matches ${job.company}'s requirements for ${job.title}.`,
      matchedSkills: matched.length > 0 ? matched : job.skills.slice(0, 3),
      missingSkills: missing,
      strengthPoints: [
        '1+ years verified experience with ICD-10-CM and HCC guidelines',
        'Certified Professional Coder (CPC) credential recognized by employer',
        'Demonstrated 97%+ quality accuracy benchmark in retrospective chart reviews',
      ],
      recommendation,
    };
  },

  tailorResume: async (
    job: Job,
    _profile: Profile,
    onProgress?: (progress: number, stage: string) => void
  ): Promise<ResumeVersion> => {
    const aiStore = useAIStore.getState();
    aiStore.setShowTailorModal(true);

    const stages = [
      { name: 'Analyzing job requirements', progress: 25, delay: 500 },
      { name: 'Selecting relevant coding experience & metrics', progress: 55, delay: 600 },
      { name: 'Optimizing summary and MEAT criteria keywords', progress: 80, delay: 600 },
      { name: 'Generating tailored version', progress: 100, delay: 500 },
    ];

    const completed: string[] = [];

    for (const stage of stages) {
      aiStore.setTailoringState(true, stage.progress, stage.name, completed);
      onProgress?.(stage.progress, stage.name);
      await new Promise((resolve) => setTimeout(resolve, stage.delay));
      completed.push(stage.name);
    }

    const tailoredVersion: ResumeVersion = {
      id: `ver-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      versionNumber: (useResumeStore.getState().resume.versions.length || 0) + 1,
      createdAt: new Date().toISOString(),
      matchScore: Math.min(99, (job.matchScore || 90) + 4),
      summary: `Certified Professional Coder (CPC) with tailored expertise in ${job.title} workflows, high-precision ICD-10-CM coding, and ${job.skills.slice(0, 2).join(' & ')} compliance for ${job.company}.`,
      tailoredHighlights: [
        `Re-aligned summary around ${job.company}'s focus on ${job.skills.slice(0, 2).join(', ')}`,
        `Highlighted 97.4% audit quality benchmark on clinical chart abstractions`,
        `Structured technical skills to maximize ATS ranking for ${job.source || 'ATS portal'}`,
      ],
      diffs: [
        {
          field: 'Professional Summary',
          original:
            'Dedicated Certified Professional Coder with 1+ years of experience in ICD-10-CM diagnosis coding and general medical billing.',
          tailored: `Certified Professional Coder (CPC) with specialized expertise in ${job.title} requirements, chronic condition identification, and CMS-HCC model validation tailored for ${job.company}.`,
          explanation: `Directly addressed ${job.company}'s primary job qualification.`,
        },
        {
          field: 'Experience Bullet #1',
          original: 'Reviewed patient charts and assigned appropriate ICD-10 codes for clinic visits.',
          tailored: `Executed comprehensive chart audits and assigned high-specificity ICD-10-CM codes for ${job.title} validation across 60+ outpatient records daily with 97.4% accuracy.`,
          explanation: 'Quantified daily production rate and emphasized error-free compliance.',
        },
        {
          field: 'Core Competencies',
          original: 'Medical Coding, ICD-10, Medical Billing, Excel',
          tailored: `${job.skills.join(' · ')} · CMS Guidelines · RADV Readiness`,
          explanation: 'Re-ordered high-priority keywords from job specifications.',
        },
      ],
      fullText: `KEERTHICK R
Chennai, India · keerthick.work@example.com · +91 98765 43210

PROFESSIONAL SUMMARY
Certified Professional Coder (CPC) with specialized expertise in ${job.title} requirements, chronic condition identification, and CMS-HCC model validation tailored for ${job.company}. Demonstrated history of maintaining 97.4% audit quality on outpatient encounters.

CORE COMPETENCIES
• ${job.skills.join('   • ')}
• Outpatient Chart Review   • CMS Compliance & RADV Readiness
• Electronic Health Records (Epic / Cerner / Athena)

EXPERIENCE
Junior Medical Coder / Risk Adjustment Specialist
MediCare RCM Solutions · Chennai, India | Jul 2024 – Present
• Executed comprehensive chart audits and assigned high-specificity ICD-10-CM codes for ${job.title} validation across 60+ outpatient records daily with 97.4% accuracy.
• Verified MEAT (Monitor, Evaluate, Assess, Treat) documentation criteria to ensure valid recapture of chronic disease categories.
• Maintained a 97.4% quality accuracy rating across internal QA audits, exceeding company benchmarks.

CERTIFICATIONS & EDUCATION
• Certified Professional Coder (CPC) · AAPC
• B.Sc. in Biotechnology · University of Madras`,
    };

    useResumeStore.getState().addResumeVersion(tailoredVersion);
    aiStore.setTailoringState(false, 100, 'Resume ready', completed);
    aiStore.setLatestTailoredResume(tailoredVersion);

    useUIStore.getState().addNotification({
      title: `Resume tailored for ${job.title}`,
      description: `Created Version ${tailoredVersion.versionNumber} for ${job.company} (${tailoredVersion.matchScore}% match).`,
      type: 'tailor',
      link: '/resume',
    });

    return tailoredVersion;
  },

  generateCoverLetter: async (
    job: Job,
    _profile: Profile,
    tone: CoverLetterTone = 'Professional',
    length: CoverLetterLength = 'Medium'
  ): Promise<CoverLetter> => {
    const aiStore = useAIStore.getState();
    aiStore.setGeneratingCoverLetter(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    let bodyParagraphs = '';
    if (tone === 'Concise') {
      bodyParagraphs = `I am applying for the ${job.title} opening at ${job.company}. With 1+ years in medical coding, an active CPC certification, and a 97.4% accuracy rate in ICD-10-CM / HCC chart audits, I am well-prepared to contribute immediately to your team.

My experience at MediCare RCM Solutions includes reviewing 60+ records daily in adherence to MEAT criteria and CMS guidelines. I look forward to bringing my high-precision coding background to ${job.company}.`;
    } else if (tone === 'Warm') {
      bodyParagraphs = `I was excited to discover the ${job.title} opportunity at ${job.company}. Having followed your innovative work in clinical data quality, I would love the chance to bring my passion for medical coding and chart accuracy to your team.

During my time at MediCare RCM Solutions, I have dedicated myself to mastering ICD-10-CM diagnosis coding and HCC risk adjustment. Consistently exceeding our 95% accuracy goal with a 97.4% personal audit average, I take pride in making sure every chronic condition is thoroughly documented and compliant.

I would be thrilled to connect and discuss how my background and enthusiasm can support ${job.company}'s upcoming initiatives.`;
    } else {
      // Professional (Default)
      bodyParagraphs = `I am writing to express my strong interest in the ${job.title} position at ${job.company}. As an AAPC-Certified Professional Coder (CPC) with hands-on experience in ICD-10-CM coding and HCC risk adjustment at MediCare RCM Solutions, I have established a track record of meticulous clinical record review and high accuracy.

In my current position, I conduct audits on outpatient records for Medicare Advantage programs, verifying MEAT documentation criteria and ensuring all chronic conditions are accurately captured in strict compliance with CMS guidelines. Through systematic chart review and effective collaboration with clinical leads, I maintain an audit quality benchmark of 97.4%.

${job.company}'s reputation for quality and operational rigor aligns with my professional standards. I welcome the opportunity to discuss how my coding expertise can benefit your team.`;
    }

    if (length === 'Detailed') {
      bodyParagraphs += `\n\nAdditionally, I bring hands-on familiarity with major Electronic Health Record (EHR) platforms and claim scrubber workflows, ensuring clean submissions with minimal turnaround time.`;
    }

    const coverLetter: CoverLetter = {
      id: `cl-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      tone,
      length,
      content: `Dear Hiring Team at ${job.company},\n\n${bodyParagraphs}\n\nSincerely,\nKeerthick R`,
      createdAt: new Date().toISOString(),
    };

    aiStore.setGeneratingCoverLetter(false);
    aiStore.setLatestCoverLetter(coverLetter);

    return coverLetter;
  },
};
