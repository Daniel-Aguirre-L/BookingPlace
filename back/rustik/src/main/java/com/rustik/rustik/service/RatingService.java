package com.rustik.rustik.service;

import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.mapper.RatingMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Rating;
import com.rustik.rustik.model.User;
import com.rustik.rustik.repository.BookingRepository;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.RatingRepository;
import com.rustik.rustik.repository.UserRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private CabinRepository cabinRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    BookingRepository bookingRepository;

    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    public Rating findById(Long id) {
        return ratingRepository.findById(id).orElseThrow(() -> new NotFoundException("Rating no encontrado"));
    }

    public List<Rating> findByCabin(Long cabinId) {
        return ratingRepository.findByCabinId(cabinId);
    }

    public Rating save(RatingDTO ratingDTO, User user, Long cabinId) {
        // Verificar si el usuario tiene una reserva para esta cabaña
        boolean hasReservation = bookingRepository.existsByUserIdAndCabinId(user.getId(), cabinId);

        if (!hasReservation) {
            throw new RuntimeException("El usuario no tiene una reserva para esta cabaña y no puede comentar.");
        }

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() -> new RuntimeException("Cabaña no encontrada"));

        Rating rating = ratingRepository.findByUserAndCabin(user, cabin)
                .orElseGet(() -> RatingMapper.toEntity(ratingDTO, user, cabin));

        rating.setScore(ratingDTO.getScore());
        rating.setReview(ratingDTO.getReview());
        return ratingRepository.save(rating);
    }


    public Rating update(Long id, RatingDTO ratingDTO, User currentUser) {

        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rating no encontrado"));

        // Verificar si el usuario autenticado es el que creó el rating
        if (!rating.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("No tienes permiso para editar este rating");
        }

        rating.setScore(ratingDTO.getScore());
        rating.setReview(ratingDTO.getReview());

        return ratingRepository.save(rating);
    }

    public void delete(Long id) {
        ratingRepository.deleteById(id);
    }

    public Map<String, Object> getRatingSummaryForCabin(Long cabinId) {
        List<Tuple> result = ratingRepository.calculateAverageScoreAndCount(cabinId);
        Tuple row = result.get(0);

        Double averageScore = row.get("avgScore", Double.class);
        Long totalRatings = row.get("totalRatings", Long.class);

        Map<String, Object> summary = new HashMap<>();
        summary.put("averageScore", averageScore);
        summary.put("totalRatings", totalRatings);

        return summary;
    }

}