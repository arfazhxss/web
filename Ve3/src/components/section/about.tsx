"use client";

import { DATA } from "@/data/resume";
import { useBlurFadeDelay } from "@/components/context/BlurFadeContext";
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";

export default function About() {
    const blurFadeDelay = useBlurFadeDelay();
    return (
        <section id="about">
            <BlurFade delay={blurFadeDelay * 7}>
                <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={blurFadeDelay * 9}>
                <Markdown className="prose max-w-full text-pretty text-sm dark:prose-invert font-light">
                    {DATA.summary}
                </Markdown>
            </BlurFade>
        </section>
    );
}