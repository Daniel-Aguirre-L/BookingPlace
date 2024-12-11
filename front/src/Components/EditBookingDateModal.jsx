import { useState } from 'react'
import useNotificationStore from '../store/useNotificationStore';
import SelectDate from './SelectDate';
import DetalleReserva from './DetalleReserva';
import useLoaderModalStore from '../store/useLoaderModalStore';
import { rustikApi } from '../services/rustikApi';
import { rustikEndpoints } from '../services/rustkEndPoints';

const EditBookingDateModal = ({ booking, onClose = () => { } }) => {

    const { cabin } = booking || {};
    const [showConfirmBooking, setShowConfirmBooking] = useState(false);
    const [bookingDates, setBookingDates] = useState([booking.initialDate || "", booking.endDate || ""]);
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();

    const handleStartBooking = () => {
        if (bookingDates[0] === bookingDates[1]) {
            setNotification({
                visibility: true,
                type: "warning",
                text: "La fecha de salida no puede ser igual a la de ingreso.",
            });
        } else if (bookingDates[0] !== "" && bookingDates[1] !== "") {
            if (bookingDates[0].length > 10) {
                let date1 = bookingDates[0].split(" ")[1];
                let date2 = bookingDates[1].split(" ")[1];
                date1 = date1.split("/")[2] + "-" + date1.split("/")[1] + "-" + date1.split("/")[0];
                date2 = date2.split("/")[2] + "-" + date2.split("/")[1] + "-" + date2.split("/")[0];
                setBookingDates([date1, date2]);
            }
            setShowConfirmBooking(true);
        }
    }

    const getTotalBooking = () => {
        if (bookingDates[0] === "" || bookingDates[1] === "") {
            return -1;
        }
        const date1 = new Date(bookingDates[0] + "T00:00:00");
        const date2 = new Date(bookingDates[1] + "T00:00:00");
        const nights = Number((date2 - date1) / (1000 * 60 * 60 * 24))
        const total = nights * Number(cabin.price);

        return { total, nights, price: cabin.price };
    }

    const handleSaveBooking = async () => {
        showLoaderModal();
        try {
            const bookingData = {
                initialDate: bookingDates[0],
                endDate: bookingDates[1],
                totalPrice: Number(getTotalBooking().total.toFixed(2)),
            }
            await rustikApi.put(`${rustikEndpoints.bookings}/${booking.id}`, bookingData);
            setNotification({
                visibility: true,
                type: "success",
                text: `Cabaña reservada correctamente.`,
            });
            //setIsBooked(true);
            onClose(true);
        } catch (error) {
            setNotification({
                visibility: true,
                type: "error",
                text: `Error al reservar la cabaña. (${error.response.data})`,
            });
            console.error("Error al guardar, contacte a soporte técnico", error);
        } finally {
            hideLoaderModal();
        }

    }

    return (

        <div className='animate-fadeIn fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur z-50' >
            <div className='bg-black bg-opacity-70 p-3 md:p-10 rounded-xl relative w-full md:w-auto'>
                <div className='w-full flex justify-end ' >
                <button
                    type="button"
                    className="relative md:absolute md:top-3 md:right-3 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 active:scale-95"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
                </div>
                <h3 className="text-center text-2xl mt-5">Edita las fechas de tu reserva</h3>
                <h4 className="text-center text-xl mb-5">en: {cabin.name || ""}</h4>
                {
                    !showConfirmBooking ? (
                        <SelectDate cabin={cabin} bookingDates={bookingDates} setBookingDates={setBookingDates} handleStartBooking={handleStartBooking} />
                    ) : (
                        <DetalleReserva bookingDates={bookingDates}
                            totalBooking={getTotalBooking}
                            capacity={cabin.capacity}
                            onEdit={() => setShowConfirmBooking(false)}
                            onConfirm={handleSaveBooking}
                            isBooked={false}
                        />
                    )
                }

            </div>
        </div>


    )
}

export default EditBookingDateModal