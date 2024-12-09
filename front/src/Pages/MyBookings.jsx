import React, { useState, useEffect } from "react";
import BookingCard from '../Components/BookingCard';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";
import useNotificationStore from '../store/useNotificationStore';

const MyBookings = () => {
  const [bookings, setBokings] = useState([]);
  const { setNotification } = useNotificationStore();

  const getBokingsData = async () => {
    try {
      const { data } = await rustikApi.get(rustikEndpoints.myBookings);
      setBokings(data ?? []);
    } catch (error) {
      console.error("Error al obtener mis reservas", error);
    } 
  };
    
  useEffect(() => {
    getBokingsData();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await rustikApi.delete(`${rustikEndpoints.booking}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        getBokingsData();
        setNotification({
          visibility: true,
          type: "success",
          text: "Reserva eliminada correctamente.", 
        });
      } else {
        console.error("Error al eliminar la reserva:", response.status);
        setNotification({
          visibility: true,
          type: "error",
          text: "No se pudo eliminar la reserva, intenta más tarde.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setNotification({
        visibility: true,
        type: "error",
        text: "No se pudo remover la reserva, intenta más tarde.",
      });
    }
  };


  return (
    <div className="mb-8">
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking?.id}
            booking={booking}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  )
}

export default MyBookings