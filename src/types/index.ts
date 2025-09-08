// src/types/index.ts
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  points: number;
}