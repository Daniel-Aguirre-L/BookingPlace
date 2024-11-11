package com.rustik.rustik.controller;


import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
import io.vavr.control.Either;
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
    public CabinController(CabinService cabinService, ImageService imageService) {
        this.cabinService = cabinService;
    }


    @GetMapping
    public List<CabinDTO> getAllCabins() {
        return cabinService.findAll().stream()
                .map(CabinMapper::toDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public ResponseEntity<CabinDTO> getCabinById(@PathVariable Long id) {
        Cabin cabin = cabinService.findById(id);
        if (cabin == null) {
            return ResponseEntity.notFound().build();
        }
        CabinDTO cabinDTO = CabinMapper.toDTO(cabin);
        return ResponseEntity.ok(cabinDTO);
    }

    @GetMapping("/random")
    //Llama 10 cabañas random con su primera imagen
    public ResponseEntity<List<CabinDTO>> getRandomCabins(@RequestParam(defaultValue = "10") int count) {
        List<CabinDTO> randomCabins = cabinService.getRandomCabins(count);
        return ResponseEntity.ok(randomCabins);
    }

    @PostMapping
    public ResponseEntity<?> createCabin(@ModelAttribute CabinDTO cabinDTO) {
        Either<List<String>, CabinDTO> result = cabinService.save(cabinDTO);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                cabin -> {
                    return ResponseEntity.status(HttpStatus.CREATED).body(cabin);
                }
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCabin(@PathVariable Long id, @ModelAttribute CabinDTO cabinDTO) {

        cabinDTO.setId(id);

        Either<List<String>, CabinDTO> result = cabinService.save(cabinDTO);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                cabin -> {
                    return ResponseEntity.status(HttpStatus.CREATED).body(cabin);
                }
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCabin(@PathVariable Long id) {
        cabinService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CabinDTO>> getCabinsByCategories(@RequestParam List<CabinCategory> categories) {
        List<CabinDTO> cabins = cabinService.getCabinsByCategories(categories);
        if (cabins.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cabins);
    }
}