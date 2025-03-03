import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  Building2, 
  Globe, 
  ExternalLink, 
  Trash2, 
  Edit, 
  ArrowLeft,
  FileText,
  Briefcase
} from 'lucide-react';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { companies, jobs, deleteCompany } = useAppStore();
  
  const company = companies.find(c => c.id === id);
  
  if (!company) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Company not found</h3>
        <p className="mt-1 text-sm text-gray-500">The company you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Link
            to="/companies"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }
  
  // Find jobs related to this company
  const companyJobs = jobs.filter(job => job.company.toLowerCase() === company.name.toLowerCase());
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
      deleteCompany(company.id);
      navigate('/companies');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/companies"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-1 h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/companies/${company.id}/edit`}
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
      
      {/* Company Details */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Company Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Information about {company.name}
            </p>
          </div>
          <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
            <Building2 className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Globe className="mr-1.5 h-4 w-4 text-gray-400" />
                Website
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  {company.website}
                </a>
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ExternalLink className="mr-1.5 h-4 w-4 text-gray-400" />
                Careers Page
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={company.careersUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  View Careers Page
                </a>
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Briefcase className="mr-1.5 h-4 w-4 text-gray-400" />
                Jobs Tracked
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{companyJobs.length}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Added On</dt>
              <dd className="mt-1 text-sm text-gray-900">{format(new Date(company.createdAt), 'MMMM d, yyyy')}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Notes */}
      {company.notes && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-900 whitespace-pre-line">{company.notes}</p>
          </div>
        </div>
      )}
      
      {/* Jobs at this company */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Jobs at {company.name}</h3>
          <Link
            to={`/jobs/new`}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-1 h-4 w-4" />
            Add Job
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {companyJobs.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {companyJobs.map(job => (
                <li key={job.id}>
                  <Link to={`/jobs/${job.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-indigo-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{job.title}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {job.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">No jobs tracked for this company yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;