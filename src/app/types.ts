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

export interface ThemeConfig {
  theme: {
    backgroundGradient: {
      from: string;
      to: string;
    };
    title: {
      gradient: {
        from: string;
        to: string;
      };
    };
    button: {
      gradient: {
        from: string;
        to: string;
      };
      hover: {
        from: string;
        to: string;
      };
    };
    card: {
      background: string;
      darkBackground: string;
    };
    text: {
      primary: string;
      secondary: string;
      darkPrimary: string;
      darkSecondary: string;
    };
  };
} 