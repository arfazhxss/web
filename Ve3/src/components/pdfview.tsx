import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PDFViewer() {
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Sample PDF Document</CardTitle>
                <CardDescription>A brief overview of our company&apos;s annual report</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">About this PDF</h3>
                    <p className="text-sm text-muted-foreground">
                        This document contains financial statements, key performance indicators, and future projections for our company. It&apos;s 25 pages long and was last updated on March 15, 2024.
                    </p>
                </div>
                <div className="aspect-[16/9] overflow-hidden rounded-lg border bg-muted">
                    <iframe
                        src="/resume.pdf"
                        className="w-full h-full"
                        title="Sample PDF Viewer"
                    />
                </div>
            </CardContent>
        </Card>
    )
}