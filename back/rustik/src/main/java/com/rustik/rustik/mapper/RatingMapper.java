package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Rating;
import com.rustik.rustik.model.User;


public class RatingMapper {


    public static RatingDTO toDTO(Rating rating) {
        RatingDTO ratingDTO = new RatingDTO();
        ratingDTO.setId(rating.getId());

        // Obtener el nombre del usuario a través de su relación directa
        User user = rating.getUser();
        if (user != null) {
            ratingDTO.setUserName(user.getName());
        }

        ratingDTO.setScore(rating.getScore());
        ratingDTO.setReview(rating.getReview());
        ratingDTO.setCreatedAt(rating.getCreatedAt());

        return ratingDTO;
    }


    public static Rating toEntity(RatingDTO ratingDTO, User user, Cabin cabin) {
        Rating rating = new Rating();

        // Asignar el usuario y la cabaña directamente
        rating.setUser(user);
        rating.setCabin(cabin);

        // Asignar los demás campos
        rating.setScore(ratingDTO.getScore());
        rating.setReview(ratingDTO.getReview());
        rating.setCreatedAt(ratingDTO.getCreatedAt());

        return rating;
    }
}