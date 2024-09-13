"use client";

import Particles from "@/components/particles";
import ScrollDownArrow from "@/components/ui/scroll-down-arrow";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function TitleWithParticles() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showSubtitle, setShowSubtitle] = useState(false);

    useEffect(() => {
        setMounted(true);

        const timer = setTimeout(() => {
            setShowSubtitle(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) { return null; }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            {showSubtitle && (
                <h2
                    className={`absolute top-[calc(33%-55px)] left-1/2 transform -translate-x-1/2 z-10 text-2xl sm:text-2xl md:text-2xl lg:text-2xl 
                    ${currentTheme === "dark" ? "text-white" : "text-black"} opacity-0 animate-fade-in delay-[4s] cursor-default  whitespace-nowrap`}
                > Hi! I am
                </h2>
            )}
            <h1
                className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-4xl 
                    sm:text-6xl md:text-6xl lg:text-6xl ${currentTheme === "dark" ? "text-white" : "text-black"
                    } cursor-default text-edge-outline animate-title font-display whitespace-nowrap`}
            > Arfaz Hussain
            </h1>
            <div className="absolute top-[calc(39%+100px)] right-1/2 left-1/2 transform -translate-x-1/2 z-10">
                <ScrollDownArrow />
            </div>
        </div>
    );
}
