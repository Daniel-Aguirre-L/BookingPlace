package com.rustik.rustik.controller;



import com.rustik.rustik.model.Feature;
import com.rustik.rustik.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/features")
public class FeatureController {

    private final FeatureService featureService; // Corrección del nombre de la variable

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public List<Feature> getAllFeatureLists() {
        return featureService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> getFeatureListById(@PathVariable Long id) {
        Feature feature = featureService.findById(id);
        return feature != null ? ResponseEntity.ok(feature) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {
        // Aquí puedes agregar validaciones
        Feature savedFeature = featureService.save(feature);
        return ResponseEntity.status(201).body(savedFeature); // Retorna un estado 201 para recurso creado
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeatureList(@PathVariable Long id, @RequestBody Feature feature) {
        Feature existingFeature = featureService.findById(id);
        if (existingFeature == null) {
            return ResponseEntity.notFound().build();
        }
        feature.setId(id); // Asegúrate de que el ID sea correcto
        Feature updatedFeature = featureService.save(feature);
        return ResponseEntity.ok(updatedFeature); // Retorna el objeto actualizado
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeatureList(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build(); // Retorna un estado 204 para no contenido
    }
}