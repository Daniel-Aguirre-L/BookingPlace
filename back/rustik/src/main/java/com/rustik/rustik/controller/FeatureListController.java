package com.rustik.rustik.controller;



import com.rustik.rustik.model.FeatureList;
import com.rustik.rustik.service.FeatureListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feature-lists")
public class FeatureListController {

    private final FeatureListService featureListService;

    @Autowired
    public FeatureListController(FeatureListService featureListService) {
        this.featureListService = featureListService;
    }

    @GetMapping
    public List<FeatureList> getAllFeatureLists() {
        return featureListService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureList> getFeatureListById(@PathVariable Long id) {
        FeatureList featureList = featureListService.findById(id);
        return featureList != null ? ResponseEntity.ok(featureList) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public FeatureList createFeatureList(@RequestBody FeatureList featureList) {
        return featureListService.save(featureList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeatureList> updateFeatureList(@PathVariable Long id, @RequestBody FeatureList featureList) {
        FeatureList existingFeatureList = featureListService.findById(id);
        if (existingFeatureList == null) {
            return ResponseEntity.notFound().build();
        }
        featureList.setId(id); // Asegúrate de que el ID sea correcto
        return ResponseEntity.ok(featureListService.save(featureList));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeatureList(@PathVariable Long id) {
        featureListService.delete(id);
        return ResponseEntity.noContent().build();
    }
}