import React, { useEffect, useState } from "react"
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApiForm } from "../services/rustikApi";
import CardFavorites from "../Components/CardFavorites";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavoritesData = async () => {
      try {
        const { data } = await rustikApiForm.get(rustikEndpoints.favorites);
        setFavorites(data.cabinDTOS ?? []);
        console.log(data.cabinDTOS)
      } catch (error) {
        console.error("Error al obtener favoritos", error);
      }
    };

    getFavoritesData();
  }, []);

  const eliminarFavorito = async (id) =>{
    try {
      const response = await rustikApiForm.delete(`${rustikEndpoints.favorites}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        const newFavorites = favorites.filter((favorite) => favorite.id !== id);
        setFavorites(newFavorites);
      } else {
        console.error("Error al eliminar el favorito:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-8 mb-8">
      {favorites?.map((favorite) => (
        <div
          key={favorite?.id}
          className="w-full sm:w-[182px] h-[260px] flex justify-center items-center"
        >
          <CardFavorites favorite={favorite} eliminarFavorito={eliminarFavorito} />
        </div>
      ))}
    </div>
  )
}


export default MyFavorites