"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import sdk from "@farcaster/frame-sdk";
import { FarcasterContext } from "../types";

// Define the SDK interface with the methods we need
interface SDK {
  context: FarcasterContext;
  on(event: string, listener: () => void): void;
  removeListener(event: string, listener: () => void): void;
  removeAllListeners(): void;
  showToast(params: { text: string; type: 'success' | 'error' | 'info' }): Promise<void>;
}

// Create context with default values
const FarcasterSDKContext = createContext<{
  sdk: SDK | null;
  context: FarcasterContext | null;
  loading: boolean;
  error: string | null;
}>({
  sdk: null,
  context: null,
  loading: true,
  error: null,
});

/**
 * Custom hook to use the Farcaster SDK
 * @returns Farcaster SDK context
 */
export function useFarcaster() {
  return useContext(FarcasterSDKContext);
}

interface FarcasterProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the application and initializes the Farcaster SDK
 * @param children - Child components
 */
export function FarcasterProvider({ children }: FarcasterProviderProps) {
  const [sdkInstance, setSdkInstance] = useState<SDK | null>(null);
  const [context, setContext] = useState<FarcasterContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run initialization once
    if (sdkInstance) return;

    const initializeSdk = async () => {
      try {
        // Initialize the SDK
        // Use unknown as an intermediary cast to avoid TypeScript errors
        const frameSDK = sdk as unknown as SDK;
        setSdkInstance(frameSDK);

        // Get context information about the user and client
        const contextData = frameSDK.context;
        setContext(contextData);

        // Set up event listeners
        frameSDK.on("frameAdded", () => {
          console.log("Frame added by user");
          // Update the context to reflect the change
          setContext((prev) => 
            prev ? { ...prev, client: { ...prev.client, added: true }} : null
          );
        });

        frameSDK.on("frameRemoved", () => {
          console.log("Frame removed by user");
          // Update the context to reflect the change
          setContext((prev) => 
            prev ? { ...prev, client: { ...prev.client, added: false }} : null
          );
        });

        frameSDK.on("notificationsEnabled", () => {
          console.log("Notifications enabled");
          // You would typically refresh the context here
        });

        frameSDK.on("notificationsDisabled", () => {
          console.log("Notifications disabled");
          // You would typically refresh the context here
        });

        setLoading(false);
      } catch (error) {
        console.error("Error initializing Farcaster SDK:", error);
        setError("Failed to initialize Farcaster SDK");
        setLoading(false);
      }
    };

    initializeSdk();
  }, [sdkInstance]);

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      if (sdkInstance) {
        sdkInstance.removeAllListeners();
      }
    };
  }, [sdkInstance]);

  // Apply safe area insets to body if available
  useEffect(() => {
    if (context?.client?.safeAreaInsets) {
      const { top, bottom, left, right } = context.client.safeAreaInsets;
      document.body.style.paddingTop = `${top}px`;
      document.body.style.paddingBottom = `${bottom}px`;
      document.body.style.paddingLeft = `${left}px`;
      document.body.style.paddingRight = `${right}px`;
    }

    return () => {
      // Reset styles on unmount
      document.body.style.paddingTop = "";
      document.body.style.paddingBottom = "";
      document.body.style.paddingLeft = "";
      document.body.style.paddingRight = "";
    };
  }, [context?.client?.safeAreaInsets]);

  return (
    <FarcasterSDKContext.Provider value={{ sdk: sdkInstance, context, loading, error }}>
      {children}
    </FarcasterSDKContext.Provider>
  );
} 