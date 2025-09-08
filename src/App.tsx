// src/App.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questionsData from "./data/questions.json";
import type { Question, Answer } from "./types/index";
import QuestionCard from "./components/QuestionCard";
import ProgressIndicator from "./components/ProgressIndicator";
import ResultsSummary from "./components/ResultsSummary";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = questionsData.map((q) => ({
    ...q,
    difficulty: q.difficulty as "Easy" | "Medium" | "Hard",
  }));
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? currentQuestion.points : 0;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect,
      points,
    };

    setAnswers([...answers, newAnswer]);

    // Move to next question or show results after a delay
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const allQuestionsAnswered = answers.length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Knowledge Quiz
          </h1>
          <p className="text-gray-600">
            Test your knowledge with these questions
          </p>
        </motion.header>

        <main>
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <ProgressIndicator
                  current={currentQuestionIndex + 1}
                  total={questions.length}
                />

                <QuestionCard
                  question={currentQuestion}
                  selectedOption={
                    answers.find(
                      (a) => a.questionId === currentQuestion.id
                    )?.selectedOption ?? null
                  }
                  onSelectOption={handleSelectOption}
                  showResults={false}
                />
              </motion.div>
            ) : (
              <ResultsSummary
                answers={answers}
                questions={questions}
                onRestart={handleRestart}
              />
            )}
          </AnimatePresence>
        </main>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>© 2023 Knowledge Quiz. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;