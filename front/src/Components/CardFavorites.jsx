import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import LikeButton from "./LikeButton";

const CardFavorites = ({favorite, refreshFavoritos}) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const image = favorite?.images?.[0];

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-[0.7rem] shadow-md overflow-hidden animate-fadeIn bg-cover bg-center bg-no-repeat transition-all hover:scale-105">
      <img
        src={image?.url}
        alt="Imagen del producto"
        className={`absolute inset-0 w-full h-full object-cover brightness-[85%] group-hover:opacity-0 group-hover:scale-0 transition-all duration-300 z-0 rounded-[0.7rem] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
      <div className="flex w-full justify-end p-1 text-2xl" >
        <LikeButton id={favorite?.id} isFavorite onUnlike={refreshFavoritos}/>
      </div>

      <div className="absolute bottom-0 left-0 w-full  bg-[linear-gradient(0deg,rgba(12,17,35,0.95)_5%,rgba(0,0,0,0)_90%)] px-4 py-2 text-white">
        <div className="mt-2 flex justify-between items-center">
          <div className="max-w-28">
            <h3 className="text-sm font-semibold truncate  montserrat">{favorite?.name}</h3>
            <p className="text-[10px] mt-1 truncate">{favorite?.location}</p>
          </div>
          <span className="text-sm font-semibold montserrat">${favorite?.price}</span>
        </div>
        <div className="my-3">
          <button 
            className="bg-[#FBFFBD] text-background-dark  font-medium   px-2 py-1.5 w-full px-2 text-[1.2rem] rounded-[0.6rem]"
            onClick={() => navigate(`${routeList.CATALOG_DETAIL}/${favorite?.id}`)}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFavorites;