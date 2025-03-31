import { QuizData, ThemeConfig } from "../types";
import { useFarcaster } from "./FarcasterProvider";
import ConnectWallet from "./ConnectWallet";

interface WelcomeScreenProps {
  quizData: QuizData;
  onStart: () => void;
  themeConfig: ThemeConfig | null;
}

/**
 * Game-like welcome screen shown before starting the quiz
 */
export default function WelcomeScreen({ quizData, onStart, themeConfig }: WelcomeScreenProps) {
  const { context, loading } = useFarcaster();
  
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
      {/* Decorative floating elements */}
      <div className="absolute top-12 left-1/4 w-8 h-8 rounded-full bg-white/20 floating"></div>
      <div className="absolute bottom-24 right-1/4 w-6 h-6 rounded-full bg-white/20 floating-delay"></div>
      <div className="absolute top-1/3 right-12 w-10 h-10 rounded-full bg-white/20 floating-slow"></div>
      
      <div className="animated-border">
        <div className={`w-full max-w-md p-8 mx-auto ${cardBgClass} rounded-xl shadow-2xl transform transition-all hover:scale-105 relative z-10`}>
          {/* User info section if available */}
          {context?.user && (
            <div className="flex items-center mb-6 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              {context.user.pfpUrl && (
                <img 
                  src={context.user.pfpUrl} 
                  alt={context.user.displayName || `User ${context.user.fid}`}
                  className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-200 dark:border-indigo-700"
                />
              )}
              <div className="text-left">
                <p className="font-medium">
                  Welcome, {context.user.displayName || context.user.username || `User ${context.user.fid}`}!
                </p>
                <p className={`text-xs ${textSecondaryClass}`}>Ready to test your knowledge?</p>
              </div>
            </div>
          )}
          
          {/* Icon above title */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h1 className={`mb-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${titleGradientClass}`}>
            {quizData.name}
          </h1>
          
          <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700 glass">
            <p className={`text-lg ${textPrimaryClass}`}>
              {quizData.description}
            </p>
            <p className={`mt-2 text-sm ${textSecondaryClass}`}>
              {quizData.questions.length} questions to test your knowledge!
            </p>
          </div>

          {/* ETH address display with ConnectWallet */}
          <div className="mb-6">
            <ConnectWallet />
          </div>

          <button
            onClick={onStart}
            className={`w-full py-3 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r ${buttonGradientClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shine`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Quiz!"}
          </button>
          
          {/* Frame info if launched from a frame */}
          {context?.location?.type === "cast_embed" && (
            <div className="mt-4 px-3 py-2 text-xs bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <p>Launched via Frame from cast by FID: {context.location.cast.fid}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 