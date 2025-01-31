import { useState, useEffect } from "react";
import { fetchQuizData } from "../utils/api";
import QuizCard from "../components/QuizCard";
import QuizSummary from "../components/QuizSummary";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();

        // Validate the structure of the questions data
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(
            data.questions.map((question) => ({
              question: question.description || "No description provided",
              options: question.options.map((option) => option.description), // Ensure options are strings
              correctAnswer: question.options.find((option) => option.is_correct)?.description || "",
            }))
          );
        } else {
          console.error("Invalid or empty quiz questions received:", data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    loadQuizData();
  }, []);

  const handleAnswer = (isCorrect) => {
    // Increment score if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextIndex = currentIndex + 1;

  // Check if there are more questions
  if (nextIndex < questions.length) {
    setCurrentIndex(nextIndex);
  } else {
    setQuizCompleted(true);
  }
};

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-800">
      {quizCompleted ? (
        <QuizSummary score={score} total={questions.length} onRestart={restartQuiz} />
      ) : questions.length > 0 ? (
        <QuizCard
          question={questions[currentIndex].question}
          options={questions[currentIndex].options} // options are now an array of strings
          correctAnswer={questions[currentIndex].correctAnswer}
          onAnswer={handleAnswer}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Quiz;
