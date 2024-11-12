import React from "react";

function Avatar({ name, size }) {
  const sizeClasses = {
    small: "w-[3rem] h-[3rem]",
    medium: "w-[4.5rem] h-[4.5rem]",
    large: "w-[6rem] h-[6rem]",
  };

  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-background-dark flex items-center justify-center text-light-text select-none`}
      alt="initials"
    >
      {initial}
    </div>
  );
}

export default Avatar;
