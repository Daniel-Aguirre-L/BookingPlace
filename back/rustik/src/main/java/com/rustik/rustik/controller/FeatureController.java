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

    private final FeatureService featureService;

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

        Feature savedFeature = featureService.save(feature);
        return ResponseEntity.status(201).body(savedFeature);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeatureList(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}