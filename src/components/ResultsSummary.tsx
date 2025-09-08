// src/components/ResultsSummary.tsx
import { motion } from "framer-motion";
import type { Answer, Question } from "../types/index";

interface ResultsSummaryProps {
  answers: Answer[];
  questions: Question[];
  onRestart: () => void;
}

const ResultsSummary = ({ answers, questions, onRestart }: ResultsSummaryProps) => {
  const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);
  const maxPoints = questions.reduce((sum, question) => sum + question.points, 0);
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;

  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  let performanceMessage = "";
  
  if (scorePercentage >= 80) {
    performanceMessage = "Excellent job!";
  } else if (scorePercentage >= 60) {
    performanceMessage = "Good effort!";
  } else {
    performanceMessage = "Keep practicing!";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Quiz Results</h2>
      
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-blue-600 mb-2">
          {correctAnswers}/{totalQuestions}
        </div>
        <div className="text-lg text-gray-600 mb-1">{performanceMessage}</div>
        <div className="text-sm text-gray-500">Total Points: {totalPoints}/{maxPoints}</div>
      </div>

      <div className="space-y-4 mb-8">
        {questions.map((question, index) => {
          const answer = answers.find(a => a.questionId === question.id);
          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{question.question}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  answer?.isCorrect 
                    ? "bg-green-100 text-green-800" 
                    : "bg-orange-100 text-orange-800"
                }`}>
                  {answer?.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{question.explanation}</p>
              <p className="text-xs text-gray-500">
                Points: {answer?.points || 0}/{question.points}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        onClick={onRestart}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

export default ResultsSummary;