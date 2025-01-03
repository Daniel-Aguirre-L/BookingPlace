import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import LikeButton from "./LikeButton";

function Card({ title, children, price, images, id, favorites, refreshFavoritos }) {

  const navigate = useNavigate();

  const styles = useMemo(() => {
    return images ? {
      backgroundImage: `url(${images[1].url})`,
    } : {}
  }, [images]);


  return (
    <div
      className="animate-fadeIn group relative card h-[32rem] rounded-[0.7rem] w-[98%] flex justify-end flex-col bg-cover bg-center bg-no-repeat transition-all hover:scale-105 "
      style={images && styles}
    >
      <img src={images && images[0].url} alt="cabaña" className="w-full brightness-[85%] h-full absolute top-0 left-0 object-cover group-hover:opacity-0 group-hover:scale-0 transition-all duration-300 z-0 rounded-[0.7rem]" />
      <section className="relative bg-[linear-gradient(0deg,rgba(12,17,35,0.95)_5%,rgba(0,0,0,0)_90%)] pb-5 pt-8 px-5">
        <div className="grid grid-cols-4 items-end gap-1" >
          <div className="col-span-3 flex flex-col justify-between">
            <h3 className="text-[1.8rem] font-semibold montserrat">{title}</h3>
            <p className="text-[1.2rem] pr-1">{children}</p>
          </div>
          <h2 className="text-[1.8rem] font-semibold montserrat text-right text-nowrap pb-3">
            $ {price}
          </h2>
        </div>
        <button
          className="text-[1.2rem] bg-secondary-color text-background-dark h-12 w-full rounded-[0.6rem] font-medium z-10 mt-3"
          onClick={() => navigate(`${routeList.CATALOG_DETAIL}/${id}`)}
        >
          Reserva
        </button>
      </section>
      {
        favorites &&
        <div className="absolute top-5 right-5 hover:scale-125 cursor-pointer w-8 text-4xl transition-all duration-100">
          <LikeButton id={id} isFavorite={favorites.some(favorite => favorite.id === id)} onUnlike={refreshFavoritos} onLike={refreshFavoritos} />
        </div>
      }
    </div>
  );
}

export default Card;
