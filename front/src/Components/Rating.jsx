
import { useEffect, useState } from "react";
import { getRatingDescription } from "../helpers/getRatingDescription";
import Comments from "./Comments";
import { useUser } from "../hooks/useUser";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";

const Rating = ({  score, totalRatings, cabinId, getCabin}) => {

  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [hasBeenHere, setHasBeenHere] = useState(false);
  const { isLoggedIn } = useUser();
  const closeModal = async (value) => {
    await getCabin();
    setShowReviewsModal(value);
  };

  useEffect(() => {
    const getBokingsData = async () => {
      try {
        const { data } = await rustikApi.get(rustikEndpoints.myBookings);
        if(data.some(booking => booking.cabin.id === cabinId && booking.state === "COMPLETA")) setHasBeenHere(true);
      } catch (error) {
        console.error("Error al obtener mis reservas", error);
      }
    };
    
    if (isLoggedIn) getBokingsData();
    
  }, [isLoggedIn])
  
  
  return (
    <div className="flex flex-col space-y-4 border-b border-secondary-color pb-5 pt-5">
      <div className="flex justify-between w-full items-center ">
        <h3 className="text-xl md:text-2xl font-bold text-primary-color font-moserrat">Reseñas</h3>
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="text-4xl md:text-5xl font-bold text-light-text font-roboto ">
          {score && score.toFixed(1)}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-semibold text-secondary-color font-moserrat">{getRatingDescription(score)}</span>
            <span className="text-sm text-light-text font-moserrat">
              {totalRatings} reseñas verificadas
            </span>
          </div>
          <div className="ml-4 ">
            <button 
              className="bg-primary-color text-light-text min-h-10 px-4 rounded font-semibold font-moserrat disabled:bg-dark-text"
              onClick={() => setShowReviewsModal(true)}
              disabled={!hasBeenHere}
            >
              Dar tu reseña
            </button>
          </div>
        </div>
      </div>
      <Comments isModalOpen={showReviewsModal} setIsModalOpen={closeModal} />
    </div>
  );
};

export default Rating;
