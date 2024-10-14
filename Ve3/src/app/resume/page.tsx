"use client";
import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

export default function ResumePage() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const zoomPluginInstance = zoomPlugin();
    const { ZoomIn: ZoomInButton, ZoomOut: ZoomOutButton } = zoomPluginInstance;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Arfaz_Hossain_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg md:text-lg lg:text-2xl">
                        My Resume
                    </h2>
                    <div className="flex space-x-2">
                        <ZoomOutButton>
                            {(props) => (
                                <Button variant="outline" size="icon" {...props}>
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                            )}
                        </ZoomOutButton>
                        <ZoomInButton>
                            {(props) => (
                                <Button variant="outline" size="icon" {...props}>
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            )}
                        </ZoomInButton>
                        <Button variant="outline" size="icon" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="w-full max-w-9xl mx-auto overflow-hidden rounded-lg border border-gray-600 bg-gray-800">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div style={{ height: 'calc(100vh - 200px)' }}>
                            <Viewer
                                fileUrl="/resume.pdf"
                                plugins={[defaultLayoutPluginInstance, zoomPluginInstance]}
                                theme="dark"
                            />
                        </div>
                    </Worker>
                </div>
            </div>
        </div>
    );
}