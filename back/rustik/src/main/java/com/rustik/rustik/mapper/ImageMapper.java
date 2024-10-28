package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.model.Image;

public class ImageMapper {

    // Convertir de Image a ImageDTO
    public static ImageDTO toDTO(Image image) {
        if (image == null) {
            return null; // Manejo de caso nulo
        }

        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setUrl(image.getUrl());
        // Aquí puedes agregar más campos si es necesario
        return dto;
    }

    // Convertir de ImageDTO a Image
    public static Image toEntity(ImageDTO dto) {
        if (dto == null) {
            return null; // Manejo de caso nulo
        }

        Image image = new Image();
        image.setId(dto.getId());
        image.setUrl(dto.getUrl());
        // Aquí puedes agregar más campos si es necesario
        return image;
    }
}