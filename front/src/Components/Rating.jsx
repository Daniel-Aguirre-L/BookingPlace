import React from "react";

const Rating = ({  score, totalRatings}) => {
 
  return (
    <div className="flex flex-col space-y-4 border-b border-secondary-color pb-5">
      <div className="flex justify-between w-full items-center ">
        <h3 className="text-xl md:text-2xl font-bold text-primary-color font-moserrat">Reseñas</h3>
      </div>

      <div className="flex items-center space-x-4 ">
        <div className="text-1xl md:text-5xl font-bold text-light-text font-roboto ">
          {score.toFixed(1)}
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-secondary-color font-moserrat">Very Good</span>
            <span className="text-sm text-light-text font-moserrat">
              {totalRatings} verified reviews
            </span>
          </div>

          <div className="ml-4 ">
            <button className="bg-primary-color text-light-text h-10 px-4 rounded font-semibold font-moserrat">
              Dar tu reseña
            </button>


          </div>
          
        </div>
      </div>

    
    </div>
  );
};

export default Rating;
