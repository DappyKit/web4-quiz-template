import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dappy-quiz-template.vercel.app";
const frameImageUrl = `${baseUrl}/frame-image.png`;
const splashImageUrl = `${baseUrl}/splash-image.png`;

/**
 * Application metadata including Farcaster Frame metadata
 */
export const metadata: Metadata = {
  title: "Quiz Game",
  description: "Test your knowledge with this fun quiz game!",
  authors: [{ name: "DappyKit" }],
  // Farcaster Frame metadata (extended metadata)
  other: {
    "fc:frame": "next",
    "fc:frame:image": frameImageUrl,
    "fc:frame:button:1": "Start Quiz",
    "fc:frame:button:1:action": "launch_frame",
    "fc:frame:button:1:name": "DappyKit Quiz",
    "fc:frame:button:1:url": baseUrl,
    "fc:frame:button:1:splashImageUrl": splashImageUrl,
    "fc:frame:button:1:splashBackgroundColor": "#6366f1"
  },
}; 