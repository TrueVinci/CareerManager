import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  Briefcase, 
  Search, 
  Plus, 
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  Filter
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

const JobList: React.FC = () => {
  const { jobs } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <Link
          to="/jobs/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Job
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search jobs by title, company, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'All')}
              >
                <option value="All">All Statuses</option>
                {Object.values(ApplicationStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Job List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {filteredJobs.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredJobs.map(job => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2">
                          <Briefcase className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-indigo-600 truncate">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.company}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
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
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex sm:space-x-4">
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Posted on <time dateTime={job.datePosted}>{format(new Date(job.datePosted), 'MMM d, yyyy')}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {jobs.length === 0 
                ? "Get started by adding a new job." 
                : "Try adjusting your search or filter to find what you're looking for."}
            </p>
            <div className="mt-6">
              <Link
                to="/jobs/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;