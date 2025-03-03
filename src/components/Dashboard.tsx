import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { format } from 'date-fns';
import { 
  Briefcase, 
  FileText, 
  Building2, 
  ClipboardList,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { ApplicationStatus } from '../types';

const Dashboard: React.FC = () => {
  const { jobs, applications, resumes, companies } = useAppStore();
  
  // Calculate statistics
  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const totalResumes = resumes.length;
  const totalCompanies = companies.length;
  
  // Application status counts
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<ApplicationStatus, number>);
  
  // Recent applications
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  // Upcoming deadlines
  const upcomingDeadlines = jobs
    .filter(job => job.applicationDeadline)
    .sort((a, b) => {
      if (!a.applicationDeadline || !b.applicationDeadline) return 0;
      return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
    })
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Link
            to="/jobs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Job
          </Link>
          <Link
            to="/applications/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Track Application
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Briefcase className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalJobs}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/jobs" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <ClipboardList className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Applications</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalApplications}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/applications" className="font-medium text-green-600 hover:text-green-500">
                View all
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Resumes</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalResumes}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/resumes" className="font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Companies</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalCompanies}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/companies" className="font-medium text-purple-600 hover:text-purple-500">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Application Status */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Application Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.SAVED] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Saved</div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <ClipboardList className="h-8 w-8 text-indigo-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.APPLIED] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Applied</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.INTERVIEWING] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Interviewing</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.OFFER] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Offers</div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.REJECTED] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Rejected</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <AlertCircle className="h-8 w-8 text-gray-500" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[ApplicationStatus.WITHDRAWN] || 0}</div>
              <div className="mt-1 text-sm text-gray-500">Withdrawn</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentApplications.length > 0 ? (
              recentApplications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <div key={app.id} className="p-4 hover:bg-gray-50">
                    <Link to={`/applications/${app.id}`} className="block">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-indigo-600">{job?.title || 'Unknown Position'}</p>
                          <p className="text-sm text-gray-500">{job?.company || 'Unknown Company'}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === ApplicationStatus.APPLIED ? 'bg-blue-100 text-blue-800' :
                            app.status === ApplicationStatus.INTERVIEWING ? 'bg-purple-100 text-purple-800' :
                            app.status === ApplicationStatus.OFFER ? 'bg-green-100 text-green-800' :
                            app.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-800' :
                            app.status === ApplicationStatus.WITHDRAWN ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                          <p className="mt-1 text-xs text-gray-500">
                            {format(new Date(app.appliedDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                No applications yet. Start tracking your job applications!
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link to="/applications" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all applications
              </Link>
            </div>
          </div>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Deadlines</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map(job => (
                <div key={job.id} className="p-4 hover:bg-gray-50">
                  <Link to={`/jobs/${job.id}`} className="block">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">
                          {job.applicationDeadline && format(new Date(job.applicationDeadline), 'MMM d, yyyy')}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Deadline</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No upcoming deadlines. Add jobs with deadlines to see them here!
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link to="/jobs" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;