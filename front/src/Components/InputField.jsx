import React from 'react';

const InputField = ({ type = 'text', placeholder = 'Ingresa un valor', ...props }) => {
  return (
    <input
      className="border border-[#A9AEB9] rounded p-2.5 font-normal text-black"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default InputField;