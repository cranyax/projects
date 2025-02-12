// src/components/TimeFilterButtons.jsx
import React from 'react';

const TimeFilterButtons = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="inline-flex">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-2 py-1 text-xs font-medium rounded-none border border-gray-300 transition-colors duration-200 cursor-pointer ${
            selectedOption === option
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          } first:rounded-l last:rounded-r`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimeFilterButtons;
