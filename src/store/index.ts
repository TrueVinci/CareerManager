import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Job, Resume, Application, Company, ApplicationStatus } from '../types';

interface AppState {
  jobs: Job[];
  resumes: Resume[];
  applications: Application[];
  companies: Company[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  addResume: (resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateResume: (id: string, resume: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  addApplication: (application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      jobs: [],
      resumes: [],
      applications: [],
      companies: [],

      addJob: (job) => {
        const id = uuidv4();
        const now = new Date().toISOString();
        set((state) => ({
          jobs: [...state.jobs, { ...job, id, createdAt: now, updatedAt: now }],
        }));
        return id;
      },

      updateJob: (id, job) => {
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === id ? { ...j, ...job, updatedAt: new Date().toISOString() } : j
          ),
        }));
      },

      deleteJob: (id) => {
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
          applications: state.applications.filter((a) => a.jobId !== id),
        }));
      },

      addResume: (resume) => {
        const id = uuidv4();
        const now = new Date().toISOString();
        set((state) => ({
          resumes: [...state.resumes, { ...resume, id, createdAt: now, updatedAt: now }],
        }));
        return id;
      },

      updateResume: (id, resume) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id ? { ...r, ...resume, updatedAt: new Date().toISOString() } : r
          ),
        }));
      },

      deleteResume: (id) => {
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          applications: state.applications.filter((a) => a.resumeId !== id),
        }));
      },

      addApplication: (application) => {
        const id = uuidv4();
        const now = new Date().toISOString();
        set((state) => ({
          applications: [...state.applications, { ...application, id, createdAt: now, updatedAt: now }],
        }));
        return id;
      },

      updateApplication: (id, application) => {
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, ...application, updatedAt: new Date().toISOString() } : a
          ),
        }));
      },

      deleteApplication: (id) => {
        set((state) => ({
          applications: state.applications.filter((a) => a.id !== id),
        }));
      },

      addCompany: (company) => {
        const id = uuidv4();
        const now = new Date().toISOString();
        set((state) => ({
          companies: [...state.companies, { ...company, id, createdAt: now, updatedAt: now }],
        }));
        return id;
      },

      updateCompany: (id, company) => {
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, ...company, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },

      deleteCompany: (id) => {
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
        }));
      },
    }),
    {
      name: 'career-tracker-storage',
    }
  )
);
