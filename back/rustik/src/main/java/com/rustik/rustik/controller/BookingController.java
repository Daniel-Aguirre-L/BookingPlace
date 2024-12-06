package com.rustik.rustik.controller;

import com.rustik.rustik.dto.BookingDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.mapper.BookingMapper;
import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.BookingState;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.service.BookingService;
import com.rustik.rustik.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private EmailService emailService;



    @PostMapping ("/{id}")
    public ResponseEntity<BookingDTO> newBooking (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id,
                                               @RequestBody @Valid BookingDTO bookingDTO){

        bookingDTO.setDates();
        Booking booking = bookingService.postBooking(
                userDetails.getUser(),
                id, bookingDTO

        );

        BookingDTO dto = BookingMapper.toDTO(booking);

        String name = userDetails.getUser().getName();
        String surname = userDetails.getUser().getSurname();

        // Enviar correo de confirmación
        emailService.sendBookingConfirmationEmail(
                userDetails.getUser().getEmail(),
                name + " " + surname,
                booking.getCabin(),
                booking.getInitialDate(),
                booking.getEndDate(),
                booking.getTotalPrice()
        );

        return ResponseEntity.ok(dto);

    }


    @GetMapping ("/my-bookings")
    public ResponseEntity<List<BookingDTO>> getMyBookings (@AuthenticationPrincipal CustomUserDetails userDetails){


        List<BookingDTO> bookingsDTO = bookingService.findBookingByUser(userDetails.getUser()).stream().
                map(BookingMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(bookingsDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<BookingDTO>> bookinsByCabin (@PathVariable Long id){

        List<BookingDTO> bookingsDTO = bookingService.findBookingByCabin(id).stream()
                .map(BookingMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(bookingsDTO);
    }

    @GetMapping
    public ResponseEntity<List<BookingDTO>> bookinsBydate (@RequestBody @Valid BookingDTO bookingDTO){

        List<BookingDTO> bookingsDTO = bookingService.findBookingByDates(bookingDTO.getInitialDate(),bookingDTO.getEndDate())
                .stream().map(BookingMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(bookingsDTO);
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingDTO>> allBooking (){

        List<BookingDTO> bookingsDTO = bookingService.findAllBookings()
                .stream().map(BookingMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(bookingsDTO);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking (@PathVariable Long bookingId, @AuthenticationPrincipal CustomUserDetails userDetails){

        User user = userDetails.getUser();

        Booking solicitedBooking = bookingService.findBookingById(bookingId);

        if(solicitedBooking.getUser() == user && LocalDate.now().plusDays(2).isBefore(solicitedBooking.getInitialDate())){
            solicitedBooking.setState(BookingState.CANCELED);
            return ResponseEntity.ok(bookingService.cancelBooking(solicitedBooking));
        }
        emailService.sendBookingCancellationEmail(
                user.getEmail(), // String
                user.getName() + " " + user.getSurname(), // String
                solicitedBooking.getCabin(), // Cabin
                solicitedBooking.getInitialDate(), // LocalDate
                solicitedBooking.getEndDate(), // LocalDate
                solicitedBooking.getTotalPrice() // Double
        );
        throw new BadRequestException("No es posible cancelar esta resserva");
    }





}
