import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  Building2, 
  Search, 
  Plus, 
  Globe,
  ExternalLink,
  Calendar
} from 'lucide-react';

const CompanyList: React.FC = () => {
  const { companies } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <Link
          to="/companies/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Company
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
            placeholder="Search companies by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Company List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {filteredCompanies.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredCompanies.map(company => (
              <li key={company.id}>
                <Link to={`/companies/${company.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                          <Building2 className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-purple-600 truncate">{company.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Globe className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Website
                          </a>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <ExternalLink className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <a 
                            href={company.careersUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Careers Page
                          </a>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Added on <time dateTime={company.createdAt}>{format(new Date(company.createdAt), 'MMM d, yyyy')}</time>
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
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {companies.length === 0 
                ? "Get started by adding a new company." 
                : "Try adjusting your search to find what you're looking for."}
            </p>
            <div className="mt-6">
              <Link
                to="/companies/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Company
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;