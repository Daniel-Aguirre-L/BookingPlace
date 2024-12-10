
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";

const BookingCard = ({ booking, onCancel }) => {
  const navigate = useNavigate();
  const image = booking?.cabin?.images?.[0];


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

  return (
    <div className="flex flex-col md870:flex-row bg-white border rounded-2xl shadow-md overflow-hidden px-6 py-8 items-center gap-x-8">
      <img
        src={image?.url}
        alt={booking?.cabin?.name}
        className="w-min-20 max-h-52 md870:w-20 md870:h-20 object-cover rounded-lg"
      />
      <div className="flex flex-col md870:flex-row flex-grow justify-between gap-2">
        <Link to={`${routeList.CATALOG_DETAIL}/${booking?.cabin?.id}`} className="flex flex-col justify-center text-primary-color montserrat text-center">
          <span className="text-xl font-bold text-primary-color montserrat w-full md870:w-48 truncate overflow-hidden whitespace-nowrap">{booking?.cabin?.name}</span>
          <div className="flex gap-1.5 items-center mx-auto my-0">
            <CiLocationOn className="min-w-[20px]" />
            <p className="text-sm text-[#595858] montserrat md870:w-48 truncate overflow-hidden whitespace-nowrap">{booking?.cabin?.location}</p>
          </div>
        </Link>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>

        {/* Fechas y precio */}
        <div className="flex  justify-center items-center gap-4">
          <div className="text-sm">
            <p className="montserrat text-[#595858] text-base">Fecha llegada</p>
            <p className="text-primary-color text-xl font-semibold montserrat">{formatDate(booking?.initialDate)}</p>
          </div>
          <hr className="border-2 w-5 border-[#112211]" />
          <div className="text-sm">
            <p className="montserrat text-[#595858] text-base">Fecha salida</p>
            <p className="text-primary-color text-xl font-semibold montserrat">{formatDate(booking?.endDate)}</p>
          </div>
        </div>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>

        {/* Costo total */}
        <div className="flex flex-col justify-center text-center">
          <p className="montserrat text-[#0C1123] text-base">Costo total</p>
          <p className="text-primary-color text-xl font-semibold montserrat">${booking?.totalPrice}</p>
        </div>

        <div className="hidden md870:block w-px max-h-12 h-12 bg-[#088395] flex self-center"></div>
        

          { booking?.state === "ACTIVA" ? (
            <button onClick={() => onCancel(booking?.id)}>
            <div className="flex  items-center justify-center  montserrat text-[#0C1123] text-base gap-3 ml-2">
              <img src="/Icons/cancel-color.svg" alt="calcel" />
              Cancelar
            </div>
          </button>
          ):(
            <div className="flex  items-center justify-center  montserrat text-[#0C1123] text-base gap-3 ml-2">
              <p className={`text-xl font-semibold montserrat capitalize ${booking?.state === "COMPLETA" ? "text-primary-color ":"text-red-900" } `} >{(booking?.state ||"").toLowerCase()}</p>
            </div>
          )}
            
        
      </div>
      <button
        className="hidden md870:flex items-center px-3.5 py-3.5 text-[#088395]  rounded-lg shadow border-[#088395] border-solid border"
        onClick={() => navigate(`${routeList.CATALOG_DETAIL}/${booking?.cabin?.id}`)}
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