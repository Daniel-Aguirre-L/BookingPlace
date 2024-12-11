package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.BookingDTO;
import com.rustik.rustik.dto.BookingDatesCalendar;
import com.rustik.rustik.dto.BookingPageDto;
import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.model.Booking;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class BookingMapper {

    public static BookingDTO toDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setUser(UserMapper.toDTO(booking.getUser()));

        if (booking.getCabin() != null) {
            bookingDTO.setCabin(CabinMapper.toDTO(booking.getCabin()));
        } else {
            bookingDTO.setCabin(null);
        }

        bookingDTO.setCreatedAt(booking.getCreatedAt());
        bookingDTO.setInitialDate(booking.getInitialDate());
        bookingDTO.setEndDate(booking.getEndDate());
        bookingDTO.setCreatedAt(booking.getCreatedAt());
        bookingDTO.setDates();
        bookingDTO.setTotalPrice();
        bookingDTO.setState(booking.getState());

        return bookingDTO;
    }


    public static Booking toExistingEntity (BookingDTO bookingDTO, Booking booking){

        if(bookingDTO.getInitialDate() != booking.getInitialDate() && bookingDTO.getInitialDate().isAfter(LocalDate.now().plusDays(2))){
            booking.setInitialDate(bookingDTO.getInitialDate());
        }
        if (bookingDTO.getEndDate() != booking.getEndDate() ){
            booking.setEndDate(bookingDTO.getEndDate());
        }

        bookingDTO.setDates();
        bookingDTO.setCabin(CabinMapper.toDTO(booking.getCabin()));
        bookingDTO.setTotalPrice();

        if(bookingDTO.getTotalPrice() != booking.getTotalPrice() && bookingDTO.getTotalPrice() != 0.0 ) {
            booking.setTotalPrice(bookingDTO.getTotalPrice());
        }

        return booking;

    }

    public static BookingPageDto toPageBookingDto(Page<Booking> pageBooking){
        BookingPageDto bookingPageDTO = new BookingPageDto();

        List<BookingDTO> bookingsDTO = pageBooking.getContent()
                .stream().map(BookingMapper::toDTO).collect(Collectors.toList());

        bookingPageDTO.setContent(bookingsDTO);
        bookingPageDTO.setTotalElements(pageBooking.getTotalElements());
        bookingPageDTO.setTotalPages(pageBooking.getTotalPages());
        bookingPageDTO.setPageNumber(pageBooking.getNumber());
        bookingPageDTO.setPageSize(pageBooking.getSize());
        return bookingPageDTO;
    }

    public static BookingDatesCalendar toBookingDatesCalendar(Booking booking) {
        BookingDatesCalendar bookingDatesCalendar = new BookingDatesCalendar();
        bookingDatesCalendar.setStartDate(booking.getInitialDate());
        bookingDatesCalendar.setEndDate(booking.getEndDate());
        return bookingDatesCalendar;

    }


}