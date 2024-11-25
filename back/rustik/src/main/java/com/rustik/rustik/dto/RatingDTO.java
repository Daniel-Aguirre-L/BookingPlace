package com.rustik.rustik.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RatingDTO {

    private Long id;

    private String userFullName;

    @Min(value = 1, message = "La puntuación debe ser al menos 1")
    @Max(value = 5, message = "La puntuación no puede ser mayor a 5")
    private Integer score;

    @Size(max = 500, message = "La reseña no puede exceder los 500 caracteres")
    private String review; // Comentarios opcionales del rating

    private LocalDateTime createdAt;
}