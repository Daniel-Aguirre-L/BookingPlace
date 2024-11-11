package com.rustik.rustik.controller;


import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.service.DetailService;
import io.vavr.control.Either;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public List<DetailDTO> getAllDetails() {
        // Convertir la lista de detalles a DTOs
        return detailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) {
        DetailDTO detail = detailService.findById(id);
        return detail != null ? ResponseEntity.ok(detail) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createDetail(@RequestBody DetailDTO detailDto) {

        Either<List<String>, DetailDTO> result = detailService.save(detailDto);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                detail -> {
                    return ResponseEntity.status(HttpStatus.CREATED).body(detail);
                }
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDetail(@PathVariable Long id, @RequestBody DetailDTO detailDto) {

        detailDto.setId(id);

        Either<List<String>, DetailDTO> result = detailService.save(detailDto);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                ResponseEntity::ok
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        detailService.delete(id);
        return ResponseEntity.noContent().build();
    }

}