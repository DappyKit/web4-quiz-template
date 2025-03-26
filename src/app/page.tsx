"use client";

import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import { QuizData } from "./types";

/**
 * Main page component that loads quiz data and renders the Quiz component
 */
export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    }

    fetchQuizData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600 animate-gradient">
        <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4 text-xl font-medium text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600 animate-gradient">
        <div className="p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700"
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

  return <Quiz quizData={quizData} />;
}
