/**
 * Quiz data structure
 */
export interface QuizData {
  name: string;
  description: string;
  questions: Question[];
}

/**
 * Question structure
 */
export interface Question {
  text: string;
  options: string[];
}

/**
 * Quiz state for tracking progress
 */
export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  isCompleted: boolean;
} 