import React from "react";
import { useNavigate } from 'react-router-dom';

function Headline({ title, handleOnClick, children }) {
  return (
    <div className="relative pageMargin flex flex-col my-[7rem]">
      <h2 className="text-[2.65rem] text-primary-color font-semibold">
        {title}
      </h2>
      <p className="text-xl mr-[20rem] max-xl:mr-[13rem] max-md:mr-[8.5rem]">
        {children}
      </p>
      <button 
        className="alignAbsolute right-0 absolute px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
        onClick={handleOnClick}
      >
        Mostrar más
      </button>
    </div>
  );
}

export default Headline;