package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class DetailDTO {
    private Long id;
    private Long featureId;
    private String featureName;
    private Integer quantity;
    private String icon;
}