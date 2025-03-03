import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  Building2, 
  ClipboardList, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/jobs', label: 'Jobs', icon: <Briefcase size={20} /> },
    { path: '/resumes', label: 'Resumes', icon: <FileText size={20} /> },
    { path: '/applications', label: 'Applications', icon: <ClipboardList size={20} /> },
    { path: '/companies', label: 'Companies', icon: <Building2 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">CareerTracker</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CareerTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;