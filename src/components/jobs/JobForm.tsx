import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store';
import { Job, ApplicationStatus } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

type JobFormData = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

const JobForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, addJob, updateJob } = useAppStore();
  
  const isEditing = Boolean(id);
  const job = isEditing ? jobs.find(j => j.id === id) : null;
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<JobFormData>({
    defaultValues: job ? {
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      datePosted: job.datePosted,
      applicationDeadline: job.applicationDeadline,
      salary: job.salary,
      url: job.url,
      status: job.status,
      notes: job.notes,
    } : {
      status: ApplicationStatus.SAVED,
      responsibilities: [''],
      qualifications: [''],
      datePosted: new Date().toISOString().split('T')[0],
    }
  });
  
  const [responsibilities, setResponsibilities] = React.useState<string[]>(
    job?.responsibilities || ['']
  );
  
  const [qualifications, setQualifications] = React.useState<string[]>(
    job?.qualifications || ['']
  );
  
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };
  
  const removeResponsibility = (index: number) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities.splice(index, 1);
    setResponsibilities(newResponsibilities);
  };
  
  const addQualification = () => {
    setQualifications([...qualifications, '']);
  };
  
  const removeQualification = (index: number) => {
    const newQualifications = [...qualifications];
    newQualifications.splice(index, 1);
    setQualifications(newQualifications);
  };
  
  const onSubmit = (data: JobFormData) => {
    // Filter out empty responsibilities and qualifications
    const filteredResponsibilities = responsibilities
      .map(r => r.trim())
      .filter(r => r !== '');
    
    const filteredQualifications = qualifications
      .map(q => q.trim())
      .filter(q => q !== '');
    
    const jobData = {
      ...data,
      responsibilities: filteredResponsibilities,
      qualifications: filteredQualifications,
    };
    
    if (isEditing && job) {
      updateJob(job.id, jobData);
      navigate(`/jobs/${job.id}`);
    } else {
      const newJobId = addJob(jobData);
      navigate(`/jobs/${newJobId}`);
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
            {isEditing ? 'Edit Job' : 'Add New Job'}
          </h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Job Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Basic information about the job position.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register('title', { required: 'Job title is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company', { required: 'Company is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    {...register('location', { required: 'Location is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    id="salary"
                    {...register('salary')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="datePosted" className="block text-sm font-medium text-gray-700">
                    Date Posted
                  </label>
                  <input
                    type="date"
                    id="datePosted"
                    {...register('datePosted', { required: 'Date posted is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.datePosted && (
                    <p className="mt-1 text-sm text-red-600">{errors.datePosted.message}</p>
                  )}
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                    Application Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    {...register('applicationDeadline')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Job URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    {...register('url', { required: 'Job URL is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.url && (
                    <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
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
                
                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register('description', { required: 'Job description is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Responsibilities</h3>
              <p className="mt-1 text-sm text-gray-500">
                List the key responsibilities for this position.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-4">
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => {
                        const newResponsibilities = [...responsibilities];
                        newResponsibilities[index] = e.target.value;
                        setResponsibilities(newResponsibilities);
                      }}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={responsibilities.length === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Responsibility
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Qualifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                List the required qualifications for this position.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-4">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => {
                        const newQualifications = [...qualifications];
                        newQualifications[index] = e.target.value;
                        setQualifications(newQualifications);
                      }}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Qualification ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={qualifications.length === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQualification}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Qualification
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notes</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add any personal notes about this job.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <textarea
                id="notes"
                rows={4}
                {...register('notes')}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add any personal notes, thoughts, or reminders about this job..."
              />
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
            {isEditing ? 'Update Job' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;