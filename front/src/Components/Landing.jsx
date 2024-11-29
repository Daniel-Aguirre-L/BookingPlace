import { useState } from "react";
import BookingCalendar from "./BookingCalendar";

const styles = {
  background:
    'linear-gradient(0deg, rgba(12, 17, 35, 1) 0%, rgba(0, 0, 0, 0) 30%), url("./img/landing.png")',
  backgroundSize: "cover",
};

function Landing({ filter, setFilter, getNameCabins, cabinHelper }) {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [serchingText, setSerchingText] = useState(false);
  const [bookingDates, setBookingDates] = useState(["", ""]);
  const [calendarKey, setCalendarKey] = useState(0); // Unique key to force re-mount

  const calendarStyles = `rounded-xl absolute left-1/2 transform -translate-x-1/2 top-[-8rem] max-sm:scale-90 md:right-auto transition-all duration-300 ease-in-out ${calendarVisible
      ? "opacity-100 scale-100 translate-y-0 visible"
      : "opacity-0 scale-90 -translate-y-4 invisible"
    }`;

  const setDate = () => {
    setCalendarVisible(true);
  };

  const handleCloseForm = () => {
    setBookingDates(["", ""]);
    setCalendarKey((prevKey) => prevKey + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getNameCabins(filter, bookingDates[0], bookingDates[1]);
    window.location.hash = "cabañas";
  };

  const getSearchOptions = (text = "lago") => {
    if (!text) return [];
    return cabinHelper.filter((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <section
      className="bg-background-dark max-w-[1600px] w-full max-md:mt-[-7rem] mt-[-6rem] mb-[7rem] h-[100vh] max-h-[60rem] flex flex-col justify-center montserrat"
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
        className="pageMargin relative rounded-lg bg-white text-[1.4rem] items-center mt-[3rem]  h-fit  max-w-[700px] font-montserrat"
        onSubmit={handleSearch}
      >
        <fieldset className="flex flex-col  relative w-full">
          <div className="flex items-center h-fit">
          <input
            className="w-full px-5 text-sm sm:text-base md:text-xl bg-transparent text-dark-text h-[4rem] outline-none overflow-hidden "
            type="text"
            placeholder="Nombre de la cabaña"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onFocus={() => {
              window.location.hash = "";
              setSerchingText(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setSerchingText(false);
              }, 100);
            }}
          />

          {serchingText && getSearchOptions(filter).length > 0 && (
            <div className="absolute max-h-52 w-full top-10 bg-white z-20 overflow-y-scroll text-background-dark rounded-b-lg">
              {getSearchOptions(filter).map((option, index) => (
                <p
                  key={`option-${index}`}
                  className="p-2 hover:bg-gray-300 cursor-pointer pl-5 text-sm md:text-base"
                  onClick={() => {
                    setFilter(option);
                    setSerchingText(false);
                  }}
                >
                  {option.toLowerCase()}
                </p>
              ))}
            </div>
          )}
          </div>
          <div className="flex items-center h-fit" >
          <input
            className={`w-full px-5 text-sm sm:text-base md:text-xl bg-transparent text-dark-text h-[4rem] outline-none overflow-hidden ${!bookingDates[0] ? "cursor-pointer" : null
              }`}
            type="text"
            placeholder="Seleccione fechas"
            value={bookingDates[0]}
            onClick={() => setDate()}
            readOnly
          />
          {bookingDates[0] && (
            <>
              <input
                className="w-full px-5 text-sm sm:text-base md:text-xl bg-transparent  text-dark-text  h-[4rem] outline-none overflow-hidden "
                type="text"
                placeholder="Fecha de Salida"
                value={bookingDates[1]}
                onClick={() => setDate()}
                readOnly
              />
              <button
                className="absolute right-2 top-[83px]  h-fit  "
                type="button"
                onClick={handleCloseForm}
              >
                <img src="/Icons/cancel-gray.svg" alt="" />
              </button>
            </>
          )}
          </div>
        </fieldset>


        <button
          className="p-5 bg-primary-color flex justify-center items-center w-full rounded-b-lg"
          type="submit"
        >
          <span className="font-montserrat mr-4 ">Buscar</span>
          <img src="./Icons/search.svg" alt="buscar" width={22} />
        </button>

        <BookingCalendar
          key={calendarKey}
          setBookingDates={setBookingDates}
          visible={calendarVisible}
          setVisible={setCalendarVisible}
          calendarStyles={calendarStyles}
          hasReserves={false}
        />
      </form>
    </section>
  );
}

export default Landing;
