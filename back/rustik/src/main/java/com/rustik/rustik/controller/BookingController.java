package com.rustik.rustik.controller;

import com.rustik.rustik.dto.BookingDTO;
import com.rustik.rustik.dto.BookingDatesCalendar;
import com.rustik.rustik.dto.BookingPageDto;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.mapper.BookingMapper;
import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.BookingState;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.service.BookingService;
import com.rustik.rustik.service.EmailService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    public static final Logger logger = Logger.getLogger(BookingController.class);

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

    @GetMapping("/{id}/dates")
    public ResponseEntity<List<BookingDatesCalendar>> bookingDatesByCabin (@PathVariable Long id){

        LocalDate today = LocalDate.now();
        List<BookingDatesCalendar> bookingDates = bookingService.findBookingByCabin(id).stream()
                .filter(bookingDto -> bookingDto.getEndDate().isAfter(today) && bookingDto.getState().equals(BookingState.ACTIVA))
                .map(BookingMapper::toBookingDatesCalendar).collect(Collectors.toList());

        return ResponseEntity.ok(bookingDates);
    }


    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking (@PathVariable Long id,
                                                     @AuthenticationPrincipal CustomUserDetails userDetails,
                                                     @RequestBody BookingDTO bookingDTO){

        if (bookingDTO.getEndDate().isBefore(bookingDTO.getInitialDate())){
            throw new BadRequestException("La fecha final debe ser posterior a la fecha inical de la reserva");
        }
        User user = userDetails.getUser();

        Booking solicitedBooking = bookingService.findBookingById(id);

        if(solicitedBooking.getUser().getEmail().equals(user.getEmail()) &&
                LocalDate.now().plusDays(2).isBefore(solicitedBooking.getInitialDate())
                && solicitedBooking.getState().equals(BookingState.ACTIVA)){
            if (bookingDTO.getInitialDate().isBefore(LocalDate.now().plusDays(2))){
                throw new BadRequestException("No es posible modificar tu reserva para una fecha anterios a " + LocalDate.now().plusDays(2));
            }

            Booking updateBooking = bookingService.updateBooking(BookingMapper.toExistingEntity(bookingDTO,solicitedBooking));

            return ResponseEntity.ok(BookingMapper.toDTO(updateBooking));
        }

        throw new BadRequestException("No es posible modificar reservas 48hs antes de la misma.");

    }

    //NO VA, Se Busca directamente desde cabins ("/filterByDates")
    /*@GetMapping
    public ResponseEntity<List<BookingDTO>> bookinsBydate (@RequestParam("initialDate") String initialDateStr,
                                                           @RequestParam("endDate") String endDateStr) {
        LocalDate initialDate = LocalDate.parse(initialDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);


        List<BookingDTO> bookingsDTO = bookingService.findBookingByDates(initialDate,endDate)
                .stream().map(BookingMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(bookingsDTO);
    } */

    @Secured("ROLE_ADMIN")
    @GetMapping("/all-bookings")
    public ResponseEntity<BookingPageDto> allBooking (
            @RequestParam(defaultValue = "") String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
//        List<BookingDTO> bookingsDTO = bookingService.findAllBookings()
//                .stream().map(BookingMapper::toDTO).collect(Collectors.toList());
//
//        return ResponseEntity.ok(bookingsDTO);

        Page<Booking> bookingsPage = bookingService.findAllBookings(searchTerm, page, size);
        BookingPageDto bookingsPageDto = BookingMapper.toPageBookingDto(bookingsPage);
        return ResponseEntity.ok(bookingsPageDto);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking (@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails){

        User user = userDetails.getUser();
        Booking solicitedBooking = bookingService.findBookingById(id);
        System.out.println(user.getRole().equals(UserRole.ROLE_ADMIN));

        if((solicitedBooking.getUser().getEmail().equals(user.getEmail()) || user.getRole().equals(UserRole.ROLE_ADMIN)) && LocalDate.now().plusDays(2).isBefore(solicitedBooking.getInitialDate())){
            solicitedBooking.setState(BookingState.CANCELADA);
            return ResponseEntity.ok(bookingService.cancelBooking(solicitedBooking));
        }
        throw new BadRequestException("No es posible cancelar esta resserva");
    }

}
