package com.rustik.rustik.controller;


import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.service.CabinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/cabins")
public class CabinController {

    private final CabinService cabinService;

    @Autowired
    public CabinController(CabinService cabinService) {
        this.cabinService = cabinService;
    }

    // Obtener todas las cabañas con sus detalles como DTOs
    @GetMapping
    public List<CabinDTO> getAllCabins() {
        return cabinService.findAll().stream()
                .map(CabinMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener una cabaña por su ID como DTO
    @GetMapping("/{id}")
    public ResponseEntity<CabinDTO> getCabinById(@PathVariable Long id) {
        Cabin cabin = cabinService.findById(id);
        if (cabin == null) {
            return ResponseEntity.notFound().build();
        }
        CabinDTO cabinDTO = CabinMapper.toDTO(cabin);
        return ResponseEntity.ok(cabinDTO);
    }

    // Crear una nueva cabaña a partir del DTO recibido
    @PostMapping
    public ResponseEntity<CabinDTO> createCabin(@RequestBody CabinDTO cabinDTO) {
        Cabin cabin = CabinMapper.toEntity(cabinDTO);
        Cabin savedCabin = cabinService.save(cabin);
        CabinDTO savedCabinDTO = CabinMapper.toDTO(savedCabin);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCabinDTO);
    }

    // Actualizar una cabaña por su ID a partir del DTO recibido
    @PutMapping("/{id}")
    public ResponseEntity<CabinDTO> updateCabin(@PathVariable Long id, @RequestBody CabinDTO cabinDTO) {
        Cabin existingCabin = cabinService.findById(id);
        if (existingCabin == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los datos de la cabaña
        cabinDTO.setId(id);
        Cabin updatedCabin = CabinMapper.toEntity(cabinDTO);
        Cabin savedCabin = cabinService.save(updatedCabin);
        CabinDTO savedCabinDTO = CabinMapper.toDTO(savedCabin);

        return ResponseEntity.ok(savedCabinDTO);
    }

    // Eliminar una cabaña por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCabin(@PathVariable Long id) {
        cabinService.delete(id);
        return ResponseEntity.noContent().build();
    }
}