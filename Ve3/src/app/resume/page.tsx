export default function ResumePage() {
    return (
        <div className="bg-background text-foreground max-w-7xl">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-2">Arfaz Hossain</h1>
                <p className="text-xl text-muted-foreground">Software Engineering Student</p>
            </header>
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">My Resume</h2>
                <div className="aspect-[20.5/25] w-full max-w-9xl mx-auto overflow-hidden rounded-lg border bg-muted">
                    <iframe
                        src="/resume.pdf"
                        className="w-full h-full"
                        title="Arfaz's Resume"
                    />
                </div>
            </div>
        </div>
    )
}