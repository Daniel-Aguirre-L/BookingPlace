import { useNavigate } from "react-router-dom";

const PageTitleAndBack = ({ title = "Regresar", searchTerm, setSearchTerm, buttonText, buttonOnClick }) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full grid ${(setSearchTerm || buttonText) ? "grid-cols-3" : "grid-cols-1"}  items-center gap-5`}>
      <section className="flex items-center gap-5">
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
      </section>
      <section className="relative">
        {setSearchTerm && (
          <>
            <input
              type="text"
              placeholder="Buscar"
              className="bg-light-text rounded-lg py-2 pl-3 pr-[80px] w-full text-background-dark outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className=" absolute top-0 right-0 h-full bg-primary-color flex justify-center items-center w-[76px] rounded-r-lg md:rounded-s-none" type="submit"
            >
              <img src="/Icons/search.svg" alt="buscar" width={18} />
            </button>
          </>
        )}
      </section>
      <section className="flex justify-end">
        {
          buttonText && (
            <button
              className="bg-[#088395] rounded-xl py-2 px-9 max-sm:px-4 text-[#EEEEEEEE]"
              type="button"
              onClick={buttonOnClick}
            >
              {buttonText}
            </button>)
        }
      </section>
    </div>
  );
};

export default PageTitleAndBack;
