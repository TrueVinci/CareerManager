import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { format } from 'date-fns';
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Calendar,
  Trash2,
  Edit,
  ArrowLeft,
  Plus
} from 'lucide-react';

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, deleteResume } = useAppStore();
  
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
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      deleteResume(resume.id);
      navigate('/resumes');
    }
  };
  
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
        <div className="flex space-x-3">
          <Link
            to={`/resumes/${resume.id}/edit`}
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
      
      {/* Resume Content */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{resume.content.personalInfo.name}</h2>
          <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              {resume.content.personalInfo.email}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              {resume.content.personalInfo.phone}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              {resume.content.personalInfo.location}
            </div>
            {resume.content.personalInfo.website && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Globe className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <a href={resume.content.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Website
                </a>
              </div>
            )}
            {resume.content.personalInfo.linkedin && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Linkedin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <a href={resume.content.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {resume.content.personalInfo.github && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Github className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <a href={resume.content.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{resume.content.summary}</p>
          </div>
          
          {/* Experience */}
          {resume.content.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-gray-600" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {resume.content.experience.map(exp => (
                  <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company} - {exp.location}</p>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(exp.startDate), 'MMM yyyy')} - {exp.current ? 'Present' : (exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : '')}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Key Achievements:</h4>
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {resume.content.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-gray-600" />
                Education
              </h2>
              <div className="space-y-6">
                {resume.content.education.map(edu => (
                  <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-gray-600">{edu.institution} - {edu.location}</p>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(edu.startDate), 'MMM yyyy')} - {edu.current ? 'Present' : (edu.endDate ? format(new Date(edu.endDate), 'MMM yyyy') : '')}
                        </span>
                      </div>
                    </div>
                    {edu.gpa && <p className="mt-1 text-gray-700">GPA: {edu.gpa}</p>}
                    {edu.achievements.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Achievements & Activities:</h4>
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Skills */}
          {resume.content.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.content.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications */}
          {resume.content.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-gray-600" />
                Certifications
              </h2>
              <div className="space-y-3">
                {resume.content.certifications.map(cert => (
                  <div key={cert.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(cert.date), 'MMM yyyy')}
                          {cert.expiryDate && ` - ${format(new Date(cert.expiryDate), 'MMM yyyy')}`}
                        </span>
                      </div>
                    </div>
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-1 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects */}
          {resume.content.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Code className="h-5 w-5 mr-2 text-gray-600" />
                Projects
              </h2>
              <div className="space-y-5">
                {resume.content.projects.map(project => (
                  <div key={project.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(project.startDate), 'MMM yyyy')} - {project.current ? 'Present' : (project.endDate ? format(new Date(project.endDate), 'MMM yyyy') : '')}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-1 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;