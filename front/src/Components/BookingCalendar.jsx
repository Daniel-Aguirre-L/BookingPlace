import { useState, useEffect } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import useNotificationStore from "../store/useNotificationStore";
import "../calendarVariables.css";

const oneDay = 86400000;
const today = new Date().getTime() + oneDay;

const reserved = Array.from({ length: 3 }, (_, i) => {
  const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
  const startDate = new Date(today + oneDay * 8 * i);

  return {
    startDate,
    endDate: new Date(startDate.getTime() + oneDay * daysCount),
  };
});

const weekDays = [0, 1, 2];

function BookingCalendar({ setBookingDates, visible, setVisible }) {
  const [selected, setSelected] = useState([]);
  const { setNotification } = useNotificationStore();

  const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat("es-UY", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  useEffect(() => {
    if (visible) {
      if (selected[1]) {
        const formattedDates = selected.map(formatDate);
        setBookingDates(formattedDates);
        setVisible(false);
      }
    }
  }, [selected]);

  return (
    <Calendar
      selected={selected}
      reserved={reserved}
      range={true}
      protection={true}
      options={{ locale: "es-UY", weekStartsOn: 1, useAttributes: true }}
      onChange={setSelected}
      onOverbook={(date, type) =>
        type=="PAST"
          ? setNotification({
              visibility: true,
              type: "warning",
              text: `La fecha seleccionada: ${formatDate(date)} no puede ser en el pasado.`,
            })
          : setNotification({
              visibility: true,
              type: "error",
              text: `La fecha seleccionada: ${formatDate(date)} ya fue reservada.`,
            })
      }
      className={`rounded-xl right-[10rem] top-[-8rem] transition-all duration-300 ease-in-out ${
        visible
          ? "opacity-100 scale-100 translate-y-0 visible"
          : "opacity-0 scale-90 -translate-y-[-1rem] invisible"
      }`}
      disabled={(date, state) => {
        return weekDays.includes(date.getDay());
      }}
    />
  );
}

export default BookingCalendar;
