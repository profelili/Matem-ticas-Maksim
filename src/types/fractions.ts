export type Operation = '+' | '-' | '*' | '/';

export type DifficultyLevel = 'basico' | 'intermedio' | 'avanzado' | 'experto';

export interface Fraction {
  num: number;
  den: number;
}

export interface Problem {
  id: string;
  f1: Fraction;
  f2: Fraction;
  operation: Operation;
  difficulty: DifficultyLevel;
  correctAnswer: Fraction; // Simplified
  options: Fraction[]; // Multiple choices for fast interaction
  stepByStep: string[];
  visualType?: 'circle' | 'bar';
  conceptExplanation: string;
}

export interface MistakeRecord {
  id: string;
  timestamp: number;
  userId: string;
  problem: Problem;
  userAnswer: Fraction;
  solvedAgain: boolean;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'accuracy' | 'streak' | 'levels' | 'speed' | 'review';
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  totalSolved: number;
  totalCorrect: number;
  byOperation: {
    '+': { attempted: number; correct: number };
    '-': { attempted: number; correct: number };
    '*': { attempted: number; correct: number };
    '/': { attempted: number; correct: number };
  };
  streak: number;
  bestStreak: number;
  highScoreTimeAttack: number;
  dailyStreakDays: number;
  lastPlayedDate: string;
  historyScores: Array<{ date: string; score: number; accuracy: number }>;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  stars: number;
  unlockedLevel: number;
  stats: UserStats;
  achievements: string[]; // unlocked achievement IDs
  createdAt: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
  streak: number;
  accuracy: number;
  badge: string;
  isCurrentUser?: boolean;
}
