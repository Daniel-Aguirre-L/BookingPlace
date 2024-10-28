package com.rustik.rustik.controller;


import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/details")
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }

    @GetMapping
    public List<DetailDTO> getAllDetails() {
        // Convertir la lista de detalles a DTOs
        return detailService.findAll()
                .stream()
                .map(this::convertToDTO) // Mapeo a DTO
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) {
        Detail detail = detailService.findById(id);
        return detail != null ? ResponseEntity.ok(convertToDTO(detail)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public DetailDTO createDetail(@RequestBody Detail detail) {
        Detail savedDetail = detailService.save(detail);
        return convertToDTO(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetailDTO> updateDetail(@PathVariable Long id, @RequestBody Detail detail) {
        Detail existingDetail = detailService.findById(id);
        if (existingDetail == null) {
            return ResponseEntity.notFound().build();
        }
        detail.setId(id); // Asegúrate de que el ID sea correcto
        Detail updatedDetail = detailService.save(detail);
        return ResponseEntity.ok(convertToDTO(updatedDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        detailService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Método para convertir Detail a DetailDTO
    private DetailDTO convertToDTO(Detail detail) {
        DetailDTO dto = new DetailDTO();
        dto.setId(detail.getId());
        dto.setFeatureId(detail.getFeature().getId());
        dto.setFeatureName(detail.getFeature().getName());
        dto.setQuantity(detail.getQuantity());
        return dto;
    }
}