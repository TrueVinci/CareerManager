import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  ClipboardList, 
  Trash2, 
  Edit, 
  ArrowLeft, 
  Calendar, 
  Briefcase, 
  FileText, 
  MapPin, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, jobs, resumes, deleteApplication } = useAppStore();
  
  const application = applications.find(a => a.id === id);
  
  if (!application) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Application not found</h3>
        <p className="mt-1 text-sm text-gray-500">The application you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Link
            to="/applications"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }
  
  const job = jobs.find(j => j.id === application.jobId);
  const resume = resumes.find(r => r.id === application.resumeId);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      deleteApplication(application.id);
      navigate('/applications');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/applications"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-1 h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Application for {job?.title || 'Unknown Position'}
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/applications/${application.id}/edit`}
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
      
      {/* Application Header */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {job?.company || 'Unknown Company'}
            </p>
          </div>
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
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                Applied Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{format(new Date(application.appliedDate), 'MMMM d, yyyy')}</dd>
            </div>
            
            {application.followUpDate && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                  Follow-up Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{format(new Date(application.followUpDate), 'MMMM d, yyyy')}</dd>
              </div>
            )}
            
            {application.interviewDate && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                  Interview Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{format(new Date(application.interviewDate), 'MMMM d, yyyy')}</dd>
              </div>
            )}
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="mr-1.5 h-4 w-4 text-gray-400" />
                Resume Used
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Link to={`/resumes/${resume?.id}`} className="text-indigo-600 hover:text-indigo-500">
                  {resume?.name || 'Unknown Resume'}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Job Details */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Job Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {job ? (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Briefcase className="mr-1.5 h-4 w-4 text-gray-400" />
                  Position
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <Link to={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-500">
                    {job.title}
                  </Link>
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Briefcase className="mr-1.5 h-4 w-4 text-gray-400" />
                  Company
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{job.company}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{job.location}</dd>
              </div>
              
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
              
              {job.applicationDeadline && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                    Application Deadline
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{format(new Date(job.applicationDeadline), 'MMMM d, yyyy')}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="text-sm text-gray-500">Job information not available.</p>
          )}
        </div>
      </div>
      
      {/* Notes */}
      {application.notes && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-900 whitespace-pre-line">{application.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;