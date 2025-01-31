const QuizSummary = ({ score, total, onRestart }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p className="mt-4 text-lg">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>
        <button
          onClick={onRestart}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Restart Quiz
        </button>
      </div>
    );
  };
  
  export default QuizSummary;
  