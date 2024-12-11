import { useState, useEffect } from "react";
import BookingCard from '../Components/BookingCard';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";
import useNotificationStore from '../store/useNotificationStore';
import useLoaderModalStore from "../store/useLoaderModalStore";
import Warning from "../Components/Warning";
import { usePagination } from "../hooks/usePagination";
import EditBookingDateModal from "../Components/EditBookingDateModal";

const MyBookings = () => {
  
  const [bookings, setBokings] = useState([]);
  const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
  const { setNotification } = useNotificationStore();
  const [warningIsOpen, setWarningIsOpen] = useState({ status: false, message: "" });
  const [confirm, setConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { currentData, setPaginationData, PaginationControls } = usePagination(bookings, 5);
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState({});

  const onCloseEditBookingModal = (refresh = false) => {
    setShowEditBookingModal(false);
    setEditingBooking({});
    if (refresh) getBokingsData();
  };

  const handleEditBooking = (booking) => {
    if (booking.state !== "ACTIVA") return;
    // Obtén la fecha actual
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const twoDaysLater = new Date(currentDate);
    twoDaysLater.setDate(currentDate.getDate() + 2);
    
    if ( new Date(booking.initialDate + "T00:00:00") <= twoDaysLater){
      setNotification({
        visibility: true,
        type: "warning",
        text: `No puedes editar esta reserva con menos de 2 días de anticipación.`,
      });
      return;
    }

    setEditingBooking(booking);
    setShowEditBookingModal(true);

  }

  
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
      {
        currentData.length > 0 ? (
          <div className="mb-8">
          <div className="space-y-4">
            {currentData.map((booking) => (
              <BookingCard
                key={booking?.id}
                booking={booking}
                onCancel={setSelectedId}
                onEdit={handleEditBooking}
              />
            ))}
          </div>
          <div className="text-background-dark">
            <PaginationControls />
          </div>
        </div>
        ):(
          <div className="h-80 flex justify-center items-center" >
            <h2 className="text-4xl font-bold text-center animate-fadeIn">No tienes reservas</h2>
          </div>
        )
      }
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
        {showEditBookingModal && <EditBookingDateModal booking={editingBooking} onClose={ onCloseEditBookingModal}  /> }
    </>
  )
}

export default MyBookings