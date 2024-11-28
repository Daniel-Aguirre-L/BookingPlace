package com.rustik.rustik.repository;

import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByCabinAndInitialDateLessThanEqualAndEndDateGreaterThanEqual (Cabin cabin, LocalDate initialDate, LocalDate endDate);

    List<Booking> findByUser (User user);

    List<Booking> findByCabin (Cabin cabin);
}
