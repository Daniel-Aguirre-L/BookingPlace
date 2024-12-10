import { useEffect, useState } from "react";
import InputField from "./InputField";
import BookingCalendar from "./BookingCalendar";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";

const SelectDate = ({cabin, bookingDates, setBookingDates, handleStartBooking}) => {
  
  
  const [reserved, setReserved] = useState([]);
  
  
  const calendarStyles = [
    `scale-[0.85] relative rounded-xl max-[500px]:scale-[0.90] md:right-auto transition-all duration-300 ease-in-out`,
    `scale-[0.85] relative rounded-xl max-[500px]:scale-[0.90] md:right-auto transition-all duration-300 ease-in-out hidden md:block`
  ];
  
  const [feature, setFeature] = useState({
    id: null,
    name: "",
    icon: null,
    hasQuantity: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    icon: null,
    hasQuantity: false,
  });

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    const getDates = async () => {
      try {
        const { data } = await rustikApi.get(`${rustikEndpoints.bookings}/${cabin.id}/dates`);
        setReserved(data.map(bdate => ({
          startDate: bdate.startDate + " 12:00:00",
          endDate: bdate.endDate + " 12:00:00",
        })));
      } catch (error) {
        console.error("Error al llamar a la api", error);
      }
    };
    getDates();
  }, [])
  
  
  return (
    <div className="animate-fadeIn  w-full h-full  bg-opacity-50 md:py-8 flex justify-center md:justify-end">
      <div className="sm:max-w-lg sm:w-full m-3  w-full ">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full  max-w-lg bg-white py-6 rounded-lg shadow-md relative ">
            <div className="absolute top-0 left-0 right-0  p-4 rounded-t-lg text-black ">
              <div className="flex justify-center pt-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#088395] flex items-end">
                  <span className="text-xl md:text-3xl">${cabin.price}</span>
                  <span className="text-sm md:text-base font-normal ml-2 text-dark-text"> / noche</span>
                </h3>
                {/* <button
                  onClick={handleCloseForm}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-primary font-semibold"
                >
                  <img
                    src="/Icons/cerrar.svg"
                    alt="Cerrar"
                    className="w-6 h-6"
                  />
                </button> */}
              </div>
              
              <hr className="w-auto border-t-2 border-gray-300 mb-6 " />
            </div>
            

            <div className="pt-14 md:pt-16 w-full">
              {/* <form onSubmit={handleSubmit} className="relative space-y-6 w-full"> */}
                <div className=" flex flex-col gap-6 justify-center items-center w-full">
                  <BookingCalendar
                    setBookingDates={setBookingDates}
                    visible={true}
                    setVisible={() => {}}
                    calendarStyles={calendarStyles}
                    hasReserves={true}
                    reserved={reserved}
                    
                  />
                  
                  <div className="relative flex flex-col gap-y-2">
                    <span
                      className={`absolute transform flex justify-between items-center text-primary-color w-full text-xs md:text-sm transition-all duration-300 ease-in-out ${
                        bookingDates[0]
                          ? "opacity-100 translate-y-[-25px] visible"
                          : "opacity-0 -translate-y-4 invisible"
                      }`}
                    >
                      <label htmlFor="bookingDates">Fecha de ingreso</label>
                      <label htmlFor="bookingDates">Fecha de salida</label>
                    </span>
                  <span className="flex gap-3 md:gap-10 text-sm md:text-base">
                    <InputField
                      id="bookingDates"
                      name="bookingDates"
                      placeholder="Seleccione fechas"
                      value={bookingDates[0]}
                      onChange={handleFeatureChange}
                      className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black font-montserrat"
                      readOnly
                    />
                    <InputField
                      id="bookingDates"
                      name="bookingDates"
                      placeholder="Seleccione fechas"
                      value={bookingDates[1]}
                      onChange={handleFeatureChange}
                      className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black font-montserrat"
                      readOnly
                    />
                  </span>
                  </div>

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="flex justify-center pb-5 px-5 mt-5 md:mt-10">
                  <button type="button" 
                    className=" bg-[#FBFFBD] text-[#0C1123]  h-10 px-12 w-full rounded font-semibold shadow-md disabled:cursor-not-allowed disabled:active:scale-100 active:scale-95" 
                    onClick={handleStartBooking}
                    disabled={bookingDates[0] === "" || bookingDates[1] === ""}
                  >
                    Reservar
                  </button>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
