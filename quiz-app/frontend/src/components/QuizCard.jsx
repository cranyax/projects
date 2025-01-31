import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animation

const QuizCard = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [streak, setStreak] = useState(0); // Streak state to track consecutive correct answers

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleNextClick(); // Auto move to next question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Handle option selection and update streak
  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setShowCorrect(true);
    setTimerActive(true);
    if (option === correctAnswer) {
      // Increment streak if the answer is correct
      setStreak((prev) => prev + 1);
    } else {
      // Reset streak if the answer is wrong
      setStreak(0);
    }
  };

  // Handle moving to next question
  const handleNextClick = () => {
    setShowCorrect(false);
    setSelectedAnswer(null);
    setTimerActive(false);
    setTimeLeft(5);
    onAnswer(selectedAnswer === correctAnswer);
  };

  return (
    <div className="w-full max-w-lg bg-blue-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      {/* Display the current streak */}
      <div className="mb-4 text-lg font-bold">
        Streak: {streak}
      </div>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-2 px-4 rounded-lg border-2 transition duration-300 ${
              selectedAnswer === option
                ? option === correctAnswer
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-red-500 text-white border-red-500"
                : ""
            } ${
              showCorrect && option === correctAnswer
                ? "bg-green-500 text-white border-green-500"
                : "bg-gray-100 border-gray-300"
            } ${
              !selectedAnswer && "hover:bg-blue-500 hover:text-white"
            }`} // Hover effect only when no answer is selected
            onClick={() => handleOptionClick(option)}
            disabled={selectedAnswer} // Disable all options after selection
          >
            {option}
          </button>
        ))}
      </div>

      {/* Animated Next Button with Smooth Timer */}
      <button
        className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold relative overflow-hidden ${
          timerActive
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleNextClick}
        disabled={!timerActive}
      >
        <span className="relative z-10">
          {timerActive ? `Next (${timeLeft}s)` : "Next"}
        </span>
        {timerActive && (
          <motion.span
            className="absolute left-0 top-0 h-full bg-blue-700"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          ></motion.span>
        )}
      </button>

      {/* Show Streak Milestone Celebration */}
      {streak >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-xl text-green-500 font-bold"
        >
          🎉 Streak: {streak} - You're on fire! 🎉
        </motion.div>
      )}
    </div>
  );
};

export default QuizCard;
