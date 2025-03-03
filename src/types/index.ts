export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  datePosted: string;
  applicationDeadline?: string;
  salary?: string;
  url: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  name: string;
  content: ResumeContent;
  file?: File;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeContent {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    gpa?: string;
    achievements: string[];
  }[];
  skills: string[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    url?: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    url?: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
  }[];
}

export interface Application {
  id: string;
  jobId: string;
  resumeId: string;
  status: ApplicationStatus;
  appliedDate: string;
  followUpDate?: string;
  interviewDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ApplicationStatus {
  SAVED = "Saved",
  APPLIED = "Applied",
  INTERVIEWING = "Interviewing",
  OFFER = "Offer",
  REJECTED = "Rejected",
  WITHDRAWN = "Withdrawn"
}

export interface Company {
  id: string;
  name: string;
  website: string;
  careersUrl: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}