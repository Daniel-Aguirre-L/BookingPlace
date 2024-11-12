package com.rustik.rustik.controller;



import com.rustik.rustik.model.Feature;
import com.rustik.rustik.service.FeatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/features")
public class FeatureController {

    private final FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }


    @Operation(summary = "Obtener todas las características", description = "Devuelve una lista de todas las características disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de características obtenida exitosamente.")
    @GetMapping
    public List<Feature> getAllFeatureLists() {
        return featureService.findAll();
    }


    @Operation(summary = "Obtener característica por ID", description = "Devuelve una característica específica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Característica encontrada."),
            @ApiResponse(responseCode = "404", description = "Característica no encontrada.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Feature> getFeatureListById(@PathVariable Long id) {
        Feature feature = featureService.findById(id);
        return feature != null ? ResponseEntity.ok(feature) : ResponseEntity.notFound().build();
    }


    @Operation(summary = "Crear una nueva característica", description = "Permite crear una nueva característica.")
    @ApiResponses(value =  {
            @ApiResponse(responseCode = "201", description = "Característica creada exitosamente."),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos.")
    }   )
    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {

        Feature savedFeature = featureService.save(feature);
        return ResponseEntity.status(201).body(savedFeature);
    }


    @Operation(summary = "Actualizar una característica", description = "Permite actualizar una característica existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Característica actualizada exitosamente."),
            @ApiResponse(responseCode = "404", description = "Característica no encontrada."),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos.")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeatureList(@PathVariable Long id, @RequestBody Feature feature) {
        Feature existingFeature = featureService.findById(id);
        if (existingFeature == null) {
            return ResponseEntity.notFound().build();
        }
        feature.setId(id);
        Feature updatedFeature = featureService.save(feature);
        return ResponseEntity.ok(updatedFeature);
    }


    @Operation(summary = "Eliminar una característica", description = "Permite eliminar una característica.")
    @ApiResponse(responseCode = "204", description = "Característica eliminada exitosamente.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeatureList(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}