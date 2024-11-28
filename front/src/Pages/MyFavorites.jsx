import { useEffect, useState } from "react"
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";
import CardFavorites from "../Components/CardFavorites";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavoritesData = async () => {
    try {
      const { data } = await rustikApi.get(rustikEndpoints.favorites);
      setFavorites(data.cabinDTOS ?? []);
    } catch (error) {
      console.error("Error al obtener favoritos", error);
    } 
  };
    
  useEffect(() => {
    getFavoritesData();
  }, []);

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-8 mb-8">
      {favorites?.map((favorite) => (
        <div
          key={favorite?.id}
          className="w-full sm:w-[182px] h-[260px] flex justify-center items-center"
        >
          <CardFavorites favorite={favorite} refreshFavoritos={getFavoritesData} />
        </div>
      ))}
    </div>
  )
}


export default MyFavorites