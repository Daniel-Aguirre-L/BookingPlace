import React, { useState } from 'react';

const Dropdown = ({ options, label, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left w-full">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}

      <button
        onClick={toggleDropdown}
        className="w-full p-2.5 border border-[#A9AEB9] rounded font-roboto text-[#9CA3AF] text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        type='button'
      >

        {selectedOption || placeholder}
        <span className="float-right">&#9660;</span>
      </button>
      
      {/*dmenu*/}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-[#A9AEB9] rounded shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

