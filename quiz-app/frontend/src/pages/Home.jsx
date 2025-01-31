import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Welcome to the Quiz App</h1>
      <button
        className="mt-6 px-6 py-3 bg-white text-blue-500 font-bold rounded-lg shadow-md cursor-pointer"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
