package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.BookingDTO;
import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.model.Booking;

public class BookingMapper {

    public static BookingDTO toDTO (Booking booking){

        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setUser(UserMapper.toDTO(booking.getUser()));
        bookingDTO.setCabin(CabinMapper.toDTO(booking.getCabin()));
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setInitialDate(booking.getInitialDate());
        bookingDTO.setEndDate(booking.getEndDate());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setDates();
        bookingDTO.setTotalPrice();

        return bookingDTO;

    }




}
