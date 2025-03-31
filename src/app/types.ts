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

/**
 * Farcaster user context
 */
export interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

/**
 * Farcaster client context
 */
export interface FarcasterClient {
  clientFid: number;
  added: boolean;
  safeAreaInsets?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  notificationDetails?: {
    url: string;
    token: string;
  };
}

/**
 * Farcaster location context for cast embeds
 */
export interface CastEmbedLocationContext {
  type: 'cast_embed';
  cast: {
    fid: number;
    hash: string;
  };
}

/**
 * Farcaster location context for notifications
 */
export interface NotificationLocationContext {
  type: 'notification';
  notification: {
    notificationId: string;
    title: string;
    body: string;
  };
}

/**
 * Farcaster location context for launcher
 */
export interface LauncherLocationContext {
  type: 'launcher';
}

/**
 * Farcaster SDK Context
 */
export interface FarcasterContext {
  user: FarcasterUser;
  client: FarcasterClient;
  location?: CastEmbedLocationContext | NotificationLocationContext | LauncherLocationContext;
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