package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class ImageDTO {
    private Long id;
    private String url; // URL de la imagen

    public ImageDTO(String url) {
        this.url = url;
    }

    public ImageDTO() {
    }
}