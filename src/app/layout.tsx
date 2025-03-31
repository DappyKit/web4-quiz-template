import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FarcasterProvider } from "./components/FarcasterProvider";
import { metadata } from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

/**
 * Root layout component that wraps all pages
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="fc:frame" content={`{
          "version": "next",
          "imageUrl": "https://web4-quiz-template.vercel.app/frame-image.png",
          "aspectRatio": "3:2",
          "button": {
            "title": "Start Quiz",
            "action": {
              "type": "launch_frame",
              "name": "DappyKit Quiz",
              "url": "https://web4-quiz-template.vercel.app",
              "splashImageUrl": "https://web4-quiz-template.vercel.app/splash.png",
              "splashBackgroundColor": "#6366f1"
            }
          }
        }`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dots`}
      >
        {/* Decorative Circles */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Top left circle */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-400/20 dark:from-indigo-700/20 dark:to-purple-800/20 blur-3xl floating-slow"></div>
          
          {/* Bottom right circle */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-800/20 dark:to-pink-800/20 blur-3xl floating"></div>
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 dark:from-blue-800/10 dark:to-indigo-800/10 blur-3xl floating-delay"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          <FarcasterProvider>
            {children}
          </FarcasterProvider>
        </div>
        
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full p-2 flex justify-center items-center text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
          <p className="text-center">
            <span className="pulse inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
            Powered by DappyKit Quiz Engine
          </p>
        </footer>
      </body>
    </html>
  );
}
