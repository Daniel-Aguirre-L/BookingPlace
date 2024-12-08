import { useEffect, useState } from "react";
import Card from "./Card";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import { useUser } from "../hooks/useUser";

const CatalogList = ({ myCabins, page, handleShowMore, continuar, filter, handleOnClick }) => {

  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useUser();

  const getFavoritesData = async () => {
    try {
      const { data } = await rustikApi.get(rustikEndpoints.favorites);
      setFavorites(data.cabinDTOS ?? []);
    } catch (error) {
      console.error("Error al obtener favoritos", error);
    } 
  };
    
  useEffect(() => {
    if (isLoggedIn)  getFavoritesData();
  }, [isLoggedIn]);

  return (
    <>
      <section className="pageMargin gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center" id="cabañas">
        {
          myCabins && myCabins.map(({ id, name, description, price, images }) => (
            <Card key={id} title={name} price={price} images={images} id={id} favorites={favorites} refreshFavoritos={getFavoritesData} >
              {`${description.slice(0, 100)}`.slice(0, 37)}{description.length > 35 && '...'}
            </Card>
          ))
        }
        {
          !myCabins && filter && (
            <div className="flex w-full items-center justify-center col-span-full h-full"  >
              <p className="text-4xl">No hay cabañas que coincidan con la búsqueda</p>
            </div>
          )
        }
        <div className="flex w-full justify-center col-span-full"  >
          {
            page >= 1 && !continuar && !filter && (
              <button
                className="px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
                onClick={handleShowMore}
              >
                Mostrar más
              </button>

            )
          }
          {
            filter && (
              <button
                className="px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem] mb-10"
                onClick={handleOnClick}
              >
                Quitar Filtro
              </button>
            )
          }
          {
            continuar && !filter && (<p className="text-xl">¡Estas son todas nuestras cabañas!</p>)
          }
        </div>
      </section>
    </>
  );
};

export default CatalogList;
