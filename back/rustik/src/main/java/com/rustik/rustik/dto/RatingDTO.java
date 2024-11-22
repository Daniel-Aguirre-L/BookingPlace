package com.rustik.rustik.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RatingDTO {

    private Long id;
    private Long cabinId;
    private Long userId;
    private String userName;
    private Integer score;
    private String review;
    private LocalDateTime createdAt;

}