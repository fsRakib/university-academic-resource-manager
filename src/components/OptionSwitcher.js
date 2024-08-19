import React from "react";

const OptionSwitcher = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="flex space-x-2 relative bg-slate-400 rounded-lg p-1">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className={`flex-1 px-6 py-1 font-semibold transition-all duration-300 rounded-full ${
            selectedOption === option ? "bg-black text-white" : "bg-white text-black"
          } focus:outline-none`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionSwitcher;
