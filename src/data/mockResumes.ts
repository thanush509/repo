import type { Resume, ResumeVersion } from '../types';

export const mockDefaultResume: Resume = {
  id: 'res-master-1',
  fileName: 'Keerthick_Resume_Medical_Coder.pdf',
  fileSize: '142 KB',
  uploadedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  parsed: true,
  parsedData: {
    experienceCount: 1,
    skills: [
      'ICD-10-CM',
      'HCC Coding',
      'Risk Adjustment',
      'Medical Coding',
      'CPT',
      'EHR Navigation',
      'Chart Auditing',
      'MEAT Criteria',
      'HIPAA Compliance',
    ],
    education: ['B.Sc. in Biotechnology · University of Madras (2023)'],
    certifications: [
      'Certified Professional Coder (CPC) · AAPC (2024)',
      'Certified Risk Adjustment Coder (CRC) Training Coursework (2024)',
    ],
  },
  summary:
    'Dedicated and detail-oriented Certified Professional Coder (CPC) with 1+ years of experience in ICD-10-CM diagnosis coding, Hierarchical Condition Category (HCC) risk adjustment capture, and chart review for Medicare Advantage programs. Proven track record of achieving 96%+ coding accuracy and adherence to CMS guidelines.',
  versions: [
    {
      id: 'ver-1',
      jobId: 'job-1',
      jobTitle: 'HCC Coder',
      company: 'ABC Healthcare Global',
      versionNumber: 2,
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      matchScore: 94,
      summary:
        'Certified Professional Coder (CPC) with specialized expertise in HCC risk adjustment, chronic condition identification, and CMS-HCC model validation. Demonstrated history of maintaining 97.4% audit quality on outpatient encounters.',
      tailoredHighlights: [
        'Emphasized HCC chart abstraction, MEAT documentation criteria, and CMS risk score optimization',
        'Highlighted 97.4% accuracy benchmark in retrospective Medicare Advantage chart reviews',
        'Aligned technical skill keywords specifically with Epic & AthenaHealth EHR workflows',
      ],
      diffs: [
        {
          field: 'Professional Summary',
          original:
            'Dedicated Certified Professional Coder with 1+ years of experience in ICD-10-CM diagnosis coding and general medical billing.',
          tailored:
            'Certified Professional Coder (CPC) with specialized expertise in HCC risk adjustment, chronic condition identification, and CMS-HCC model validation.',
          explanation:
            'Re-positioned core summary directly around HCC risk adjustment and CMS compliance requirements of ABC Healthcare.',
        },
        {
          field: 'Experience Bullet #1',
          original: 'Reviewed patient charts and assigned appropriate ICD-10 codes for clinic visits.',
          tailored:
            'Performed comprehensive chart audits and assigned high-specificity ICD-10-CM codes for HCC risk adjustment validation across 60+ outpatient records daily.',
          explanation:
            'Quantified volume metric and explicitly demonstrated HCC risk adjustment precision.',
        },
        {
          field: 'Key Skills',
          original: 'Medical Coding, ICD-10, Medical Billing, Excel, Communication',
          tailored:
            'ICD-10-CM, HCC Risk Adjustment, MEAT Documentation, EHR Navigation (Epic/Cerner), Chart Review',
          explanation:
            'Ranked high-priority ATS keywords matching ABC Healthcare job description.',
        },
      ],
      fullText: `KEERTHICK R
Chennai, India · keerthick.work@example.com · +91 98765 43210
LinkedIn: linkedin.com/in/keerthick-coder

PROFESSIONAL SUMMARY
Certified Professional Coder (CPC) with specialized expertise in HCC risk adjustment, chronic condition identification, and CMS-HCC model validation. Demonstrated history of maintaining 97.4% audit quality on outpatient encounters across US healthcare accounts.

CORE COMPETENCIES
• ICD-10-CM Diagnosis Coding   • HCC Risk Adjustment & MEAT Criteria
• Outpatient Chart Review     • CMS Compliance & RADV Readiness
• Electronic Health Records   • Clinical Documentation Clarification

EXPERIENCE
Junior Medical Coder / Risk Adjustment Specialist
MediCare RCM Solutions · Chennai, India | Jul 2024 – Present
• Performed comprehensive chart audits and assigned high-specificity ICD-10-CM codes for HCC risk adjustment validation across 60+ outpatient records daily.
• Verified MEAT (Monitor, Evaluate, Assess, Treat) documentation criteria to ensure valid recapture of chronic disease categories.
• Maintained a 97.4% quality accuracy rating across internal QA audits, exceeding the company benchmark of 95%.
• Collaborated with clinical team leads to resolve ambiguous physician notes and missing diagnostic addendums.

EDUCATION & CERTIFICATIONS
• Certified Professional Coder (CPC) · AAPC (Credential ID: 01849204)
• Bachelor of Science in Biotechnology · University of Madras (2020 – 2023)
• Advanced Risk Adjustment & HCC Coding Bootcamp Certificate (2024)`,
    },
    {
      id: 'ver-2',
      jobId: 'job-3',
      jobTitle: 'Medical Coder - Outpatient',
      company: 'MediCode Global Solutions',
      versionNumber: 1,
      createdAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
      matchScore: 88,
      summary:
        'Certified Outpatient Medical Coder with strong proficiency in ICD-10-CM, CPT surgical coding, and clinic encounter abstraction.',
      tailoredHighlights: [
        'Spotlighted CPT procedure code assignment alongside ICD-10 diagnostic coding',
        'Emphasized daily turnaround time and clean claim submission rates',
      ],
      diffs: [
        {
          field: 'Professional Summary',
          original:
            'Dedicated Certified Professional Coder with 1+ years of experience in ICD-10-CM diagnosis coding.',
          tailored:
            'Certified Outpatient Medical Coder with strong proficiency in ICD-10-CM, CPT surgical coding, and clinic encounter abstraction.',
          explanation: 'Highlighted outpatient CPT procedure coding alongside diagnosis codes.',
        },
      ],
      fullText: `KEERTHICK R
Chennai, India · keerthick.work@example.com · +91 98765 43210

PROFESSIONAL SUMMARY
Certified Outpatient Medical Coder with strong proficiency in ICD-10-CM, CPT surgical coding, and clinic encounter abstraction.

EXPERIENCE
Junior Medical Coder
MediCare RCM Solutions · Chennai | 2024 – Present
• Assigned ICD-10-CM and CPT codes for multi-specialty outpatient clinics.
• Processed coding rejections and resolved scrubber edits with 96% accuracy.`,
    },
  ],
};
