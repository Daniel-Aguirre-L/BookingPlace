import { useState, useEffect, useRef } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import useNotificationStore from "../store/useNotificationStore";
import "../calendarVariables.css";


const weekDays = [0, 1, 2];

function BookingCalendar({ setBookingDates, visible, setVisible, calendarStyles, hasReserves, reserved }) {
  const [selected, setSelected] = useState([]);
  const { setNotification } = useNotificationStore();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentMonth2, setCurrentMonth2] = useState(new Date().getMonth() + 1 === 12 ? 0 : new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentYear2, setCurrentYear2] = useState(new Date().getMonth() + 1 === 12 ? new Date().getFullYear() + 1 : new Date().getFullYear())

  const handleMonthChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }
  const handleMonthChange2 = (month, year) => {
    if (currentMonth2 === 0) {
      if (month === 11) {
        setCurrentMonth(currentMonth - 1);
        setCurrentYear(year);
      } else {
        setCurrentMonth(0);
        setCurrentYear(year);
      }
    } else if (currentMonth2 === 1) {
      if (month === 0) {
        setCurrentMonth(11);
        setCurrentYear(year - 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (currentMonth2 === 11) {
      if (month === 0) {
        setCurrentMonth(currentMonth + 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      setCurrentMonth(month > currentMonth2 ? currentMonth + 1 : currentMonth - 1);
    }
  }

  useEffect(() => {
    if (currentMonth === 11) {
      setCurrentMonth2(0);
      setCurrentYear2(currentYear + 1);
    } else {
      setCurrentMonth2(currentMonth + 1);
      setCurrentYear2(currentYear);
    }

  }, [currentMonth, currentYear])



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
    <div ref={calendarRef} className="w-full flex min-h-[307px]" >
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
        month={currentMonth2}
        onMonthChange={handleMonthChange2}
        year={currentYear2}
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
