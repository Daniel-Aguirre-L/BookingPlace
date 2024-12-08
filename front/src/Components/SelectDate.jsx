import { useState } from "react";
import InputField from "./InputField";
import useNotificationStore from "../store/useNotificationStore";
import BookingCalendar from "./BookingCalendar";

const SelectDate = ({cabin}) => {
  const { setNotification } = useNotificationStore();
  const [bookingDates, setBookingDates] = useState(["", ""]);
  
  const calendarStyles = [
    `scale-[0.85] relative rounded-xl max-[500px]:scale-[0.90] md:right-auto transition-all duration-300 ease-in-out`,
    `scale-[0.85] relative rounded-xl max-[500px]:scale-[0.90] md:right-auto transition-all duration-300 ease-in-out`
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

  const handleSubmit = async (e) => {
    setBookingDates(["", ""]);
    onClose();
    bookingDates[0] &&
      setNotification({
        visibility: true,
        type: "success",
        text: `¡Gracias por reservar! Su estadía comienza el ${bookingDates[0]} y termina el ${bookingDates[1]}.`,
      });
  };

  const handleCloseForm = () => {
    setFeature({ name: "", icon: null, hasQuantity: false });
    setBookingDates(["", ""]);
    onClose();
  };

  
  // if (!isOpen) return null;

  return (
    <div className="animate-fadeIn hs-overlay  top-0 left-0 w-full h-full  bg-opacity-50 py-8  ">
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full sm:w-full max-w-lg bg-white py-6 rounded-lg shadow-md relative z-10">
            <div className="absolute top-0 left-0 right-0  p-4 rounded-t-lg text-black z-20">
              <div className="flex justify-center pt-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#088395] flex items-center">
                  <span className="text-xl md:text-2xl">${cabin.price}</span>
                  <span className="text-sm md:text-lg font-light ml-2 text-dark-text"> p/noche</span>
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
              <div><hr className="w-auto border-t-2 border-gray-300 mb-6 " /></div>
              
            </div>
            

            <div className="pt-14 md:pt-16 w-full">
              <form onSubmit={handleSubmit} className="relative space-y-6 w-full">
                <div className=" flex flex-col gap-6 justify-center items-center">
                  <BookingCalendar
                    setBookingDates={setBookingDates}
                    visible={true}
                    setVisible={() => {}}
                    calendarStyles={calendarStyles}
                    hasReserves={true}
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
                      placeholder="Fecha de llegada"
                      value={bookingDates[0]}
                      onChange={handleFeatureChange}
                      className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black font-montserrat"
                      readOnly
                    />
                    <InputField
                      id="bookingDates"
                      name="bookingDates"
                      placeholder="Fecha de salida"
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
                <div className="flex justify-center pb-5 px-5">
                  <button type="submit" className="mt-2 bg-[#FBFFBD] text-[#0C1123]  h-10 px-4 rounded font-semibold shadow-md " >
                    Reservar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
