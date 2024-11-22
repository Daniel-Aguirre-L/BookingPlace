package com.rustik.rustik.controller;

import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.mapper.RatingMapper;
import com.rustik.rustik.model.Rating;

import com.rustik.rustik.service.RatingService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Operation(summary = "Obtener todos los ratings", description = "Devuelve una lista de todos los ratings.")
    @GetMapping
    public ResponseEntity<List<RatingDTO>> getAllRatings() {
        List<RatingDTO> ratings = ratingService.findAll().stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ratings);
    }

    @Operation(summary = "Obtener rating por ID", description = "Devuelve los detalles de un rating específico por su ID.")
    @GetMapping("/{id}")
    public ResponseEntity<RatingDTO> getRatingById(@PathVariable Long id) {
        Rating rating = ratingService.findById(id);
        if (rating == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        RatingDTO ratingDTO = RatingMapper.toDTO(rating);
        return ResponseEntity.ok(ratingDTO);
    }

    @Operation(summary = "Crear un nuevo rating", description = "Permite crear un nuevo rating para una cabaña.")
    @PostMapping
    public ResponseEntity<RatingDTO> createRating(@RequestBody @Valid RatingDTO ratingDTO) {
        Rating rating = ratingService.save(ratingDTO);
        RatingDTO ratingDTOResponse = RatingMapper.toDTO(rating);
        return ResponseEntity.status(HttpStatus.CREATED).body(ratingDTOResponse);
    }

    @Operation(summary = "Actualizar un rating", description = "Permite actualizar un rating existente.")
    @PutMapping("/{id}")
    public ResponseEntity<RatingDTO> updateRating(@PathVariable Long id, @RequestBody @Valid RatingDTO ratingDTO) {
        Rating rating = ratingService.update(id, ratingDTO);
        if (rating == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        RatingDTO ratingDTOResponse = RatingMapper.toDTO(rating);
        return ResponseEntity.ok(ratingDTOResponse);
    }

    @Operation(summary = "Eliminar un rating", description = "Permite eliminar un rating existente.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Obtener ratings por cabaña", description = "Devuelve todos los ratings de una cabaña específica.")
    @GetMapping("/by-cabin/{cabinId}")
    public ResponseEntity<List<RatingDTO>> getRatingsByCabin(@PathVariable Long cabinId) {
        List<RatingDTO> ratings = ratingService.findByCabin(cabinId).stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ratings);
    }
}