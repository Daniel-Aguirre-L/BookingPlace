


function Headline({ title, handleOnClick, filter, children }) {
  return (
    <div className="relative pageMargin flex flex-col my-[7rem]">
      <h2 className="text-[2.65rem] max-w-[85%] text-primary-color font-semibold capitalize montserrat">
        {title}
      </h2>
      <p className="text-xl mr-[20rem] max-xl:mr-[13rem] max-md:mr-[8.5rem]">
        {children}
      </p>
      
        <button
          className="alignAbsolute right-0 absolute px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
          type="button"
          onClick={handleOnClick}
        >
          {filter ? "Quitar Filtro" : "Mostrar más"}
        </button>
      
    </div>
  );
}

export default Headline;