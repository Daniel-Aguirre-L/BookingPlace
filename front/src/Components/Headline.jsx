import React from "react";
import { useNavigate } from 'react-router-dom';

function Headline({ title, children, id}) {
  const navigate = useNavigate();

  return (
    <div className="relative pageMargin flex flex-col my-[7rem]">
      <h2 className="text-[2.65rem] text-primary-color font-semibold">
        {title}
      </h2>
      <p className="text-[1.5rem] mr-[30rem]">{children}</p>
      <button
        onClick={() => navigate(`/catalogo/${id}`)} 
        className="alignAbsolute right-0 absolute px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
      >
        See All
      </button>
    </div>
  );
}

export default Headline;