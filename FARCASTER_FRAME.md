# Farcaster Frame Integration

This document explains how the Farcaster Frame integration works in this Quiz application.

## Frame Meta Tag

The application uses a Farcaster Frame meta tag in the `<head>` section of the HTML document, following the Farcaster specification. This meta tag is defined in `src/app/layout.tsx`:

```html
<meta name="fc:frame" content='{
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
}' />
```

## Required Images

The Frame integration requires two main images:

1. **Frame Image** (`public/frame-image.png`): This image should have a 3:2 aspect ratio and is displayed when the frame is shown in a Farcaster feed.

2. **Splash Image** (`public/splash.png`): This image is displayed as a splash screen when the frame application is loading.

Replace these placeholder images with actual PNG files that match the required dimensions.

## Frame Manifest

In addition to the meta tag, a Frame Manifest is available at `/.well-known/farcaster.json`. This file provides metadata for the frame application and is accessible at:

```
https://web4-quiz-template.vercel.app/.well-known/farcaster.json
```

The manifest includes information about the application, account association, and trigger points. See [FRAME_MANIFEST.md](FRAME_MANIFEST.md) for more details on configuring this file.

## Farcaster SDK Integration

The application uses the Farcaster Frame SDK to interact with the Farcaster client application. This integration is handled by the `FarcasterProvider` component in `src/app/components/FarcasterProvider.tsx`.

The provider:
1. Initializes the SDK
2. Provides user and client context to components
3. Handles events like adding/removing the frame
4. Manages notifications

## Testing Your Frame

To test your frame:
1. Deploy your application to a public URL
2. Validate the frame using the [Farcaster Frame validator](https://warpcast.com/~/developers/frames)
3. Cast a message that includes your frame URL

## Environment Variables

Make sure to set your base URL in the environment variables:

```
NEXT_PUBLIC_BASE_URL=https://web4-quiz-template.vercel.app
```

This ensures all generated URLs point to your actual deployment. 