import { useState, useEffect, useRef } from "react";
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

function BookingCalendar({ setBookingDates, visible, setVisible, calendarStyles, hasReserves }) {
  const [selected, setSelected] = useState([]);
  const { setNotification } = useNotificationStore();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const handleMonthChange = (month, year, secondCalendar = false) => {
    if (secondCalendar){

      let direction = month === currentMonth ? 0 : 1;
      if (direction){
        let newMonth = month === 0 && year - currentYear > 1 ? 1: month;
        setCurrentMonth(newMonth - 1 < 0 ? 11 : newMonth-1);
        if (newMonth-1 === 0){
          setCurrentYear(currentYear + 1);
        }
      } else{
        setCurrentMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1);
        setCurrentYear(currentMonth - 1 < 0 ? currentYear - 1 : currentYear);
      }
    }else{
      setCurrentMonth(month === currentMonth ? currentMonth - 1 < 0 ? 11 : currentMonth - 1 : month);
      setCurrentYear(year);
    }
  }

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
    // Close the calendar when clicking outside
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setVisible]);

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
    <div ref={calendarRef} className="w-full flex " >
      <Calendar
        month={currentMonth}
        onMonthChange={handleMonthChange}
        year={currentYear}
        selected={selected}
        range={true}
        protection={true}
        options={{ locale: "es-UY", weekStartsOn: 1, useAttributes: false }}
        onChange={setSelected}
        onOverbook={(date, type) =>
          type == "PAST"
            ? setNotification({
                visibility: true,
                type: "warning",
                text: `La fecha seleccionada: ${formatDate(
                  date
                )} no puede ser en el pasado.`,
              })
            : setNotification({
                visibility: true,
                type: "error",
                text: `La fecha seleccionada: ${formatDate(
                  date
                )} ya fue reservada.`,
              })
        }
        className={calendarStyles[0]}
        disabled={(date, state) => {
          return weekDays.includes(date.getDay());
        }}
        {...(hasReserves && { reserved })}
      />
      <Calendar
        month={currentMonth + 1}
        onMonthChange={(month, year) => handleMonthChange(month, year, true)}
        year={currentMonth === 11 ? currentYear + 1 : currentYear}
        selected={selected}
        range={true}
        protection={true}
        options={{ locale: "es-UY", weekStartsOn: 1, useAttributes: true }}
        onChange={setSelected}
        onOverbook={(date, type) =>
          type == "PAST"
            ? setNotification({
                visibility: true,
                type: "warning",
                text: `La fecha seleccionada: ${formatDate(
                  date
                )} no puede ser en el pasado.`,
              })
            : setNotification({
                visibility: true,
                type: "error",
                text: `La fecha seleccionada: ${formatDate(
                  date
                )} ya fue reservada.`,
              })
        }
        className={calendarStyles[1]}
        disabled={(date, state) => {
          return weekDays.includes(date.getDay());
        }}
        {...(hasReserves && { reserved })}
      />
    </div>
  );
}

export default BookingCalendar;
