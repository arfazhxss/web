import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { BeamAnalytics } from "./components/beam-analytics";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
	metadataBase: new URL("https://davidemarcoli.de"),
	title: {
		default: "Davide Marcoli",
		template: "%s | Davide Marcoli's Portfolio",
	},
	description: "Software engineer at SIX",
	openGraph: {
		title: "Davide Marcoli's Portfolio",
		description: "Davide Marcoli is a software engineer at SIX",
		siteName: "Davide Marcoli's Portfolio",
		images: [
			{
				url: `/og.png`,
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "davidemarcoli",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
	keywords: ["davide", "marcoli", "davide marcoli", "software developer", "portfolio"]
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<Head>
				<BeamAnalytics />
				<link rel="manifest" href="/manifest.webmanifest" />
				<link rel="apple-touch-icon" href="/icon-192x192.png" />
				<meta name="theme-color" content="#042940" />
			</Head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
				<Analytics/>
			</body>
		</html>
	);
}
