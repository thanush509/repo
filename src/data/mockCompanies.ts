export interface CompanyInfo {
  id: string;
  name: string;
  logoText: string;
  industry: string;
  headquarters: string;
  rating: number;
}

export const mockCompanies: CompanyInfo[] = [
  {
    id: 'comp-1',
    name: 'ABC Healthcare Global',
    logoText: 'ABC',
    industry: 'Healthcare Services & Revenue Cycle',
    headquarters: 'Chennai / Dallas',
    rating: 4.6,
  },
  {
    id: 'comp-2',
    name: 'CarePulse Health Intelligence',
    logoText: 'CP',
    industry: 'Clinical Analytics & Risk Adjustment',
    headquarters: 'Bangalore / Boston',
    rating: 4.8,
  },
  {
    id: 'comp-3',
    name: 'Apex Health Systems',
    logoText: 'AHS',
    industry: 'Hospital & Healthcare IT',
    headquarters: 'Hyderabad / New York',
    rating: 4.5,
  },
  {
    id: 'comp-4',
    name: 'MediCode Global Solutions',
    logoText: 'MGS',
    industry: 'Medical Coding & Billing',
    headquarters: 'Chennai / Chicago',
    rating: 4.4,
  },
  {
    id: 'comp-5',
    name: 'BioHealth Informatics',
    logoText: 'BHI',
    industry: 'Health Informatics & AI Auditing',
    headquarters: 'Remote / San Francisco',
    rating: 4.9,
  },
  {
    id: 'comp-6',
    name: 'Global Revenue Cycle Partners',
    logoText: 'GRC',
    industry: 'RCM & Healthcare Consulting',
    headquarters: 'Bangalore / Atlanta',
    rating: 4.3,
  },
  {
    id: 'comp-7',
    name: 'Vanguard Clinical Coding',
    logoText: 'VCC',
    industry: 'Outpatient & Inpatient Coding',
    headquarters: 'Chennai / London',
    rating: 4.7,
  },
];
