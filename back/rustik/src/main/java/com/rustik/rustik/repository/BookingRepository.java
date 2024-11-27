package com.rustik.rustik.repository;

import com.rustik.rustik.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByCabinIdAndInitialDateLessThanEqualAndEndDateGreaterThanEqual (Long cabinId, LocalDate initialDate, LocalDate endDate);

    List<Booking> findByUserId (Long userId);

    List<Booking> findByCabinId (Long cabinId);
}
