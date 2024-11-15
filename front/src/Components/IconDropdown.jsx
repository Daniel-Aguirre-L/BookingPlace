import React, { useState } from 'react';
import FeatureIcon from './icons/FeatureIcon';

const IconDropdown = ({  onSelect, defaultValue = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  


  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleDropdown}
        className={`${selectedOption ? "text-inherit text-[36px]" : "text-[#9CA3AF]"} flex items-center justify-between p-2  w-full  border border-[#A9AEB9] rounded font-roboto text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400`}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        type='button'
      >

        {
          selectedOption ? (
          
          <FeatureIcon id={selectedOption} />

          ) : ("Selecciona un icono")
        }
        <span className="float-right text-[16px] ">&#9660;</span>
      </button>
      
      {/*dmenu*/}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-[#A9AEB9] rounded shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            { Array.from({ length: 20 }, (_, index) => index +1)
            .map((id) => (
              <button
                key={`icon-${id}`}
                type='button'
                href=""
                className="w-full block px-4 py-2 text-left text-[36px] text-gray-700 hover:bg-gray-200 transition-all"
                onClick={() => handleOptionClick(`I${id}`)}
              >
                <FeatureIcon id={`I${id}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconDropdown;

