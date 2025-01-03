
import useNotificationStore from "../store/useNotificationStore";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

const LikeButton = ({ id, isFavorite, onLike = () => { }, onUnlike = () => { } }) => {

  const { setNotification } = useNotificationStore();
  const { isLoggedIn } =useUser();
  const [isDisable, setIsDisable] = useState(false);



  const removeFavorite = async () => {
    if (isLoggedIn) try {
      const response = await rustikApi.delete(`${rustikEndpoints.favorites}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        onUnlike();
        // setLiked(!liked);
      } else {
        console.error("Error al eliminar el favorito:", response.status);
        setNotification({
          visibility: true,
          type: "error",
          text: "No se pudo eliminar el favorito, intenta más tarde.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setNotification({
        visibility: true,
        type: "error",
        text: "No se pudo remover el favorito, intenta más tarde.",
      });
    }else{
      setNotification({
        visibility: true,
        type: "warning",
        text: "Debe iniciar sesión para habilitar favoritos.",
      });
    }
  }

  const addFavorite = async () => {
    if (isLoggedIn) try {
      const response = await rustikApi.post(`${rustikEndpoints.favorites}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        onLike();
        // setLiked(!liked);
      } else {
        console.error("Error al agregar el favorito:", response.status);
        setNotification({
          visibility: true,
          type: "error",
          text: "No se pudo agregar el favorito, intenta más tarde.",
        });
      }
    } catch (error) {
      setNotification({
        visibility: true,
        type: "error",
        text: "No se pudo agregar el favorito, intenta más tarde.",
      });
      console.error("Error en la solicitud:", error);
    }else{
      setNotification({
        visibility: true,
        type: "warning",
        text: "Debe iniciar sesión para habilitar favoritos.",
      });
    }
  }

  const toggleLike = () => {
    if (isDisable) return;
    setIsDisable(true);
    if (!isFavorite && onLike) {
      addFavorite();
    } else if (isFavorite && onUnlike) {
      removeFavorite();
    }
    setTimeout(() => {
      setIsDisable(false);
    }, 800);
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className="relative cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite ? "#FBFFBD" : "rgba(0,0,0,0.4)"}
        viewBox="0 0 24 24"
        strokeWidth={2.2}
        stroke={isFavorite ? "#FBFFBD" : "#FBFFBD"}
        className={`inline-block w-[1em] h-[1em] cursor-pointer transition-transform ${isFavorite ? "" : "hover:scale-105"
          }`}
        style={{
          filter: isFavorite
            ? "none"
            : "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;