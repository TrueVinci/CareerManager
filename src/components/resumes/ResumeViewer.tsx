import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../store';

const ResumeViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { resumes } = useAppStore();

  const resume = resumes.find(r => r.id === id);

  if (!resume) {
    return <div>Resume not found.</div>;
  }

  // Construct the data URI for the PDF
  const pdfDataUri = `data:application/pdf;base64,${resume.file}`;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <object data={pdfDataUri} type="application/pdf" width="100%" height="100%">
        <p>It appears you don't have a PDF plugin for this browser.
          No biggie... you can <a href={pdfDataUri}>click here to
          download the PDF file.</a></p>
      </object>
    </div>
  );
};

export default ResumeViewer;
