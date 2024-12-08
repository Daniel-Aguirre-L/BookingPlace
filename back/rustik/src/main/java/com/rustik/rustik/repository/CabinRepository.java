package com.rustik.rustik.repository;


import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CabinRepository extends JpaRepository<Cabin, Long> {

    List<Cabin> findAll();

    boolean existsByName(String name);

    List<Cabin> findByCategoryIn(List<CabinCategory> categories);

    List<Cabin> findByNameContaining(String name);


    @Query("SELECT c FROM Cabin c WHERE NOT EXISTS (" +
            "SELECT b FROM Booking b WHERE b.cabin = c " +
            "AND (b.initialDate BETWEEN :initialDate AND :endDate " +
            "OR b.endDate BETWEEN :initialDate AND :endDate " +
            "OR (b.initialDate <= :initialDate AND b.endDate >= :endDate)))")
    List<Cabin> findCabinsByDates(@Param("initialDate") LocalDate initialDate,
                                                @Param("endDate") LocalDate endDate);
}