"use client";

import Link from "next/link";
import EmailButton from "@/components/ui/email-button";
import ScrollDownArrow from "@/components/ui/scroll-down-arrow";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from 'lucide-react';

export default function PreHeroTitle() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) { return null; }

    return (
        <section id="pre-hero">
            <div className="relative flex flex-col items-center justify-center min-h-screen">
                <h1
                    className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-4xl 
                    sm:text-6xl md:text-6xl lg:text-6xl ${currentTheme === "dark" ? "text-white" : "text-black"
                        } cursor-default text-edge-outline animate-title font-display whitespace-nowrap opacity-80`}
                > Arfaz Hussain
                </h1>
                <div className="absolute top-[calc(25%+47px)] animate-fade-in delay-[4s] flex gap-2">
                    <Button asChild variant={'outline'} size="sm">
                        <Link href="/resume.pdf">
                            View Resume <ArrowUpRightIcon className="ml-2 size-4" />
                        </Link>
                    </Button>
                    <EmailButton />
                </div>
                <div className="absolute top-[calc(39%+100px)] right-1/2 left-1/2 transform -translate-x-1/2 z-10">
                    <ScrollDownArrow />
                </div>
            </div>
        </section>
    );
}
