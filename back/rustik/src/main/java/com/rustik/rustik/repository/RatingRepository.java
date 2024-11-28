package com.rustik.rustik.repository;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Rating;
import com.rustik.rustik.model.User;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByCabinId(Long cabinId);
    boolean existsByUserAndCabin(User user, Cabin cabin);
    Optional<Rating> findByUserAndCabin(User user, Cabin cabin);

    @Query("SELECT AVG(r.score) as avgScore, COUNT(r.id) as totalRatings FROM Rating r WHERE r.cabin.id = :cabinId")
    List<Tuple> calculateAverageScoreAndCount(@Param("cabinId") Long cabinId);
}