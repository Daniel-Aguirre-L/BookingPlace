package com.rustik.rustik.controller;


import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.service.CabinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cabins")
public class CabinController {

    private final CabinService cabinService;

    @Autowired
    public CabinController(CabinService cabinService) {
        this.cabinService = cabinService;
    }

    @GetMapping
    public List<Cabin> getAllCabins() {
        return cabinService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cabin> getCabinById(@PathVariable Long id) {
        Cabin cabin = cabinService.findById(id);
        return cabin != null ? ResponseEntity.ok(cabin) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Cabin createCabin(@RequestBody Cabin cabin) {
        return cabinService.save(cabin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cabin> updateCabin(@PathVariable Long id, @RequestBody Cabin cabin) {
        Cabin existingCabin = cabinService.findById(id);
        if (existingCabin == null) {
            return ResponseEntity.notFound().build();
        }
        cabin.setId(id);
        return ResponseEntity.ok(cabinService.save(cabin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCabin(@PathVariable Long id) {
        cabinService.delete(id);
        return ResponseEntity.noContent().build();
    }
}