package com.rustik.rustik.service;

import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.mapper.RatingMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Rating;
import com.rustik.rustik.model.User;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.RatingRepository;
import com.rustik.rustik.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private CabinRepository cabinRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    public Rating findById(Long id) {
        return ratingRepository.findById(id).orElseThrow(() -> new NotFoundException("Rating no encontrado"));
    }

    public List<Rating> findByCabin(Long cabinId) {
        return ratingRepository.findByCabinId(cabinId);
    }

    public Rating save(RatingDTO ratingDTO) {
        User user = userRepository.findById(ratingDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        Cabin cabin = cabinRepository.findById(ratingDTO.getCabinId())
                .orElseThrow(() -> new NotFoundException("Cabaña no encontrada"));


        Rating rating = RatingMapper.toEntity(ratingDTO, user, cabin);

        return ratingRepository.save(rating);
    }

    public Rating update(Long id, RatingDTO ratingDTO) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rating no encontrado"));

        rating.setScore(ratingDTO.getScore());
        rating.setReview(ratingDTO.getReview());
        return ratingRepository.save(rating);
    }

    public void delete(Long id) {
        ratingRepository.deleteById(id);
    }
}