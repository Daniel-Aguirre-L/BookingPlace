package com.rustik.rustik.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RatingDTO {

    private Long id;


    @Size(min = 1, max = 100, message = "User name must be between 1 and 100 characters")
    private String userName;


    @Min(value = 0, message = "Score must be at least 0")
    @Max(value = 5, message = "Score must be at most 5")
    private Double score; // Puntuación del rating, entre 0 y 5.

    @Size(max = 500, message = "Review cannot exceed 500 characters")
    private String review; // Comentarios opcionales del rating

    private LocalDateTime createdAt;
}