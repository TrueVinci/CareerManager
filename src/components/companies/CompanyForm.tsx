import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store';
import { Company } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

type CompanyFormData = Omit<Company, 'id' | 'createdAt' | 'updatedAt'>;

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { companies, addCompany, updateCompany } = useAppStore();
  
  const isEditing = Boolean(id);
  const company = isEditing ? companies.find(c => c.id === id) : null;
  
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormData>({
    defaultValues: company ? {
      name: company.name,
      website: company.website,
      careersUrl: company.careersUrl,
      notes: company.notes,
    } : {
      name: '',
      website: '',
      careersUrl: '',
      notes: '',
    }
  });
  
  const onSubmit = (data: CompanyFormData) => {
    if (isEditing && company) {
      updateCompany(company.id, data);
      navigate(`/companies/${company.id}`);
    } else {
      const newCompanyId = addCompany(data);
      navigate(`/companies/${newCompanyId}`);
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
            {isEditing ? 'Edit Company' : 'Add New Company'}
          </h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Company Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Basic information about the company.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Company name is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    {...register('website', { required: 'Website URL is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="careersUrl" className="block text-sm font-medium text-gray-700">
                    Careers Page URL
                  </label>
                  <input
                    type="url"
                    id="careersUrl"
                    {...register('careersUrl', { required: 'Careers page URL is required' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://example.com/careers"
                  />
                  {errors.careersUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.careersUrl.message}</p>
                  )}
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    {...register('notes')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add any notes about this company, such as contacts, application process, etc."
                  />
                </div>
              </div>
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
            {isEditing ? 'Update Company' : 'Save Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;