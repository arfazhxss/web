export default function ResumePage() {
    return (
        <div className="bg-background text-foreground max-w-7xl">
            <header className="mb-12 text-center">
                <h1 className="font-bold mb-2
                    text-4xl
                    md:text-4xl 
                    lg:text-5xl">Arfaz Hossain</h1>
                <p className="text-muted-foreground mt-[-4px]
                    text-md 
                    md:text-md
                    lg:text-lg
                    ">Software Engineering Student</p>
            </header>
            <div className="mb-12">
                <h2 className="font-semibold mb-3
                    text-lg
                    md:text-lg
                    lg:text-2xl
                    ">My Resume</h2>
                <div className="aspect-[8/23.5] w-full max-w-9xl mx-auto overflow-hidden rounded-lg border bg-muted">
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