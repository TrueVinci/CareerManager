import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import JobList from './components/jobs/JobList';
import JobDetail from './components/jobs/JobDetail';
import JobForm from './components/jobs/JobForm';
import ResumeList from './components/resumes/ResumeList';
import ResumeDetail from './components/resumes/ResumeDetail';
import ResumeForm from './components/resumes/ResumeForm';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationDetail from './components/applications/ApplicationDetail';
import ApplicationForm from './components/applications/ApplicationForm';
import CompanyList from './components/companies/CompanyList';
import CompanyDetail from './components/companies/CompanyDetail';
import CompanyForm from './components/companies/CompanyForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* Jobs Routes */}
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="jobs/new" element={<JobForm />} />
          <Route path="jobs/:id/edit" element={<JobForm />} />
          
          {/* Resumes Routes */}
          <Route path="resumes" element={<ResumeList />} />
          <Route path="resumes/:id" element={<ResumeDetail />} />
          <Route path="resumes/new" element={<ResumeForm />} />
          <Route path="resumes/:id/edit" element={<ResumeForm />} />
          
          {/* Applications Routes */}
          <Route path="applications" element={<ApplicationList />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="applications/new" element={<ApplicationForm />} />
          <Route path="applications/:id/edit" element={<ApplicationForm />} />
          
          {/* Companies Routes */}
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
          <Route path="companies/new" element={<CompanyForm />} />
          <Route path="companies/:id/edit" element={<CompanyForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;