/**
 * Utility functions for Farcaster integration
 */

/**
 * Generate a Farcaster intent URL to compose a cast with quiz results
 * @param text - Text to include in the cast
 * @param appUrl - URL to embed in the cast (the quiz app)
 * @returns URL string for the intent
 */
export function generateShareIntent(text: string, appUrl: string): string {
  // Encode the text and URL parameters properly
  const encodedText = encodeURIComponent(text);
  const encodedEmbed = encodeURIComponent(appUrl);
  
  // Use a simpler URL format that avoids array parameter issues
  return `https://warpcast.com/~/compose?text=${encodedText}&embed=${encodedEmbed}`;
}

/**
 * Create a shareable text for quiz results
 * @param quizName - Name of the quiz
 * @param score - User's score
 * @param totalQuestions - Total number of questions
 * @returns Formatted share text
 */
export function createShareText(quizName: string, score: number, totalQuestions: number): string {
  const percentage = Math.round((score / totalQuestions) * 100);
  let emoji = "";
  
  // Select emoji based on score percentage
  if (percentage >= 90) emoji = "🏆";
  else if (percentage >= 70) emoji = "🎉";
  else if (percentage >= 50) emoji = "👍";
  else emoji = "🔄";
  
  // Format the share text
  return `${emoji} I scored ${percentage}% (${score}/${totalQuestions}) on the "${quizName}" quiz! Try it yourself:`;
}

/**
 * Get the current app URL
 * @returns The app's full URL
 */
export function getAppUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://web4-quiz-template.vercel.app";
  
  // Return the base URL - in a more complex app you might want to include
  // specific parameters to track shares or target specific quiz IDs
  return baseUrl;
} 