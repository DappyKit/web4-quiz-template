import { QuizData, QuizState, ThemeConfig } from "../types";

interface ResultsScreenProps {
  quizData: QuizData;
  quizState: QuizState;
  onRestart: () => void;
  themeConfig: ThemeConfig | null;
}

/**
 * Results screen showing quiz performance and options to restart
 */
export default function ResultsScreen({ quizData, quizState, onRestart, themeConfig }: ResultsScreenProps) {
  const percentage = Math.round((quizState.score / quizData.questions.length) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  const getResultClass = () => {
    if (percentage >= 90) return "text-green-500 dark:text-green-400";
    if (percentage >= 70) return "text-blue-500 dark:text-blue-400";
    if (percentage >= 50) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  // Generate classes based on theme config
  const bgGradientClass = themeConfig 
    ? `from-${themeConfig.theme.backgroundGradient.from} to-${themeConfig.theme.backgroundGradient.to}`
    : "from-indigo-500 to-purple-600";
  
  const cardBgClass = themeConfig 
    ? `bg-${themeConfig.theme.card.background} dark:bg-${themeConfig.theme.card.darkBackground}`
    : "bg-white dark:bg-gray-800";

  const buttonGradientClass = themeConfig 
    ? `from-${themeConfig.theme.button.gradient.from} to-${themeConfig.theme.button.gradient.to} hover:from-${themeConfig.theme.button.hover.from} hover:to-${themeConfig.theme.button.hover.to}`
    : "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700";
  
  const textSecondaryClass = themeConfig 
    ? `text-${themeConfig.theme.text.secondary} dark:text-${themeConfig.theme.text.darkSecondary}`
    : "text-gray-600 dark:text-gray-400";
  
  // Determine the emoji based on score
  const getEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🎉";
    if (percentage >= 50) return "👏";
    return "🔄";
  };
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ${bgGradientClass}`}>
      {/* Confetti effect for high scores */}
      {percentage >= 70 && (
        <>
          <div className="absolute top-10 left-1/4 w-3 h-8 bg-yellow-400 rounded floating" style={{ transform: 'rotate(20deg)' }}></div>
          <div className="absolute top-20 right-1/4 w-4 h-4 bg-pink-400 rounded-full floating-delay"></div>
          <div className="absolute bottom-20 left-1/3 w-6 h-2 bg-green-400 rounded floating-slow" style={{ transform: 'rotate(-15deg)' }}></div>
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-indigo-400 rounded-full floating"></div>
          <div className="absolute bottom-32 right-1/4 w-4 h-4 bg-blue-400 rounded floating-delay" style={{ transform: 'rotate(45deg)' }}></div>
        </>
      )}
      
      <div className="animated-border">
        <div className={`w-full max-w-md p-8 ${cardBgClass} rounded-xl shadow-2xl relative z-10`}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl shadow-lg">
              {getEmoji()}
            </div>
          </div>
          
          <h2 className="mb-6 text-3xl font-bold text-center">Quiz Results</h2>
          
          <div className="p-4 mb-6 text-center glass rounded-lg">
            <p className="mb-2 text-5xl font-bold">
              <span className={getResultClass()}>{percentage}%</span>
            </p>
            <p className="text-xl font-medium">{getResultMessage()}</p>
            <p className={`mt-2 ${textSecondaryClass}`}>
              You got {quizState.score} out of {quizData.questions.length} questions correct
            </p>
          </div>
          
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
            {quizData.questions.map((question, index) => {
              const isCorrect = quizState.answers[index] === 0;
              return (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg transform transition-all hover:scale-[1.02] ${
                    isCorrect 
                      ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800" 
                      : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                  }`}
                >
                  <p className="font-medium">{question.text}</p>
                  <p className={`text-sm mt-1 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {isCorrect ? "Correct" : `Incorrect (Answer: ${question.options[0]})`}
                  </p>
                </div>
              );
            })}
          </div>
          
          <button
            onClick={onRestart}
            className={`w-full py-3 mt-6 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r ${buttonGradientClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shine`}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
} 