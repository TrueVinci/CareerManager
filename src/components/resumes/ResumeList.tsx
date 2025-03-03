import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar,
  Copy
} from 'lucide-react';

const ResumeList: React.FC = () => {
  const { resumes } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.content.personalInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resumes</h1>
        <Link
          to="/resumes/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Create Resume
        </Link>
      </div>
      
      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search resumes by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Resume List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {filteredResumes.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredResumes.map(resume => (
              <li key={resume.id}>
                <Link to={`/resumes/${resume.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-blue-600 truncate">{resume.name}</p>
                          <p className="text-sm text-gray-500">{resume.content.personalInfo.name}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {resume.content.experience.length} experiences
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Copy className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {resume.content.skills.length} skills
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Updated on <time dateTime={resume.updatedAt}>{format(new Date(resume.updatedAt), 'MMM d, yyyy')}</time>
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
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {resumes.length === 0 
                ? "Get started by creating a new resume." 
                : "Try adjusting your search to find what you're looking for."}
            </p>
            <div className="mt-6">
              <Link
                to="/resumes/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Create Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;