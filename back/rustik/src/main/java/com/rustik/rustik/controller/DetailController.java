package com.rustik.rustik.controller;


import com.rustik.rustik.model.Detail;
import com.rustik.rustik.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/details")
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }

    @GetMapping
    public List<Detail> getAllDetails() {
        return detailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Detail> getDetailById(@PathVariable Long id) {
        Detail detail = detailService.findById(id);
        return detail != null ? ResponseEntity.ok(detail) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Detail createDetail(@RequestBody Detail detail) {
        return detailService.save(detail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Detail> updateDetail(@PathVariable Long id, @RequestBody Detail detail) {
        Detail existingDetail = detailService.findById(id);
        if (existingDetail == null) {
            return ResponseEntity.notFound().build();
        }
        detail.setId(id); // Asegúrate de que el ID sea correcto
        return ResponseEntity.ok(detailService.save(detail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        detailService.delete(id);
        return ResponseEntity.noContent().build();
    }
}