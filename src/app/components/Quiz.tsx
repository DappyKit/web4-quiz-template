import { useState } from "react";
import { QuizData, QuizState } from "../types";
import WelcomeScreen from "./WelcomeScreen";
import QuizQuestion from "./QuizQuestion";
import ResultsScreen from "./ResultsScreen";

interface QuizProps {
  quizData: QuizData;
}

/**
 * Main Quiz component that manages quiz state and flow
 */
export default function Quiz({ quizData }: QuizProps) {
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
  
  if (showWelcome) {
    return <WelcomeScreen quizData={quizData} onStart={handleStart} />;
  }
  
  if (quizState.isCompleted) {
    return (
      <ResultsScreen 
        quizData={quizData} 
        quizState={quizState} 
        onRestart={handleRestart} 
      />
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
      <QuizQuestion 
        question={quizData.questions[quizState.currentQuestionIndex]} 
        onAnswer={handleAnswer}
        questionNumber={quizState.currentQuestionIndex + 1}
        totalQuestions={quizData.questions.length}
      />
    </div>
  );
} 