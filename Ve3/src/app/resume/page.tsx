"use client";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ResumePage() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className="bg-background text-foreground max-w-7xl mx-auto px-4">
            <header className="mb-12 text-center">
                <h1 className="font-bold mb-2 text-4xl md:text-4xl lg:text-5xl">
                    Arfaz Hossain
                </h1>
                <p className="text-muted-foreground mt-[-4px] text-md md:text-md lg:text-lg">
                    Software Engineering Student
                </p>
            </header>
            <div className="mb-12">
                <h2 className="font-semibold mb-3 text-lg md:text-lg lg:text-2xl">
                    My Resume
                </h2>
                <div className="w-full max-w-9xl mx-auto overflow-hidden rounded-lg border border-gray-600 bg-gray-800">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div style={{ height: 'calc(100vh - 200px)' }}>
                            <Viewer
                                fileUrl="/resume.pdf"
                                plugins={[defaultLayoutPluginInstance]}
                                theme="dark"
                            />
                        </div>
                    </Worker>
                </div>
            </div>
        </div>
    );
}