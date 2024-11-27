import { useState } from "react";
import BookingCalendar from "./BookingCalendar";

const styles = {
  background:
    'linear-gradient(0deg, rgba(12, 17, 35, 1) 0%, rgba(0, 0, 0, 0) 30%), url("./img/landing.png")',
  backgroundSize: "cover",
};

function Landing({ filter, setFilter, getNameCabins }) {
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [bookingDates, setBookingDates] = useState(["", ""]);

  const setDate = () => {
    setCalendarVisible(true);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getNameCabins(filter);
    window.location.hash = "cabañas";
  };

  return (
    <section
      className="bg-background-dark max-w-[1600px] w-full max-md:mt-[-7rem] mt-[-6rem] mb-[7rem] h-[100vh] max-h-[60rem] flex flex-col justify-center montserrat overflow-hidden"
      style={styles}
    >
      <h1 className="pageMargin mt-[6rem] text-primary-color font-bold text-[3.3rem] w-fit leading-[4rem] max-sm:text-[2.5rem] montserrat ">
        Escapa a la Naturaleza y <br />
        Reserva tu Cabaña ideal
      </h1>
      <p className="pageMargin mt-4 text-light-text text-[1.5rem] w-fit montserrat">
        Tu refugio natural, a un clic de distancia.
      </p>
      <form
        className="pageMargin relative rounded-md bg-white flex text-[1.4rem] items-center mt-[3rem] h-[3.35rem] max-w-[50rem] font-montserrat"
        onSubmit={handleSearch}
      >
        <input
          className="w-full bg-transparent ml-6 text-dark-text h-[50%] outline-none overflow-hidden text-[1.2rem] "
          type="text"
          placeholder="Nombre de la cabaña"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => (window.location.hash = "")}
        />
        <input
          className="w-full bg-transparent ml-6 text-dark-text h-[50%] outline-none overflow-hidden text-[1.2rem] "
          type="text"
          placeholder="Fecha de Entrada"
          value={bookingDates[0]}
          onChange={(e) => setFilter(e.target.value)}
          onClick={() => (setDate())}
          readOnly
        />
        <input
          className="w-full bg-transparent ml-5 text-dark-text h-[50%] outline-none overflow-hidden text-[1.2rem]"
          type="text"
          placeholder="Fecha de Salida"
          value={bookingDates[1]}
          onChange={(e) => setFilter(e.target.value)}
          onClick={() => (setDate())}
          readOnly
        />

        <button
          className="bg-primary-color flex justify-center items-center h-full w-[14rem] rounded-e-md"
          type="submit"
        >
          <img src="./Icons/search.svg" alt="buscar" width={22} />
        </button>
        <BookingCalendar setBookingDates={setBookingDates} visible={calendarVisible} setVisible={setCalendarVisible} />
      </form>
    </section>
  );
}

export default Landing;
