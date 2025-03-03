import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store';
import { Application, ApplicationStatus } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

type ApplicationFormData = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

const ApplicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { applications, jobs, resumes, addApplication, updateApplication } = useAppStore();
  
  const isEditing = Boolean(id);
  const application = isEditing ? applications.find(a => a.id === id) : null;
  
  // Get jobId from query params if available
  const queryParams = new URLSearchParams(location.search);
  const preselectedJobId = queryParams.get('jobId');
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ApplicationFormData>({
    defaultValues: application ? {
      jobId: application.jobId,
      resumeId: application.resumeId,
      status: application.status,
      appliedDate: application.appliedDate.split('T')[0],
      followUpDate: application.followUpDate?.split('T')[0],
      interviewDate: application.interviewDate?.split('T')[0],
      notes: application.notes,
    } : {
      jobId: preselectedJobId || '',
      status: ApplicationStatus.APPLIED,
      appliedDate: new Date().toISOString().split('T')[0],
    }
  });
  
  const selectedJobId = watch('jobId');
  const [selectedJob, setSelectedJob] = useState(jobs.find(j => j.id === selectedJobId));
  
  useEffect(() => {
    const job = jobs.find(j => j.id === selectedJobId);
    setSelectedJob(job);
  }, [selectedJobId, jobs]);
  
  const onSubmit = (data: ApplicationFormData) => {
    if (isEditing && application) {
      updateApplication(application.id, data);
      navigate(`/applications/${application.id}`);
    } else {
      const newApplicationId = addApplication(data);
      navigate(`/applications/${newApplicationId}`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-1 h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Application' : 'Track New Application'}
          </h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Application Details</h3>
              <p className="mt-1 text-sm text-gray-500">
                Track your job application details.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="jobId" className="block text-sm font-medium text-gray-700">
                    Job
                  </label>
                  <select
                    id="jobId"
                    {...register('jobId', { required: 'Job is required' })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a job</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title} at {job.company}
                      </option>
                    ))}
                  </select>
                  {errors.jobId && (
                    <p className="mt-1 text-sm text-red-600">{errors.jobId.message}</p>
                  )}
                  {selectedJob && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{selectedJob.company} - {selectedJob.location}</p>
                    </div>
                  )}
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="resumeId" className="block text-sm font-medium text-gray-700">
                    Resume
                  </label>
                  <select
                    id="resumeId"
                    {...register('resumeId', { required: 'Resume is required' })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a resume</option>
                    {resumes.map(resume => (
                      <option key={resume.id} value={resume.id}>
                        {resume.name}
                      </option>
                    ))}
                  </select>
                  {errors.resumeId && (
                    <p className="mt-1 text-sm text-red-600">{errors.resumeId.message}</p>
                  )}
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {Object.values(ApplicationStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-700">
                    Applied Date
                  </label>
                  <input
                    type="date"
                    id="appliedDate"
                    {...register('appliedDate', { required: 'Applied date is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.appliedDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.appliedDate.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700">
                    Follow-up Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="followUpDate"
                    {...register('followUpDate')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
                    Interview Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="interviewDate"
                    {...register('interviewDate')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    {...register('notes')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add any notes about this application, interview feedback, etc."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="-ml-1 mr-2 h-5 w-5" />
            {isEditing ? 'Update Application' : 'Save Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;