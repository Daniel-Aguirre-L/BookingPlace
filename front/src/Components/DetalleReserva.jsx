import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";


const DetalleReserva = ({ bookingDates, totalBooking, capacity, isBooked, onEdit = () => { }, onConfirm = () => { } }) => {
  const { total, nights, price } = totalBooking();
  return (
    <div className="animate-fadeIn  w-full h-full  bg-opacity-50 md:py-8 flex justify-center md:justify-end">
      <div className="sm:max-w-lg sm:w-full m-3  w-full ">
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="p-0 overflow-hidden ">
            <div className="mb-4 mx-auto p-4  border-b border-slate-200 pt-7 pb-7 text-center bg-background-light rounded-xl bg-clip-border  ">
              <h2 className="text-xl font-bold text-primary-color font-monserrat  ">Detalles de reserva</h2>
            </div>
            <table className="w-full mt-3 text-left table-auto">
              <tbody>
                <tr className="shadow-md">
                  <td className="p-4 border-b border-slate-200 ">
                    <div className="font-semibold text-background-dark">Fechas</div>
                    <div className="w-full flex justify-between" >
                      <span className="text-background-dark flex flex-col md:flex-row md:gap-2 "><span>Llegada:</span>{bookingDates[0]}</span>
                      <span className="text-background-dark flex flex-col md:flex-row md:gap-2"><span>Salida:</span>{bookingDates[1]}</span>
                    </div>
                  </td>
                  {!isBooked && <td className="p-4 border-b border-slate-200 text-center ">
                    <button className="active:scale-90" onClick={onEdit} >
                      <img src="/Icons/Editar.svg" alt="Editar fechas" />
                    </button>
                  </td>}
                </tr>

                <tr className="shadow-md">
                  <td className="p-4 border-b border-slate-200 ">
                    <div className="font-semibold text-background-dark">Huéspedes</div>
                    <div className=" text-background-dark">{capacity} huéspedes</div>
                  </td>
                </tr>
                <tr className="shadow-md">
                  <td className="p-4 grid grid-cols-3 gap-2">
                    <div className="font-semibold text-left">Precio</div>
                    <div className="font-semibold text-center">Noches</div>
                    <div className="font-semibold text-right">Total</div>
                    <div className="text-background-dark">${price.toFixed(1)}/noche</div>
                    <div className="text-background-dark text-center">{nights} </div>
                    <div className="text-background-dark font-bold text-right text-xl">${total.toFixed(2)}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center items-center py-5 w-full px-5 ">
            {!isBooked &&
              <button
                className="bg-secondary-color text-black-dark h-10 px-4 rounded font-semibold shadow-md w-full active:scale-95"
                onClick={onConfirm}
              >
                Confirmar la reserva
              </button>
            }
            {
              isBooked &&
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-center text-xl font-bold text-primary-color">¡Cabaña reservada exitosamente!</p>
                <Link to={routeList.USER_BOOKINGS} className="w-full flex justify-center mt-3"  >
                  <span className="bg-primary-color text-lg text-light-text text-center h-10 w-full rounded font-semibold shadow-md  active:scale-95 flex items-center justify-center" >
                    Ir a mis reservas
                  </span>
                </Link>
              </div>

            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;
