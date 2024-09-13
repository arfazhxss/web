'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

pdfjs.GlobalWorkerOptions.workerSrc = 'file://node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.mjs';

// pdfjs.GlobalWorkerOptions.workerSrc = "@/node_modules/@types/react-pdf/node_modules/pdfjs-dist/legacy/build/pdf.worker.js";

interface PDFViewerProps {
    pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: Readonly<PDFViewerProps>) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [error, setError] = useState<string | null>(null);

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setError(error.message);
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    if (error) {
        return <div>Error loading PDF: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<Loader2 className="animate-spin" />}
                className="flex flex-col items-center"
            >
                <Page
                    pageNumber={pageNumber}
                    className="mb-4 shadow-lg"
                    width={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 32 : 600)}
                />
            </Document>
            {numPages > 1 && (
                <div className="flex justify-between items-center mt-4 w-full max-w-[600px]">
                    <Button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                    >
                        Previous
                    </Button>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                    <Button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}