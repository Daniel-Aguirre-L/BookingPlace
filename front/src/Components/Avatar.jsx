
function Avatar({ name, size }) {
  const sizeClasses = {
    small: "w-[3rem] h-[3rem] bg-primary-color",
    medium: "w-[4.5rem] h-[4.5rem] bg-background-dark",
    large: "w-[6rem] h-[6rem] bg-background-dark",
  };

  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-light-text select-none`}
      alt="initials"
    >
      {initial}
    </div>
  );
}

export default Avatar;
