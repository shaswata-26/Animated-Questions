// src/components/QuestionCard.tsx
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types/index";

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  showResults: boolean;
}

const QuestionCard = ({
  question,
  selectedOption,
  onSelectOption,
  showResults,
}: QuestionCardProps) => {
  const getOptionColor = (optionIndex: number) => {
    if (!showResults) {
      return selectedOption === optionIndex
        ? "bg-blue-600 text-white"
        : "bg-gray-100 hover:bg-gray-200 text-gray-800";
    }

    if (optionIndex === question.correctAnswer) {
      return "bg-green-600 text-white";
    }

    if (selectedOption === optionIndex && selectedOption !== question.correctAnswer) {
      return "bg-orange-500 text-white";
    }

    return "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg md:text-xl font-medium text-gray-800">
          {question.question}
        </h2>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {question.difficulty}
        </span>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${getOptionColor(
              index
            )} ${selectedOption === null ? "cursor-pointer" : "cursor-default"}`}
            onClick={() => selectedOption === null && onSelectOption(index)}
            disabled={selectedOption !== null}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-sm text-gray-700">{question.explanation}</p>
            <p className="text-xs mt-2 text-gray-500">
              Points: {selectedOption === question.correctAnswer ? question.points : 0}/{question.points}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;