import { useState } from "react";
import { RiRobot3Line } from "react-icons/ri"; // Import the bot icon from react-icons library

/**
 * Chatbot Component
 * A responsive chat interface with department selection and message handling
 */
const Chatbot = () => {
  // State Management
  const [department, setDepartment] = useState("Marketing"); // Track selected department
  const [message, setMessage] = useState(""); // Current message input
  const [messages, setMessages] = useState([]); // Array of all messages in the chat

  /**
   * Handle department selection change
   * @param {Event} e - The change event from the select element
   */
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value); // Update department state when dropdown selection changes
  };

  /**
   * Handle sending a new message
   * Adds user message to chat and triggers bot response
   */
  const handleSendMessage = () => {
    if (message.trim()) { // Only send if message isn't empty or just whitespace
      // Add user message to chat
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage(""); // Clear input field after sending

      // Simulate bot response after 1 second delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a response from the bot.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  // Dynamic placeholder text based on selected department
  const placeholderText = `Enter your ${department} query here...`;

  return (
    // Main container with dark theme
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-semibold">AI Chatbot</h1>
        {/* Department Selector Dropdown */}
        <select
          value={department}
          onChange={handleDepartmentChange}
          className="bg-gray-700 text-white p-2 rounded-md border border-gray-600"
        >
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          // Message Container
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Individual Message Bubble */}
            <div
              className={`max-w-[75%] p-3 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"    // User message styling
                  : "bg-gray-700 text-gray-200" // Bot message styling
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 flex items-center relative">
        {/* Bot Icon */}
        <RiRobot3Line className="absolute left-4 text-2xl sm:text-3xl text-gray-400" />

        {/* Message Input Field */}
        <input
          type="text"
          placeholder={placeholderText}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-700 text-white p-3 pl-12 rounded-lg border border-gray-600 focus:outline-none"
        />

        {/* Send Message Button */}
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;