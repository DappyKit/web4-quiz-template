"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * Component that adds Farcaster Frame metadata to the document
 */
export default function FrameMetadata() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://web4-quiz-template.vercel.app";
  
  // Ensure our frame image has the correct aspect ratio (3:2)
  const frameImageUrl = `${baseUrl}/frame-image.svg`;
  const splashImageUrl = `${baseUrl}/splash-image.svg`;
  
  // Since we can't directly modify head in client components with App Router,
  // we'll use a client-side script to add the meta tags
  return (
    <Script id="farcaster-frame-metadata" strategy="afterInteractive">
      {`
        // Add Farcaster Frame metadata
        const metaTags = [
          { property: "fc:frame", content: "next" },
          { property: "fc:frame:image", content: "${frameImageUrl}" },
          { property: "fc:frame:button:1", content: "Start Quiz" },
          { property: "fc:frame:button:1:action", content: "launch_frame" },
          { property: "fc:frame:button:1:name", content: "DappyKit Quiz" },
          { property: "fc:frame:button:1:url", content: "${baseUrl}${pathname}" },
          { property: "fc:frame:button:1:splashImageUrl", content: "${splashImageUrl}" },
          { property: "fc:frame:button:1:splashBackgroundColor", content: "#6366f1" }
        ];

        // Add meta tags to document head
        metaTags.forEach(tag => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', tag.property);
          meta.setAttribute('content', tag.content);
          document.head.appendChild(meta);
        });
      `}
    </Script>
  );
} 