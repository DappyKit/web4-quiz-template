import { useState, useEffect } from "react";
import { Question, ThemeConfig } from "../types";
import { shuffleOptions } from "../utils";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, correctIndex: number, selectedIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  themeConfig: ThemeConfig | null;
}

/**
 * Component for displaying a quiz question with multiple choice options
 */
export default function QuizQuestion({ 
  question, 
  onAnswer, 
  questionNumber,
  totalQuestions,
  themeConfig
}: QuizQuestionProps) {
  // State for shuffled options and tracking the correct answer
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  
  // Shuffle options when question changes
  useEffect(() => {
    const [options, correctIdx] = shuffleOptions(question.options);
    setShuffledOptions(options);
    setCorrectIndex(correctIdx);
    setSelectedOption(null);
    setAnswered(false);
  }, [question]);
  
  const handleOptionSelect = (index: number) => {
    if (answered) return;
    
    setSelectedOption(index);
    setAnswered(true);
    
    // Check if the selected option is correct
    const isCorrect = index === correctIndex;
    
    // After a short delay, reveal the answer and notify parent
    setTimeout(() => {
      onAnswer(isCorrect, correctIndex, index);
    }, 400);
  };
  
  // Get style based on selection state
  const getOptionClass = (index: number) => {
    if (!answered || selectedOption !== index) {
      return "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
    }
    
    if (index === correctIndex) {
      return "bg-green-100 dark:bg-green-900 border-green-500";
    }
    
    if (selectedOption === index) {
      return "bg-red-100 dark:bg-red-900 border-red-500";
    }
    
    return "bg-white dark:bg-gray-800";
  };

  const cardBgClass = themeConfig 
    ? `bg-${themeConfig.theme.card.background} dark:bg-${themeConfig.theme.card.darkBackground}`
    : "bg-white dark:bg-gray-800";
  
  return (
    <div className="animated-border">
      <div className={`w-full max-w-2xl p-6 mx-auto ${cardBgClass} rounded-xl shadow-lg relative z-10`}>
        {/* Progress bar */}
        <div className="mb-6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
        
        <div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <div className="flex items-center">
            <span className="pulse inline-block h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
            <span>Quiz in progress</span>
          </div>
        </div>
        
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          {question.text}
        </h2>
        
        <div className="space-y-3">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={answered}
              className={`w-full p-4 text-left transition-all border rounded-lg ${getOptionClass(
                index
              )} ${answered ? "" : "hover:shadow-md hover:scale-[1.01] transform transition-all"} ${answered ? "" : "cursor-pointer"}`}
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 