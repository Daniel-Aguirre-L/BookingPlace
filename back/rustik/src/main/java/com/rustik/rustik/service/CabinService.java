package com.rustik.rustik.service;


import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.mapper.DetailMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.FeatureRepository;
import io.vavr.control.Either;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;
    private final ImageService imageService;
    private final DetailService detailService;
    private final FeatureRepository featureRepository;

    @Autowired
    public CabinService(CabinRepository cabinRepository, ImageService imageService, DetailService detailService, FeatureRepository featureRepository) {
        this.cabinRepository = cabinRepository;
        this.imageService = imageService;
        this.detailService = detailService;
        this.featureRepository = featureRepository;
    }

    public List<Cabin> findAll() {
        return cabinRepository.findAll();
    }

    public Cabin findById(Long id) {
        return cabinRepository.findById(id).orElse(null);
    }

    public Either<List<String>, CabinDTO> save(CabinDTO cabinDTO) {

        List<String> errors = new ArrayList<>();

        // Validar que se hayan subido al menos 5 imágenes
        if (cabinDTO.getImagesToUpload() == null || cabinDTO.getImagesToUpload().size() < 5) {
            errors.add("No se han subido al menos 5 imágenes.");
        }

        // Validar si la cabaña ya existe
        if (cabinDTO.getId() == null && cabinRepository.existsByName(cabinDTO.getName())) {
            errors.add("La cabaña con nombre " + cabinDTO.getName() + " ya existe.");
        }

        if(cabinDTO.getId() != null && cabinDTO.getId() > 0) {
            Cabin cabin = cabinRepository.findById(cabinDTO.getId()).orElse(null);

            if (cabin == null) {
                errors.add("Cabaña no existente");
            }
        }
        
        if(cabinDTO.getCabinFeatures() != null){
            cabinDTO.getCabinFeatures().forEach(detailDTO -> {
                if(!featureRepository.existsById(detailDTO.getFeatureId()))
                {
                    errors.add("La característica con id " + detailDTO.getFeatureId() + " no existe");
                }
            });
        }

        if(!errors.isEmpty())
        {
            return Either.left(errors);
        }

        Cabin cabin = CabinMapper.toEntity(cabinDTO);
        cabin = cabinRepository.save(cabin);

        // Subir imágenes y obtener URLs
        List<Image> imageUrls = imageService.uploadImages(cabin, cabinDTO.getImagesToUpload());

        //Crear los detalles
        List<Detail> details = detailService.save(cabin, cabinDTO.getCabinFeatures());

        cabin.setImages(imageUrls);
        cabin.setCabinFeatures(details);

        // Convertir la entidad de la cabaña guardada en un DTO
        CabinDTO savedCabinDTO = CabinMapper.toDTO(cabin);

        // Devolver respuesta exitosa con el DTO
        return Either.right(savedCabinDTO);
    }

    public void delete(Long id) {
        cabinRepository.deleteById(id);
    }

    public void saveCabins(List<Cabin> cabins) {

        cabinRepository.saveAll(cabins);
    }

    public List<CabinDTO> getRandomCabins(int count) {
        List<Cabin> allCabins = cabinRepository.findAll();
        Collections.shuffle(allCabins); // Mezcla la lista de cabañas


        List<Cabin> randomCabins = allCabins.stream()
                .limit(count)
                .collect(Collectors.toList());

        return randomCabins.stream()
                .map(cabin -> {
                    CabinDTO dto = CabinMapper.toDTO(cabin);
                    return dto;
                }).collect(Collectors.toList());
    }

    public List<CabinDTO> getCabinsByCategories(List<CabinCategory> categories) {
        List<Cabin>cabins = cabinRepository.findByCategoryIn(categories);
        return cabins.stream()
                .map(cabin -> {
                    CabinDTO dto = CabinMapper.toDTO(cabin);
                    return dto;
                }).collect(Collectors.toList());
    }
}
