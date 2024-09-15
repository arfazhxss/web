export default function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    if (readingTime === 1) {
        return '1 minute read';
    } else {
        return `${readingTime} minute read`;
    }
}