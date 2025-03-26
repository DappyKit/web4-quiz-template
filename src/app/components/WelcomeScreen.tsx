import { QuizData } from "../types";

interface WelcomeScreenProps {
  quizData: QuizData;
  onStart: () => void;
}

/**
 * Game-like welcome screen shown before starting the quiz
 */
export default function WelcomeScreen({ quizData, onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-indigo-500 to-purple-600 animate-gradient">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-xl shadow-2xl dark:bg-gray-800 transform transition-all hover:scale-105">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
          {quizData.name}
        </h1>
        
        <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {quizData.description}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {quizData.questions.length} questions to test your knowledge!
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Start Quiz!
        </button>
      </div>
    </div>
  );
} 