import { useState, useEffect } from "react";
import BookingCard from '../Components/BookingCard';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";
import useNotificationStore from '../store/useNotificationStore';
import useLoaderModalStore from "../store/useLoaderModalStore";
import Warning from "../Components/Warning";
import { usePagination } from "../hooks/usePagination";

const MyBookings = () => {
  const [bookings, setBokings] = useState([]);

  const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
  const { setNotification } = useNotificationStore();
  const [warningIsOpen, setWarningIsOpen] = useState({ status: false, message: "" });
  const [confirm, setConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { currentData, setPaginationData, PaginationControls } = usePagination(bookings, 5);

  const getBokingsData = async () => {
    try {
      const { data } = await rustikApi.get(rustikEndpoints.myBookings);
      setBokings(data ?? []);
      setPaginationData(data ?? []);
    } catch (error) {
      console.error("Error al obtener mis reservas", error);
    }
  };

  useEffect(() => {
    getBokingsData();
  }, []);

  const handleCancel = async () => {

    if (!selectedId) return;
    try {
      showLoaderModal();
      await rustikApi.delete(`${rustikEndpoints.bookings}/${selectedId}`);
      await getBokingsData();
      setNotification({
        visibility: true,
        type: "success",
        text: "Reserva Cancelada correctamente.",
      });
    } catch (error) {
      setNotification({
        visibility: true,
        type: "error",
        text: `Error al cancelar la reserva. (${error.response.data})`,
      });
      console.error("Error al borrar, contacte a soporte técnico", error);
    } finally {
      hideLoaderModal();
      setSelectedId(null);
    }
   
  };

  useEffect(() => {
    if (confirm) {
      handleCancel();
      setConfirm(false);
    }
  }, [confirm]);

  useEffect(() => {
    if (selectedId) {
      setWarningIsOpen({
        status: true,
        message: "¿Estás segur@ de que quieres Cancelar esta reserva?",
      });
    }
  }, [selectedId]);


  return (
    <>
      <div className="mb-8">
        <div className="space-y-4">
          {currentData.map((booking) => (
            <BookingCard
              key={booking?.id}
              booking={booking}
              onCancel={setSelectedId}
            />
          ))}
        </div>
        <div className="text-background-dark">
          <PaginationControls />
        </div>
      </div>
      <Warning
        isOpen={warningIsOpen}
        onClose={() => {
          setWarningIsOpen({ status: false, message: "" });
          setSelectedId(null);
        }}
        onSubmit={() => {
          setWarningIsOpen({ status: false, message: "" });
          setConfirm(true);
        }}
      />
    </>
  )
}

export default MyBookings