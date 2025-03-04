import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CompanyList from './components/companies/CompanyList';
import CompanyDetail from './components/companies/CompanyDetail';
import CompanyForm from './components/companies/CompanyForm';
import JobList from './components/jobs/JobList';
import JobDetail from './components/jobs/JobDetail';
import JobForm from './components/jobs/JobForm';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationDetail from './components/applications/ApplicationDetail';
import ApplicationForm from './components/applications/ApplicationForm';
import ResumeList from './components/resumes/ResumeList';
import ResumeDetail from './components/resumes/ResumeDetail';
import ResumeForm from './components/resumes/ResumeForm';
import ResumeViewer from './components/resumes/ResumeViewer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
          <Route path="companies/new" element={<CompanyForm />} />
          <Route path="companies/:id/edit" element={<CompanyForm />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="jobs/new" element={<JobForm />} />
          <Route path="jobs/:id/edit" element={<JobForm />} />
          <Route path="applications" element={<ApplicationList />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="applications/new" element={<ApplicationForm />} />
          <Route path="applications/:id/edit" element={<ApplicationForm />} />
          <Route path="resumes" element={<ResumeList />} />
          <Route path="resumes/:id" element={<ResumeDetail />} />
          <Route path="resumes/new" element={<ResumeForm />} />
          {/* New route for the resume viewer */}
          <Route path="resumes/view/:id" element={<ResumeViewer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
