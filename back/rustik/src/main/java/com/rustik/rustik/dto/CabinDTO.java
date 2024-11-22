package com.rustik.rustik.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class CabinDTO {
    private Long id;
    private String name;
    private String location;
    private Integer capacity;
    private String description;
    private Double price;
    private String category;
    private List<DetailDTO> cabinFeatures; // Lista de detalles
    private List<ImageDTO> images = new ArrayList<>(); // Lista de url
    private List<RatingDTO> ratings;

    @JsonIgnore
    private List<MultipartFile> imagesToUpload = new ArrayList<>(); // Lista de imagenes
}
