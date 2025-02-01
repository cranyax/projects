import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { ImSpinner8 } from "react-icons/im"; // Loading spinner icon

const Login = () => {
  // State variables to manage user input, password visibility, and loading state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  // Handle manual login with username and password
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    setTimeout(() => {
      if (username === "user123" && password === "pass123") {
        navigate("/chatbot"); // Navigate to chatbot on success
      } else {
        alert("Invalid credentials"); // Show error message
      }
      setIsLoading(false); // Stop loading
    }, 1000);
  };

  // Simulate login with Google
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/chatbot");
      setIsLoading(false);
    }, 1000);
  };

  // Simulate login with GitHub
  const handleGitHubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/chatbot");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
            <p className="mt-2 text-white">Logging in...</p>
          </div>
        </div>
      )}

      {/* Login Container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md p-6 sm:p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">Sign in</h1>

        {/* Social Login Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-2xl sm:text-3xl mr-2" />
            Continue with Google
          </button>

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGithub className="text-2xl sm:text-3xl mr-2" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Username & Password Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-400 hover:text-gray-200 transition"
                disabled={isLoading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Reset Password */}
        <div className="text-center mt-3">
          <span className="text-sm text-gray-400">Trouble logging in? </span>
          <Link to="/reset-password" className="text-sm text-blue-400 hover:underline">
            Reset password
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-gray-600"></div>

        {/* Sign-up Section */}
        <div className="text-center text-gray-400 mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
