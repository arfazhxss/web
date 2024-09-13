import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PDFViewer } from '@/components/pdf-viewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Resume',
};

export default function ResumePage() {
  const pdfPath = `@/resume.pdf`;
  console.log('PDF Path:', pdfPath);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Resume</h1>
      <p className="mb-4">Attempting to load PDF from: {pdfPath}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <PDFViewer pdfUrl={pdfPath} />
      </Suspense>
    </div>
  );
}