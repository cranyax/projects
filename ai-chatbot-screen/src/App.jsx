import { Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
};

export default App;