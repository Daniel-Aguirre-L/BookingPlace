package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CabinMapper {

    // Convertir de Cabin a CabinDTO
    public static CabinDTO toDTO(Cabin cabin) {
        CabinDTO dto = new CabinDTO();
        dto.setId(cabin.getId());
        dto.setName(cabin.getName());
        dto.setLocation(cabin.getLocation());
        dto.setCapacity(cabin.getCapacity());
        dto.setDescription(cabin.getDescription());
        dto.setPrice(cabin.getPrice());
        dto.setCategory(cabin.getCategory() != null ? cabin.getCategory().name() : null);

        // Convertir la lista de detalles usando el DetailMapper
        List<DetailDTO> detailDTOs = cabin.getCabinFeatures().stream()
                .map(DetailMapper::toDTO)
                .collect(Collectors.toList());
        dto.setCabinFeatures(detailDTOs);

        // Convertir la lista de imágenes
        List<ImageDTO> imageDTOs = cabin.getImages().stream()
                .map(image -> {
                    ImageDTO imageDTO = new ImageDTO();
                    imageDTO.setId(image.getId());
                    imageDTO.setUrl(image.getUrl());
                    return imageDTO;
                })
                .collect(Collectors.toList());
        dto.setImages(imageDTOs);

        List<RatingDTO> ratingDTOs = cabin.getRatings().stream()
                .map(rating -> {
                    RatingDTO ratingDTO = new RatingDTO();
                    ratingDTO.setId(rating.getId());
                    ratingDTO.setScore(rating.getScore());
                    ratingDTO.setReview(rating.getReview());
                    ratingDTO.setCreatedAt(rating.getCreatedAt());

                    // Asegúrate de que el nombre del usuario sea extraído correctamente
                    User user = rating.getUser();  // Obtener el usuario relacionado con la valoración
                    if (user != null) {
                        ratingDTO.setUserName(user.getName());  // Establecer el nombre del usuario
                    }

                    return ratingDTO;
                })
                .collect(Collectors.toList());
        dto.setRatings(ratingDTOs);


        return dto;
    }

    // Convertir de CabinDTO a Cabin
    public static Cabin toEntity(CabinDTO dto) {

        Cabin  cabin = new Cabin();

        if (dto.getId() != null){
            cabin.setId(dto.getId());
        }

        if (dto.getName() != null){
            cabin.setName(dto.getName());
        }

        if (dto.getLocation() != null){
            cabin.setLocation(dto.getLocation());
        }

        if (dto.getCapacity() != null){
            cabin.setCapacity(dto.getCapacity());
        }

        if (dto.getDescription() != null){
            cabin.setDescription(dto.getDescription());
        }

        if (dto.getPrice()!= null){
            cabin.setPrice(dto.getPrice());
        }

        if (dto.getCategory() != null) {
            cabin.setCategory(CabinCategory.valueOf(dto.getCategory().toUpperCase()));
        }

        return cabin;
    }

    public static Cabin toExistingEntity(Cabin  existingCabin, CabinDTO dto) {

        //Cabin  cabin = existingCabin;

        if (dto.getName() != null && !dto.getName().isEmpty()){
            existingCabin.setName(dto.getName());
        }

        if (dto.getLocation() != null && !dto.getLocation().isEmpty()){
            existingCabin.setLocation(dto.getLocation());
        }

        if (dto.getCapacity() != null && dto.getCapacity() > 0){
            existingCabin.setCapacity(dto.getCapacity());
        }

        if (dto.getDescription() != null && !dto.getDescription().isEmpty()){
            existingCabin.setDescription(dto.getDescription());
        }

        if (dto.getPrice()!= null && dto.getPrice() > 0){
            existingCabin.setPrice(dto.getPrice());
        }


        if (dto.getCategory() != null && !dto.getCategory().isEmpty() ) {
            if (!isValidEnum(CabinCategory.class, dto.getCategory().toUpperCase())){
                throw new BadRequestException("Categoria no reconocida");
            }
            existingCabin.setCategory(CabinCategory.valueOf(dto.getCategory().toUpperCase()));
        }

        return existingCabin;

    }

    public static <E extends Enum<E>> boolean isValidEnum(Class<E> enumClass, String value) {
        try {
            Enum.valueOf(enumClass, value);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}