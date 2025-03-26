"use client";

import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import { QuizData, ThemeConfig } from "./types";
import { loadConfig } from "./utils";

/**
 * Main page component that loads quiz data and renders the Quiz component
 */
export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Load both quiz data and theme config in parallel
        const [quizResponse, config] = await Promise.all([
          fetch("/data.json"),
          loadConfig()
        ]);
        
        if (!quizResponse.ok) {
          throw new Error(`Failed to fetch data: ${quizResponse.statusText}`);
        }
        
        const data = await quizResponse.json();
        setQuizData(data);
        setThemeConfig(config);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Generate gradient class based on theme config
  const bgGradientClass = themeConfig 
    ? `from-${themeConfig.theme.backgroundGradient.from} to-${themeConfig.theme.backgroundGradient.to}`
    : "from-indigo-500 to-purple-600";

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ${bgGradientClass} animate-gradient`}>
        <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4 text-xl font-medium text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ${bgGradientClass} animate-gradient`}>
        <div className={`p-8 bg-${themeConfig?.theme.card.background || 'white'} rounded-xl shadow-lg dark:bg-${themeConfig?.theme.card.darkBackground || 'gray-800'}`}>
          <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
          <p className={`text-${themeConfig?.theme.text.primary || 'gray-700'} dark:text-${themeConfig?.theme.text.darkPrimary || 'gray-300'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-4 py-2 mt-4 text-white bg-gradient-to-r from-${themeConfig?.theme.button.gradient.from || 'indigo-500'} to-${themeConfig?.theme.button.gradient.to || 'purple-600'} rounded hover:from-${themeConfig?.theme.button.hover.from || 'indigo-600'} hover:to-${themeConfig?.theme.button.hover.to || 'purple-700'}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return null;
  }

  return <Quiz quizData={quizData} themeConfig={themeConfig} />;
}
