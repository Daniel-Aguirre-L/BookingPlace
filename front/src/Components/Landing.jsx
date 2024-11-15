

const styles = {
  background: 'linear-gradient(0deg, rgba(12, 17, 35, 1) 0%, rgba(0, 0, 0, 0) 30%), url("./img/landing.png")',
  backgroundSize: 'cover'
};

function Landing({ filter, setFilter, getNameCabins }) {

  const handleSearch = (e) => {
    e.preventDefault();
    getNameCabins(filter);
    window.location.hash = 'cabañas';
  };

  return (
    <section className="bg-background-dark max-w-[1600px] w-full max-md:mt-[-7rem] mt-[-6rem] mb-[7rem] h-[100vh] max-h-[60rem] flex flex-col justify-center montserrat overflow-hidden" style={styles} >
      <h1 className="pageMargin text-primary-color font-bold text-[3.3rem] w-fit leading-[4rem] max-sm:text-[2.5rem]">
        Escapa a la Naturaleza y <br />
        Reserva tu Cabaña ideal
      </h1>
      <p className="pageMargin mt-4 text-light-text text-[1.5rem] w-fit">
        Tu refugio natural, a un clic de distancia.
      </p>
      <form 
        className="pageMargin relative rounded-md bg-white flex text-[1.4rem] items-center mt-[2rem] h-[3rem] max-w-[25rem] overflow-hidden"
        onSubmit={handleSearch}
      >
        <input
          className="w-full bg-transparent ml-6 text-dark-text h-[50%] outline-none overflow-hidden"
          type="text"
          placeholder="Buscar cabaña"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={()=>window.location.hash = ''}
        />
          <button
            className="bg-primary-color flex justify-center items-center h-full w-[7rem]"
            type="submit"
          >
            <img src="./Icons/search.svg" alt="buscar" />
          </button>
      </form>
    </section>
  );
}

export default Landing;
