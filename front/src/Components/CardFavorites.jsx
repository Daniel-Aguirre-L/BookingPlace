import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";

const CardFavorites = ({favorite, eliminarFavorito}) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const randomIndex = Math.floor(Math.random() * favorite?.images?.length);
  const image = favorite?.images?.[randomIndex];

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-md shadow-md overflow-hidden">
      <img
        src={image?.url}
        alt="Imagen del producto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
      <button
        type="button"
        onClick={() => eliminarFavorito(favorite.id)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#C70303"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#C70303"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
        <div className="mt-2 flex justify-between items-center">
          <div className="max-w-28">
            <h3 className="text-sm font-semibold truncate">{favorite?.name}</h3>
            <p className="text-[10px] mt-1 truncate">{favorite?.location}</p>
          </div>
          <span className="text-sm font-bold">${favorite?.price}</span>
        </div>
        <div className="my-3">
          <button 
            className="bg-[#EEEEEE] text-[#0C1123]  px-2 py-1.5 w-full text-xs rounded-md"
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