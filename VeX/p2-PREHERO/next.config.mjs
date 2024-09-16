import { withContentlayer } from "next-contentlayer";
import nextPwa from "@imbios/next-pwa";

const withPWA = nextPwa({
    dest: "public",
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		appDir: true,
		mdxRs: true,
		newNextLinkBehavior: true
	},
};

export default withPWA(withContentlayer(nextConfig));
