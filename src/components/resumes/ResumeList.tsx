import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { File, Plus } from 'lucide-react';
import { format } from 'date-fns';

const ResumeList: React.FC = () => {
  const { resumes } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resumes</h1>
        <Link
          to="/resumes/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Upload Resume
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        {resumes.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {resumes.map((resume) => (
              <li key={resume.id}>
                <Link to={`/resumes/${resume.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">{resume.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <File className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Uploaded {format(new Date(resume.uploadDate), 'MMM d, yyyy')}
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
            <p className="text-sm text-gray-500">No resumes uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;
