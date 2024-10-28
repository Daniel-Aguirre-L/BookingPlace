package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class DetailDTO {
    private Long id;
    private Long featureId; // ID de la característica
    private String featureName; // Nombre de la característica
    private Integer quantity; // Detalle de la característica
}