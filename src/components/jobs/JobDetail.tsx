import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ExternalLink,
  Trash2,
  Edit,
  ArrowLeft,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, applications, deleteJob } = useAppStore();
  
  const job = jobs.find(j => j.id === id);
  
  if (!job) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Job not found</h3>
        <p className="mt-1 text-sm text-gray-500">The job you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Link
            to="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }
  
  const jobApplications = applications.filter(app => app.jobId === job.id);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      deleteJob(job.id);
      navigate('/jobs');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/jobs"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-1 h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/jobs/${job.id}/edit`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="-ml-1 mr-1 h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="-ml-1 mr-1 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Job Header */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.company}</p>
          </div>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            job.status === ApplicationStatus.APPLIED ? 'bg-blue-100 text-blue-800' :
            job.status === ApplicationStatus.INTERVIEWING ? 'bg-purple-100 text-purple-800' :
            job.status === ApplicationStatus.OFFER ? 'bg-green-100 text-green-800' :
            job.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-800' :
            job.status === ApplicationStatus.WITHDRAWN ? 'bg-gray-100 text-gray-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {job.status}
          </span>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{job.location}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                Date Posted
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{format(new Date(job.datePosted), 'MMMM d, yyyy')}</dd>
            </div>
            
            {job.applicationDeadline && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                  Application Deadline
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{format(new Date(job.applicationDeadline), 'MMMM d, yyyy')}</dd>
              </div>
            )}
            
            {job.salary && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DollarSign className="mr-1.5 h-4 w-4 text-gray-400" />
                  Salary
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{job.salary}</dd>
              </div>
            )}
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ExternalLink className="mr-1.5 h-4 w-4 text-gray-400" />
                Job URL
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  View Job Posting
                </a>
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ClipboardList className="mr-1.5 h-4 w-4 text-gray-400" />
                Applications
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{jobApplications.length}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Job Description */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Job Description</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose max-w-none">
            <p className="text-sm text-gray-900 whitespace-pre-line">{job.description}</p>
          </div>
        </div>
      </div>
      
      {/* Responsibilities */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Responsibilities</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <ul className="list-disc pl-5 space-y-2">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="text-sm text-gray-900">{responsibility}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Qualifications */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Qualifications</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <ul className="list-disc pl-5 space-y-2">
            {job.qualifications.map((qualification, index) => (
              <li key={index} className="text-sm text-gray-900">{qualification}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Notes */}
      {job.notes && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-900 whitespace-pre-line">{job.notes}</p>
          </div>
        </div>
      )}
      
      {/* Applications */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Applications</h3>
          <Link
            to={`/applications/new?jobId=${job.id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-1 h-4 w-4" />
            Add Application
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {jobApplications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {jobApplications.map(application => (
                <li key={application.id}>
                  <Link to={`/applications/${application.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              Applied on {format(new Date(application.appliedDate), 'MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            application.status === ApplicationStatus.APPLIED ? 'bg-blue-100 text-blue-800' :
                            application.status === ApplicationStatus.INTERVIEWING ? 'bg-purple-100 text-purple-800' :
                            application.status === ApplicationStatus.OFFER ? 'bg-green-100 text-green-800' :
                            application.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-800' :
                            application.status === ApplicationStatus.WITHDRAWN ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">No applications for this job yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;