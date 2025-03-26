import { QuizData, QuizState } from "../types";

interface ResultsScreenProps {
  quizData: QuizData;
  quizState: QuizState;
  onRestart: () => void;
}

/**
 * Results screen showing quiz performance and options to restart
 */
export default function ResultsScreen({ quizData, quizState, onRestart }: ResultsScreenProps) {
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
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold text-center">Quiz Results</h2>
        
        <div className="p-4 mb-6 text-center">
          <p className="mb-2 text-5xl font-bold">
            <span className={getResultClass()}>{percentage}%</span>
          </p>
          <p className="text-xl font-medium">{getResultMessage()}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You got {quizState.score} out of {quizData.questions.length} questions correct
          </p>
        </div>
        
        <div className="space-y-4">
          {quizData.questions.map((question, index) => {
            const isCorrect = quizState.answers[index] === 0;
            return (
              <div 
                key={index}
                className={`p-4 border rounded-lg ${
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
          className="w-full py-3 mt-6 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Play Again
        </button>
      </div>
    </div>
  );
} 