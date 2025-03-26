import { QuizData, ThemeConfig } from "../types";

interface WelcomeScreenProps {
  quizData: QuizData;
  onStart: () => void;
  themeConfig: ThemeConfig | null;
}

/**
 * Game-like welcome screen shown before starting the quiz
 */
export default function WelcomeScreen({ quizData, onStart, themeConfig }: WelcomeScreenProps) {
  // Generate classes based on theme config
  const bgGradientClass = themeConfig 
    ? `from-${themeConfig.theme.backgroundGradient.from} to-${themeConfig.theme.backgroundGradient.to}`
    : "from-indigo-500 to-purple-600";
  
  const titleGradientClass = themeConfig 
    ? `from-${themeConfig.theme.title.gradient.from} to-${themeConfig.theme.title.gradient.to}`
    : "from-purple-600 to-indigo-500";
  
  const buttonGradientClass = themeConfig 
    ? `from-${themeConfig.theme.button.gradient.from} to-${themeConfig.theme.button.gradient.to} hover:from-${themeConfig.theme.button.hover.from} hover:to-${themeConfig.theme.button.hover.to}`
    : "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700";

  const cardBgClass = themeConfig 
    ? `bg-${themeConfig.theme.card.background} dark:bg-${themeConfig.theme.card.darkBackground}`
    : "bg-white dark:bg-gray-800";

  const textPrimaryClass = themeConfig 
    ? `text-${themeConfig.theme.text.primary} dark:text-${themeConfig.theme.text.darkPrimary}`
    : "text-gray-700 dark:text-gray-300";

  const textSecondaryClass = themeConfig 
    ? `text-${themeConfig.theme.text.secondary} dark:text-${themeConfig.theme.text.darkSecondary}`
    : "text-gray-600 dark:text-gray-400";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br ${bgGradientClass} animate-gradient`}>
      <div className={`w-full max-w-md p-8 mx-auto ${cardBgClass} rounded-xl shadow-2xl transform transition-all hover:scale-105`}>
        <h1 className={`mb-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${titleGradientClass}`}>
          {quizData.name}
        </h1>
        
        <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className={`text-lg ${textPrimaryClass}`}>
            {quizData.description}
          </p>
          <p className={`mt-2 text-sm ${textSecondaryClass}`}>
            {quizData.questions.length} questions to test your knowledge!
          </p>
        </div>

        <button
          onClick={onStart}
          className={`w-full py-3 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r ${buttonGradientClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          Start Quiz!
        </button>
      </div>
    </div>
  );
} 