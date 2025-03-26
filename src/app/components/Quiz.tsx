import { useState } from "react";
import { QuizData, QuizState, ThemeConfig } from "../types";
import WelcomeScreen from "./WelcomeScreen";
import QuizQuestion from "./QuizQuestion";
import ResultsScreen from "./ResultsScreen";

interface QuizProps {
  quizData: QuizData;
  themeConfig: ThemeConfig | null;
}

/**
 * Main Quiz component that manages quiz state and flow
 */
export default function Quiz({ quizData, themeConfig }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isCompleted: false,
  });
  
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Reset quiz state
  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isCompleted: false,
    });
    setShowWelcome(true);
  };
  
  // Start the quiz
  const handleStart = () => {
    setShowWelcome(false);
  };
  
  // Process answer and move to next question or finish quiz
  const handleAnswer = (isCorrect: boolean, correctIndex: number, selectedIndex: number) => {
    // Add a small delay before proceeding
    setTimeout(() => {
      const newAnswers = [...quizState.answers];
      newAnswers[quizState.currentQuestionIndex] = selectedIndex === correctIndex ? 0 : 1;
      
      const newState = {
        ...quizState,
        score: isCorrect ? quizState.score + 1 : quizState.score,
        answers: newAnswers,
      };
      
      // Check if this was the last question
      if (quizState.currentQuestionIndex === quizData.questions.length - 1) {
        setQuizState({
          ...newState,
          isCompleted: true,
        });
      } else {
        // Move to next question
        setQuizState({
          ...newState,
          currentQuestionIndex: quizState.currentQuestionIndex + 1,
        });
      }
    }, 320);
  };

  // Generate gradient class based on theme config
  const bgGradientClass = themeConfig 
    ? `from-${themeConfig.theme.backgroundGradient.from} to-${themeConfig.theme.backgroundGradient.to}`
    : "from-indigo-500 to-purple-600";
  
  if (showWelcome) {
    return <WelcomeScreen quizData={quizData} onStart={handleStart} themeConfig={themeConfig} />;
  }
  
  if (quizState.isCompleted) {
    return (
      <ResultsScreen 
        quizData={quizData} 
        quizState={quizState} 
        onRestart={handleRestart}
        themeConfig={themeConfig}
      />
    );
  }
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ${bgGradientClass}`}>
      <QuizQuestion 
        question={quizData.questions[quizState.currentQuestionIndex]} 
        onAnswer={handleAnswer}
        questionNumber={quizState.currentQuestionIndex + 1}
        totalQuestions={quizData.questions.length}
        themeConfig={themeConfig}
      />
    </div>
  );
} 