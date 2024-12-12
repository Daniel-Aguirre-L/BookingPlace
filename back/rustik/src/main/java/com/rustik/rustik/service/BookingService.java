package com.rustik.rustik.service;

import com.rustik.rustik.dto.BookingDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.BookingState;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.User;
import com.rustik.rustik.repository.BookingRepository;
import com.rustik.rustik.repository.CabinRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private UserService userService;

    @Autowired
    private CabinRepository cabinRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private  EmailService emailService;


    public static final Logger logger = Logger.getLogger(BookingService.class);


    public Booking postBooking (User user, Long cabinId, BookingDTO bookingDTO){

        Cabin cabin = cabinRepository.findById(cabinId).get();
        if ( cabin.getIsActive() == false){
            throw new BadRequestException("Cabaña inactiva");
        }
        Double price = bookingDTO.getTotalPrice();
        logger.info("Precio recibido: " + price.toString());
        bookingDTO.setCabin(CabinMapper.toDTO(cabin));
        bookingDTO.setTotalPrice();
        logger.info("Precio calculado: " + bookingDTO.getTotalPrice().toString());

        if ( price.doubleValue() != bookingDTO.getTotalPrice().doubleValue()){
            throw new BadRequestException("Precio incorrecto");
        }

        if (bookingDTO.getInitialDate().isBefore(LocalDate.now())){
            throw new BadRequestException("Fechas incorrectas, toda reserva debe ser posterior a " + LocalDate.now().toString());
        }

        if (bookingRepository.findExistingBookingsForCabin(cabin,bookingDTO.getInitialDate(),bookingDTO.getEndDate(),BookingState.ACTIVA ).get().isEmpty()){
             Booking booking = new Booking();
             booking.setCabin(cabin);
             booking.setUser(user);
             booking.setInitialDate(bookingDTO.getInitialDate());
             booking.setEndDate(bookingDTO.getEndDate());
             booking.setTotalPrice(bookingDTO.getTotalPrice());

             return bookingRepository.save(booking);
        }

         throw new BadRequestException("La cabaña ya se encuentra reservada en esas fechas");


    }

    public List<Booking> findBookingByUser (User user) {
        List<Booking> bookings = bookingRepository.findByUser(user, Sort.by(Sort.Order.asc("state"), Sort.Order.desc("initialDate"))).orElseThrow();
        return bookings;
    }


    public List<Booking> findBookingByCabin (Long cabinId){
        Cabin cabin = cabinRepository.findById(cabinId).orElseThrow();
        List<Booking> bookings = bookingRepository.findByCabin(cabin).orElseThrow();
        return bookings;
    }

    public List<Booking> findBookingByDates (LocalDate initialDate, LocalDate endDate){
        List<Booking> bookings = bookingRepository.findBookingsFreeOnDate(initialDate,endDate,BookingState.ACTIVA).orElseThrow();
        return bookings;
    }


    public Booking findBookingById (Long bookingId ){
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        return booking;

    }


//    public List<Booking> findAllBookings (){
//        List<Booking> bookings = bookingRepository.findAll();
//        return bookings;
//    }

    public Page<Booking> findAllBookings(String searchTerm, int page, int size){

        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Order.asc("state"), Sort.Order.desc("initialDate")));

        Page<Booking> bookingsPage;
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            bookingsPage = bookingRepository.findAll(pageable);
        } else {
            Boolean isState = false;
            for (BookingState bookingState : BookingState.values()) {
                if (bookingState.name().equalsIgnoreCase(searchTerm.trim())) {
                    isState = true;
                    break;
                }
            }
            if (isState) {
                bookingsPage = bookingRepository.findByState(BookingState.valueOf(searchTerm.toUpperCase()), pageable);
            }else{
                bookingsPage = bookingRepository.searchBookings(searchTerm, pageable);
            }

        }
        return bookingsPage;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Se ejecuta a las 00:00 todos los días
    public void automaticUpdateBookingState() {
        logger.info("Actualizando el estado de las reservas");
        List<Booking> bookings = bookingRepository.findByState(BookingState.ACTIVA);
        for (Booking booking : bookings) {
            if (booking.getInitialDate().isBefore(LocalDate.now()) ){
                booking.setState(BookingState.COMPLETA);
                bookingRepository.save(booking);
                logger.info("Reserva actualizada: " + booking.getId() + " " + booking.getCabin().getName());
            }
        }
    }

    public String cancelBooking (Booking booking){
        booking.setState(BookingState.CANCELADA);
        bookingRepository.save(booking);
        emailService.sendBookingCancellationEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName() + " " + booking.getUser().getSurname(),
                booking.getCabin(),
                booking.getInitialDate(),
                booking.getEndDate(),
                booking.getTotalPrice()
        );
        return "Booking canceled";
    }


    public Booking updateBooking (Booking booking){

        Optional<List<Booking>> bookingsList = bookingRepository.findExistingBookingsForCabin(booking.getCabin(),
                booking.getInitialDate(),booking.getEndDate(), BookingState.ACTIVA);


        if (!bookingsList.get().isEmpty()) {
            if (bookingsList.get().size() > 1 || bookingsList.get().get(0).getId() != booking.getId()) {
                throw new BadRequestException("Las fechas se superponencon otra reserva");
            }
        }
        emailService.sendBookingUpdateEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName() + " " + booking.getUser().getSurname(),
                booking.getCabin(),
                booking.getInitialDate(),
                booking.getEndDate(),
                booking.getTotalPrice()
        );

        return bookingRepository.save(booking);

    }
}
