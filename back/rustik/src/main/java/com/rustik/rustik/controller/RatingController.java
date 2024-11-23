package com.rustik.rustik.controller;

import com.rustik.rustik.dto.RatingDTO;
import com.rustik.rustik.mapper.RatingMapper;
import com.rustik.rustik.model.Rating;

import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.service.RatingService;
import com.rustik.rustik.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserService userService;

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
    @PostMapping("/{cabinId}" )
    public ResponseEntity<RatingDTO> createRating(
            @PathVariable Long cabinId,
            @RequestBody @Valid RatingDTO ratingDTO,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {


        Long userId = customUserDetails.getUser().getId();


        Rating rating = ratingService.save(ratingDTO, customUserDetails.getUser(), cabinId);
        RatingDTO responseDTO = RatingMapper.toDTO(rating);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @Operation(summary = "Actualizar un rating", description = "Permite actualizar un rating existente.")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRating(@PathVariable Long id, @RequestBody @Valid RatingDTO ratingDTO) {
        // Obtener el email del usuario autenticado
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Buscar el usuario por email
        Optional<User> currentUserOptional = userService.findUserByEmail(currentUserEmail);

        if (currentUserOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        User currentUser = currentUserOptional.get();

        try {
            Rating updatedRating = ratingService.update(id, ratingDTO, currentUser);
            RatingDTO responseDTO = RatingMapper.toDTO(updatedRating);
            return ResponseEntity.ok(responseDTO);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
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