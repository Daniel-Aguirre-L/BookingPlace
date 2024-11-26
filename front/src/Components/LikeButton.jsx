import React, { useState } from "react";

const LikeButton = ({ id, isFavorite = false, onLike, onUnlike }) => {
  const [liked, setLiked] = useState(isFavorite);

  const toggleLike = () => {
    setLiked(!liked);

    if (!liked && onLike) {
      onLike(id)
    } else if (liked && onUnlike) {
      onUnlike(id);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className="absolute top-2 right-2 cursor-pointer"
    >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={liked ? "#C70303" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={liked ? "#C70303" : "#CE1C1C"}
        className={`w-6 h-6 cursor-pointer transition-transform ${
          liked ? "" : "hover:scale-105"
        }`}
        style={{
          filter: liked
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