import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { File, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { resumes } = useAppStore();

  const resume = resumes.find(r => r.id === id);

  if (!resume) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Resume not found</h3>
        <p className="mt-1 text-sm text-gray-500">The resume you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Link
            to="/resumes"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to Resumes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/resumes"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="-ml-1 mr-1 h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{resume.name}</h1>
        </div>
      </div>

      {/* Resume Details */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Resume Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Information about {resume.name}
            </p>
          </div>
          <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
            <File className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Uploaded On</dt>
              <dd className="mt-1 text-sm text-gray-900">{format(new Date(resume.uploadDate), 'MMMM d, yyyy')}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">File</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Link to={`/resumes/view/${resume.id}`} className="text-indigo-600 hover:text-indigo-900">
                  View Resume
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
