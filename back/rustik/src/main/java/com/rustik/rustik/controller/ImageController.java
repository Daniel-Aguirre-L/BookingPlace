package com.rustik.rustik.controller;


import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.mapper.ImageMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.CabinService;
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

    private final CabinService cabinService;

    @Autowired
    public ImageController(ImageService imageService, CabinService cabinService) {

        this.imageService = imageService;
        this.cabinService = cabinService;
    }

    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<ImageDTO> imageDTOs = imageService.getAllImages().stream()
                .map(ImageMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(imageDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        Image image = imageService.findById(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        ImageDTO imageDTO = ImageMapper.toDTO(image);
        return ResponseEntity.ok(image);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        boolean deleted = imageService.deleteImage(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}