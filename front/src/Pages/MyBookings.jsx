import React, { useState, useEffect } from "react";
import BookingCard from '../Components/BookingCard';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";

const MyBookings = () => {
  const [bookings, setBokings] = useState([]);

  const getBokingsData = async () => {
    try {
      const { data } = await rustikApi.get(rustikEndpoints.myBookings);
      setBokings(data.cabinDTOS ?? []);
    } catch (error) {
      console.error("Error al obtener mis reservas", error);
    } 
  };
    
  useEffect(() => {
    getBokingsData();
  }, []);

  const handleCancel = (id) => {
    alert(`Cancelar reserva con ID: ${id}`);
  };

  const handleDetails = (id) => {
    alert(`Ver detalles de la reserva con ID: ${id}`);
  };


  return (
    <div className="mb-8">
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onCancel={handleCancel}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  )
}

export default MyBookings