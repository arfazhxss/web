"use client"

import React, { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import BlurFade from "@/components/magicui/blur-fade";
import { useBlurFadeDelay } from "@/components/context/BlurFadeContext";

interface TimelineItem {
    name: string
    timeline: string
    category: string
}

const timelineData: TimelineItem[] = [
    { "name": "Software Team Lead", "timeline": "Feb 2023 - Present", "category": "work" },
    { "name": "Data Analyst and Marketing Intern", "timeline": "Jan 2021 - Aug 2021", "category": "work" },
    { "name": "Bachelor of Engineering in Software Engineering, University of Victoria", "timeline": "Sep 2021 - May 2026 (Expected)", "category": "education" },
    { "name": "Course Planner", "timeline": "Feb 2024 - Present", "category": "project" },
    { "name": "Automated Application System", "timeline": "Dec 2023 - Present", "category": "project" },
    { "name": "Jabref - Open Source Contributions", "timeline": "Dec 2023 - May 2024", "category": "project" },
    { "name": "Ground Support System", "timeline": "Jul 2023 - Jan 2024", "category": "project" },
    { "name": "Rubik's Cube (3D Simulation)", "timeline": "Feb 2023 - Jun 2023", "category": "project" },
    { "name": "Lexicographic Context Mapper", "timeline": "May 2023 - Aug 2023", "category": "project" },
    { "name": "VEX Robotics Project", "timeline": "Jan 2022 - Apr 2022", "category": "project" },
    { "name": "T-Rex Game - Java Implementation", "timeline": "Aug 2021 - Dec 2021", "category": "project" },
    { "name": "Next.js & React.js - Udemy, Maximilian Schwarzmüller", "timeline": "2024", "category": "course" },
    { "name": "Understanding TypeScript - Udemy, Maximilian Schwarzmüller", "timeline": "2024", "category": "course" },
    { "name": "Computational Geometry Algorithm in C++ - Udemy, Kasun Liyanage", "timeline": "2024", "category": "course" },
    { "name": "BackEnd Development in Node.js & Express - Udemy, Jonas Schmedtmann", "timeline": "2022 - 2024", "category": "course" },
    { "name": "Agile Fundamentals: Scrum & Kanban - Udemy", "timeline": "2023", "category": "course" },
    { "name": "Computer Graphics with Modern OpenGL & C++ - Udemy, Ben Cook", "timeline": "2023", "category": "course" },
    { "name": "Data Structures & Algorithms in C and C++ - Udemy, Abdul Bari", "timeline": "2023", "category": "course" },
    { "name": "JavaScript ES6 - Udemy, Jonas Schmedtmann", "timeline": "2022 - 2023", "category": "course" },
    { "name": "Complete Web Bootcamp - Udemy, Angela Yu", "timeline": "2021", "category": "course" }
]

const START_YEAR = 2021
const END_YEAR = new Date().getFullYear()
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseDate(dateString: string): Date {
    if (dateString === 'Present') return new Date()
    if (dateString.includes('Expected')) dateString = dateString.replace('(Expected)', '').trim()

    const parts = dateString.split(' ')
    let date: Date
    if (parts.length === 1) {
        date = new Date(parseInt(parts[0]), 0)
    } else {
        const month = MONTHS.indexOf(parts[0])
        const year = parseInt(parts[1])
        date = new Date(year, month)
    }

    // Cap the date at the current date
    const currentDate = new Date()
    return date > currentDate ? currentDate : date
}

function getMonthsBetween(start: Date, end: Date): number {
    return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1
}

const categoryStyles: { [key: string]: string } = {
    work: "border-t-2 border-primary",
    education: "border-t-2 border-secondary",
    project: "border-t-2 border-accent",
    course: "border-t-2 border-muted"
}

export default function Timeline() {
    const [activeItem, setActiveItem] = useState<TimelineItem | null>(
        timelineData.find(item => item.name.includes("Bachelor of Engineering in Software Engineering"))
    )
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const blurFadeDelay = useBlurFadeDelay();

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -100 : 100
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollContainerRef.current) {
                e.preventDefault()
                scrollContainerRef.current.scrollLeft += e.deltaY
            }
        }

        const currentRef = scrollContainerRef.current
        currentRef?.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            currentRef?.removeEventListener('wheel', handleWheel)
        }
    }, [])

    const totalMonths = (END_YEAR - START_YEAR + 1) * 12

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-4">
                <BlurFade delay={blurFadeDelay * 5}>
                    <h2 className="text-lg font-bold mb-2 text-center">Timeline Graph</h2>
                </BlurFade>
                <div className="relative">
                    <button
                        onClick={() => handleScroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 p-1 rounded-full shadow-md"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-3 w-3" />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 p-1 rounded-full shadow-md"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-3 w-3" />
                    </button>
                    <BlurFade delay={blurFadeDelay * 7}>
                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-scroll scrollbar-hide"
                        >
                            <div className="w-[900px] h-[200px] relative">
                                {/* Year labels */}
                                <div className="absolute top-0 left-0 w-full h-4 flex">
                                    {Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i).map((year) => (
                                        <div key={year} className="flex-1 border-l border-gray-300 text-[8px] text-center">
                                            {year}
                                        </div>
                                    ))}
                                </div>

                                {/* Timeline bars */}
                                {timelineData.map((item, index) => {
                                    const [startStr, endStr] = item.timeline.split(' - ')
                                    const start = parseDate(startStr)
                                    const end = endStr ? parseDate(endStr) : new Date()
                                    const startMonth = getMonthsBetween(new Date(START_YEAR, 0), start)
                                    const duration = getMonthsBetween(start, end)

                                    return (
                                        <BlurFade key={item.name} delay={blurFadeDelay * (9 + index * 2)}>
                                            <button
                                                className={`absolute h-3 cursor-pointer transition-all duration-200 hover:bg-muted/50 ${categoryStyles[item.category]}`}
                                                style={{
                                                    left: `${(startMonth / totalMonths) * 100}%`,
                                                    width: `${(duration / totalMonths) * 100}%`,
                                                    top: `${20 + index * 9}px`,
                                                }}
                                                onClick={() => setActiveItem(item)}
                                                onKeyDown={(e) => e.key === 'Enter' && setActiveItem(item)}
                                                aria-label={`${item.name}: ${item.timeline}`}
                                            >
                                                <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-[6px] font-semibold text-foreground truncate w-full pr-1">
                                                    {item.name}
                                                </span>
                                            </button>
                                        </BlurFade>
                                    )
                                })}
                            </div>
                        </div>
                    </BlurFade>
                </div>
                {activeItem && (
                    <BlurFade delay={blurFadeDelay * (9 + timelineData.length * 2)}>
                        <div className="mt-2 text-center">
                            <h3 className="text-sm font-semibold">{activeItem.name}</h3>
                            <p className="text-xs text-muted-foreground">{activeItem.timeline}</p>
                        </div>
                    </BlurFade>
                )}
            </CardContent>
        </Card>
    )
}