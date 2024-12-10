package com.rustik.rustik.repository;

import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.BookingState;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    //Optional<List<Booking>> findByCabinAndInitialDateLessThanEqualAndEndDateGreaterThanEqual (Cabin cabin, LocalDate initialDate, LocalDate endDate);

    Optional<List<Booking>> findByUser (User user);
    Optional<List<Booking>> findByUser (User user, Sort sort);

    Optional<List<Booking>> findByCabin (Cabin cabin);

    Optional<List<Booking>> findByInitialDateLessThanEqualAndEndDateGreaterThanEqual (LocalDate initialDate, LocalDate endDate);

    List<Booking> findByState(BookingState state);

    Page<Booking> findByState(BookingState state, Pageable pageable);

    Page<Booking> findAll(Pageable pageable);

    @Query("SELECT b FROM Booking b " +
            "JOIN b.cabin c " +
            "JOIN b.user u " +
            "WHERE (LOWER(CONCAT(c.name, ' ', c.category, ' ', c.location,' ', b.id,' ', b.initialDate,' ', b.endDate,' ', b.totalPrice, ' ', u.email,' ', u.name,' ', u.surname)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Booking> searchBookings(
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );

    @Query("SELECT b FROM Booking b WHERE :fechaBusqueda BETWEEN b.initialDate AND b.endDate")
    List<Booking> findBookingsWithDateInRange(LocalDate fechaBusqueda);


    @Query("SELECT b FROM Booking b WHERE (:cabin IS NULL OR b.cabin = :cabin) " +
            "AND (b.state = :activeState) " +
            "AND ((b.initialDate BETWEEN :initialDate AND :endDate) " +
            "OR (b.endDate BETWEEN :initialDate AND :endDate) " +
            "OR (b.initialDate <= :initialDate AND b.endDate >= :endDate))")
    Optional<List<Booking>> findExistingBookingsForCabin(@Param("cabin") Cabin cabin,
                                                         @Param("initialDate") LocalDate initialDate,
                                                         @Param("endDate") LocalDate endDate,
                                                         @Param("activeState") BookingState activeState);

    @Query("SELECT b FROM Booking b WHERE (b.endDate < :initialDate OR b.initialDate > :endDate) AND b.state = :activeState")
    Optional<List<Booking>> findBookingsFreeOnDate(@Param("initialDate") LocalDate initialDate,
                                                  @Param("endDate") LocalDate endDate,
                                                  @Param("activeState") BookingState activeState);

    @Query("SELECT b FROM Booking b WHERE b.user = :user")
    Optional<List<Booking>> findByUserIncludingNullCabins(@Param("user") User user);
}
