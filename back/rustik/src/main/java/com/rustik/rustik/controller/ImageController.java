package com.rustik.rustik.controller;


import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.mapper.ImageMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    private final CabinService cabinService;

    @Autowired
    public ImageController(ImageService imageService, CabinService cabinService) {

        this.imageService = imageService;
        this.cabinService = cabinService;
    }


    @Operation(summary = "Obtener todas las imágenes", description = "Devuelve una lista de todas las imágenes almacenadas.")
    @ApiResponse(responseCode = "200", description = "Lista de imágenes obtenida exitosamente.")
    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<ImageDTO> imageDTOs = imageService.getAllImages().stream()
                .map(ImageMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(imageDTOs);
    }


    @Operation(summary = "Obtener imagen por ID", description = "Devuelve una imagen especifica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imagen encontrada."),
            @ApiResponse(responseCode = "404", description = "Imagen no encontrada.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        Image image = imageService.findById(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        ImageDTO imageDTO = ImageMapper.toDTO(image);
        return ResponseEntity.ok(image);
    }


    @Operation(summary = "Subir una nueva imagen", description = "Permite cargar una nueva imagen para una cabaña específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Imagen cargada exitosamente."),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o cabaña no existente."),
            @ApiResponse(responseCode = "415", description = "Formato de archivo no compatible.")
    })
    @PostMapping("/{cabinId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long cabinId,
                                                @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Cabin cabin = cabinService.findById(cabinId);

        if(cabin == null)
        {
            return ResponseEntity.badRequest().body("Cabaña no existente");
        }

        Image savedImage = imageService.uploadImage(cabin, file);
        ImageDTO imageDTO = ImageMapper.toDTO(savedImage);

        return ResponseEntity.status(HttpStatus.CREATED).body(imageDTO);
    }


    @Operation(summary = "Eliminar imagen", description = "Permite eliminar una imagen permanentemente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Imagen eliminada exitosamente."),
            @ApiResponse(responseCode = "404", description = "Imagen no encontrada.")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        boolean deleted = imageService.deleteImage(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}