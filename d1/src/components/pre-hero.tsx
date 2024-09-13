"use client";

import Particles from "@/components/particles";
import ScrollDownArrow from "@/components/ui/scroll-down-arrow";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function TitleWithParticles() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) { return null; }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            <h1
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-4xl sm:text-6xl md:text-6xl lg:text-6xl ${currentTheme === "dark" ? "text-white" : "text-black"
                    } cursor-default text-edge-outline animate-title font-display whitespace-nowrap`}
            >
                Arfaz Hussain
            </h1>
            <div className="absolute top-[calc(53%+100px)] left-1/2 transform -translate-x-1/2 z-10">
                <ScrollDownArrow />
            </div>
            {/* <Particles className="absolute inset-0 -z-50 animate-fade-in" quantity={1000} /> */}
        </div >
    );
}
