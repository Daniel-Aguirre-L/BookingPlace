import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageTitleAndBack = ({ title = "Regresar" }) => {
  const navigate = useNavigate();
  const [shareOptionsOpen, setShareOptionsOpen] = useState(false);

  const toggleShareOptions = () => {
    setShareOptionsOpen((prev) => !prev);
  };

  const closeShareOptions = () => {
    setShareOptionsOpen(false);
  };

  const MenuOption = ({ imgUrl, children, onClick }) => (
    <div
      className="relative flex items-center gap-3 cursor-pointer hover:backdrop-brightness-75 p-2 rounded"
      onClick={onClick}
    >
      <img src={imgUrl} alt="Icon" className="w-6 h-6" />
      <span className="text-lg">{children}</span>
      <img
        src="/Icons/arrowright.svg"
        alt="Icon"
        className="w-3 h-3 absolute right-0"
      />
    </div>
  );

  return (
    <div className="flex items-center mb-6 justify-between h-8">
      <span className="flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-secondary"
        >
          <img
            src="/Icons/arrowleft.svg"
            alt="Back arrow button"
            className="mr-10"
          />
        </button>
        <h1 className="text-light-text montserrat font-medium">{title}</h1>
      </span>

      <span className="relative flex gap-8">
        <img
          src="/Icons/share.svg"
          alt="share"
          className="hover:brightness-[75%] cursor-pointer"
          onClick={toggleShareOptions}
        />

        <img
          src="/Icons/heart-borders.svg"
          alt="favorite"
          className="hover:brightness-[75%] cursor-pointer"
        />

        <section
          className={`absolute flex flex-col rounded-[0.75rem] bg-primary-color p-8 w-[23rem] top-[4.5rem] right-0 md:top-[2.5rem] md:right-14 transition-all duration-300 ease-in-out z-10 ${
            shareOptionsOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 invisible"
          }`}
          onMouseLeave={closeShareOptions}
        >
          <MenuOption
            imgUrl="/Icons/facebook.svg"
            onClick={() => window.open("https://facebook.com", "_blank")}
          >
            Facebook
          </MenuOption>
          <MenuOption
            imgUrl="/Icons/instagram.svg"
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            Instagram
          </MenuOption>
          <MenuOption
            imgUrl="/Icons/x.svg"
            onClick={() => window.open("https://twitter.com", "_blank")}
          >
            Twitter
          </MenuOption>
          <MenuOption imgUrl="/Icons/embed.svg" onClick={""}>
            Copiar Enlace
          </MenuOption>
        </section>
      </span>
    </div>
  );
};

export default PageTitleAndBack;
