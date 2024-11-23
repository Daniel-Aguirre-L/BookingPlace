package com.rustik.rustik.repository;

import com.rustik.rustik.model.Rating;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByCabinId(Long cabinId);

    @Query("SELECT AVG(r.score) as avgScore, COUNT(r.id) as totalRatings FROM Rating r WHERE r.cabin.id = :cabinId")
    List<Tuple> calculateAverageScoreAndCount(@Param("cabinId") Long cabinId);
}