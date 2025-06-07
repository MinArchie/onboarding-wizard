export interface UserData {
  // Step 1: Personal Info
  name: string;
  email: string;
  
  // Step 2: Business Info
  companyName: string;
  industry: string;
  companySize: string;
  
  // Step 3: Preferences
  theme: 'light' | 'dark';
  dashboardLayout: 'cards' | 'list';
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface DashboardStats {
  teamMembers: number;
  activeProjects: number;
  notifications: number;
}

export interface ProgressData {
  day: string;
  progress: number;
}

export const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' }
];

export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];