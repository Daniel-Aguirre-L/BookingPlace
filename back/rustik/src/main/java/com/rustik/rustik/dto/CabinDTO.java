package com.rustik.rustik.dto;

import lombok.Data;
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
    private List<DetailDTO> cabinFeatures = new ArrayList<>(); // Lista de detalles
    private List<ImageDTO> images = new ArrayList<>(); // Lista de url
}
