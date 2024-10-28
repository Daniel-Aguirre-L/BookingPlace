package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.model.Image;

public class ImageMapper {

    // Convertir de Image a ImageDTO
    public static ImageDTO toDTO(Image image) {
        if (image == null) {
            return null;
        }

        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setUrl(image.getUrl());

        return dto;
    }
}