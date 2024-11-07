package com.rustik.rustik.controller;


import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
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
    private final ImageService imageService;

    @Autowired
    public CabinController(CabinService cabinService, ImageService imageService) {
        this.cabinService = cabinService;
        this.imageService = imageService;
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
    public ResponseEntity<CabinDTO> createCabin(@ModelAttribute CabinDTO cabinDTO) {
        // Validar que se hayan subido al menos 5 imágenes
        if (cabinDTO.getImagesToUpload() == null || cabinDTO.getImagesToUpload().size() < 5 || cabinService.cabinExistByName(cabinDTO.getName())) {
            return ResponseEntity.badRequest().body(null); //
        }

        // Guardar cabaña sin imágenes
        Cabin cabin = CabinMapper.toEntity(cabinDTO);

            Cabin savedCabin = cabinService.save(cabin);


            // Subir imágenes y obtener URLs
            List<Image> imageUrls = imageService.uploadImages(savedCabin.getId(), cabinDTO.getImagesToUpload());
            savedCabin.setImages(imageUrls);
            CabinDTO savedCabinDTO = CabinMapper.toDTO(savedCabin);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCabinDTO);


    }

    @PutMapping("/{id}")
    public ResponseEntity<CabinDTO> updateCabin(@PathVariable Long id, @ModelAttribute CabinDTO cabinDTO) {

        Cabin existingCabin = cabinService.findById(id);
        if (existingCabin == null) {
            return ResponseEntity.notFound().build();
        }
        if( cabinService.cabinExistByName(cabinDTO.getName())){
            return ResponseEntity.badRequest().build();
        }

        System.out.println(cabinDTO.toString());


        cabinDTO.setId(id);

        Cabin updateCabin = CabinMapper.toExtingEntity(cabinDTO,existingCabin);

        if (cabinDTO.getImagesToUpload().size()>0){
            imageService.uploadImages(id, cabinDTO.getImagesToUpload());
        }

            Cabin savedCabin = cabinService.save(updateCabin);


            CabinDTO savedCabinDTO = CabinMapper.toDTO(savedCabin);

            return ResponseEntity.ok(savedCabinDTO);

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