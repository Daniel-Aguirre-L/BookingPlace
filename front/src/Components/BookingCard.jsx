import React from "react";
import { CiLocationOn } from "react-icons/ci";

const BookingCard = ({ booking, onCancel, onDetails }) => {
  return (
    <div className="flex flex-col md870:flex-row bg-white border rounded-2xl shadow-md overflow-hidden px-6 py-8 items-center gap-x-8">
      <img
        src={booking.imageSrc}
        alt={booking.title}
        className="w-min-20 md870:w-20 object-cover rounded-lg"
      />

      <div className="flex flex-col md870:flex-row flex-grow justify-between gap-2">
        <div className="flex flex-col justify-center text-primary-color montserrat text-center">
          <span className="text-xl font-bold text-primary-color montserrat">{booking.title}</span>
          <div className="flex gap-1.5 items-center mx-auto my-0">
            <CiLocationOn  className="min-w-[20px]" />
            <p className="text-sm text-[#595858] montserrat">{booking.description}</p>
          </div>
        </div>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>

        {/* Fechas y precio */}
        <div className="flex  justify-center items-center gap-4">
          <div className="text-sm">
            <p className="montserrat text-[#595858] text-base">Fecha llegada</p>
            <p className="text-primary-color text-xl font-semibold montserrat">{booking.entryDate}</p>
          </div>
          <hr className="border-2 w-5 border-[#112211]" />
          <div className="text-sm">
            <p className="montserrat text-[#595858] text-base">Fecha salida</p>
            <p className="text-primary-color text-xl font-semibold montserrat">{booking.exitDate}</p>
          </div>
        </div>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>

        {/* Costo total */}
        <div className="flex flex-col justify-center text-center">
          <p className="montserrat text-[#0C1123] text-base">Costo total</p>
          <p className="text-primary-color text-xl font-semibold montserrat">${booking.totalCost}</p>
        </div>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>

        <button onClick={() => onCancel(booking.id)}>
          <div className="flex  items-center justify-center text-[#0C1123] montserrat  text-base gap-3 ml-2">
            <img src="/Icons/cancel-color.svg" alt="calcel" />
            Cancelar
          </div>
        </button>
      </div>
      <button
        className="flex items-center px-3.5 py-3.5 text-[#088395]  rounded-lg shadow border-[#088395] border-solid border"
        onClick={() => onDetails(booking.id)}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          color="#4C4850"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default BookingCard;
