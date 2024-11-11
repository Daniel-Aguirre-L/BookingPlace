package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class DetailDTO {
    private Long id;
    private Long cabinId;
    private Long featureId;
    private Integer quantity;
}