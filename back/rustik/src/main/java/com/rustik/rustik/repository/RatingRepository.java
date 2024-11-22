package com.rustik.rustik.repository;

import com.rustik.rustik.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByCabinId(Long cabinId);
}