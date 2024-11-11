package com.rustik.rustik.controller;


import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.mapper.DetailMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Feature;
import com.rustik.rustik.service.DetailService;
import com.rustik.rustik.service.FeatureService;
import com.rustik.rustik.service.CabinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

import static com.rustik.rustik.mapper.DetailMapper.toDTO;

@RestController
@RequestMapping("/api/v1/details")
public class DetailController {

    private final DetailService detailService;
    private final FeatureService featureService;
    private final CabinService cabinService;

    @Autowired
    public DetailController(DetailService detailService, FeatureService featureService, CabinService cabinService) {
        this.detailService = detailService;
        this.featureService = featureService;
        this.cabinService = cabinService;
    }

    @GetMapping
    public List<DetailDTO> getAllDetails() {
        // Convertir la lista de detalles a DTOs
        return detailService.findAll()
                .stream()
                .map(DetailMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) {
        Detail detail = detailService.findById(id);
        return detail != null ? ResponseEntity.ok(toDTO(detail)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createDetail(@RequestBody DetailDTO detailDto) {

        Cabin existingCabin = cabinService.findById(detailDto.getCabinId());

        if (existingCabin == null) {
            return ResponseEntity.badRequest().body("Cabaña no existente");
        }

        Feature existingFeature = featureService.findById(detailDto.getFeatureId());

        if (existingFeature == null) {
            return ResponseEntity.badRequest().body("Característica no existente");
        }

        Detail detail = DetailMapper.toDetail(detailDto, existingCabin, existingFeature);
        Detail savedDetail = detailService.save(detail);

        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(savedDetail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDetail(@PathVariable Long id, @RequestBody DetailDTO detailDto) {
        Detail existingDetail = detailService.findById(id);
        if (existingDetail == null) {
            return ResponseEntity.notFound().build();
        }

        Cabin existingCabin = cabinService.findById(detailDto.getCabinId());

        if (existingCabin == null) {
            return ResponseEntity.badRequest().body("Cabaña no existente");
        }

        Feature existingFeature = featureService.findById(detailDto.getFeatureId());

        if (existingFeature == null) {
            return ResponseEntity.badRequest().body("Característica no existente");
        }

        Detail detail = DetailMapper.toExistingEntity(detailDto, existingDetail, existingCabin, existingFeature);

        Detail updatedDetail = detailService.save(detail);
        return ResponseEntity.ok(toDTO(updatedDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        detailService.delete(id);
        return ResponseEntity.noContent().build();
    }

}