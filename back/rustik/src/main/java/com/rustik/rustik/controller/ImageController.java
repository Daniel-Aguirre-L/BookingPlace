package com.rustik.rustik.controller;


import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // Obtener todas las imágenes
    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<Image> images = imageService.getAllImages();
        List<ImageDTO> imageDTOs = images.stream()
                .map(image -> {
                    ImageDTO dto = new ImageDTO();
                    dto.setId(image.getId());
                    dto.setUrl(image.getUrl());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(imageDTOs);
    }

    // Obtener una imagen por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        Image image = imageService.findById(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(image);
    }

    // Crear una nueva imagen a partir del archivo recibido
    @PostMapping("/{cabinId}")
    public ResponseEntity<ImageDTO> uploadImage(@PathVariable Long cabinId,
                                                @RequestParam("file") MultipartFile file) {
        // Validar que el archivo no esté vacío
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // O manejar esto con un DTO de error
        }

        // Lógica para subir la imagen y convertir a DTO
        Image savedImage = imageService.uploadImage(cabinId, file);
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(savedImage.getId());
        imageDTO.setUrl(savedImage.getUrl()); // Asegúrate de que `getUrl` esté disponible en tu entidad `Image`

        return ResponseEntity.status(HttpStatus.CREATED).body(imageDTO);
    }

    // Eliminar una imagen por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        boolean deleted = imageService.deleteImage(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}