package com.rustik.rustik.service;

import com.rustik.rustik.dto.CabinDTO;

import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.*;
import com.rustik.rustik.repository.BookingRepository;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.DetailRepository;
import com.rustik.rustik.repository.FeatureRepository;
import io.vavr.control.Either;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;

    private final BookingRepository bookingRepository;
    private final ImageService imageService;
    private final DetailService detailService;
    private final FeatureRepository featureRepository;


    @Autowired
    public CabinService(CabinRepository cabinRepository,BookingRepository bookingRepository, ImageService imageService, DetailService detailService, FeatureRepository featureRepository) {
        this.cabinRepository = cabinRepository;
        this.bookingRepository = bookingRepository;
        this.imageService = imageService;
        this.detailService = detailService;
        this.featureRepository = featureRepository;
    }

    public List<Cabin> findAll() {
        return cabinRepository.findAll();
    }

    public Cabin findById(Long id) {
        return cabinRepository.findById(id).orElse(null);
    }

    @Transactional
    public Either<List<String>, CabinDTO> save(CabinDTO cabinDTO) {
        List<String> errors = new ArrayList<>();

        // Validar que se hayan subido al menos 5 imágenes
        if (cabinDTO.getId() == null ) {
            if (cabinDTO.getImagesToUpload() == null || cabinDTO.getImagesToUpload().size() < 5) {
                errors.add("No se han subido al menos 5 imágenes.");
            }else{
                int imageCount = 1;
                for (MultipartFile image : cabinDTO.getImagesToUpload()) {
                    if (image.isEmpty() || image.getName().isEmpty()) {
                        errors.add("Imagen No. " + imageCount + " no es válida");
                    }
                    imageCount++;
                }
            }

        }

        // Validar si la cabaña ya existe
        if (cabinDTO.getId() == null && cabinRepository.existsByName(cabinDTO.getName())) {
            errors.add("La cabaña con nombre " + cabinDTO.getName() + " ya existe.");
        }

        // Traer la cabaña existente o null
        Cabin currentCabin;
        if(cabinDTO.getId() != null && cabinDTO.getId() > 0) {
            currentCabin = cabinRepository.findById(cabinDTO.getId()).orElse(null);
            if (currentCabin == null) {
                errors.add("Cabaña no existente");
            }

        }else {
            currentCabin = null;
        }


        // Comprobar que las características existan
        if(cabinDTO.getCabinFeatures() != null){
            cabinDTO.getCabinFeatures().forEach(detailDTO -> {
                if(detailDTO.getFeatureId() != null && !featureRepository.existsById(detailDTO.getFeatureId()))
                {
                    errors.add("La característica con id " + detailDTO.getFeatureId() + " no existe");
                }
            });
        }


        if(!errors.isEmpty())
        {
            return Either.left(errors);
        }

        // Guardar la cabaña
        Cabin savedCabin;

        if (currentCabin != null) {
            savedCabin = cabinRepository.save(CabinMapper.toExistingEntity(currentCabin, cabinDTO));

        }else{
            savedCabin = cabinRepository.save(CabinMapper.toEntity(cabinDTO));
        }

        // Subir imágenes y guardar imagenes

        if (cabinDTO.getImagesToUpload() != null && cabinDTO.getImagesToUpload().size() > 0) {
            try {
                List<Image> imageUrls = imageService.uploadImages(savedCabin, cabinDTO.getImagesToUpload());
                if (currentCabin == null ) {
                    savedCabin.setImages(imageUrls);
                }

            } catch (Exception e) {
                throw new RuntimeException("Error al subir las imágenes: " + e.getMessage());
            }
        }



        //Crear los detalles
        if (cabinDTO.getCabinFeatures() != null && cabinDTO.getCabinFeatures().size() > 0) {
            cabinDTO.setCabinFeatures(removeDuplicateFeaturesKeepLast(cabinDTO.getCabinFeatures()));
            try {
                if (currentCabin != null) {
                    //Borra las caracteristicas y las crea nuevamente
                    currentCabin.getCabinFeatures().clear();
                    List<Detail> newDetails = detailService.save(savedCabin, cabinDTO.getCabinFeatures());
                    savedCabin = new Cabin(savedCabin.getId(), savedCabin.getName(), savedCabin.getLocation(), savedCabin.getCapacity(), savedCabin.getDescription(), savedCabin.getPrice(), savedCabin.getCategory(), newDetails, savedCabin.getImages());

                }else{
                    List<Detail> newDetails = detailService.save(savedCabin, cabinDTO.getCabinFeatures());
                    savedCabin.setCabinFeatures(newDetails);
                }
            } catch (Exception e) {
                throw new RuntimeException("Error al guardar las características: " + e.getMessage());
            }
        }

        // Convertir la entidad de la cabaña guardada en un DTO
        CabinDTO savedCabinDTO = CabinMapper.toDTO(savedCabin);

        // Devolver respuesta exitosa con el DTO
        return Either.right(savedCabinDTO);
    }

    @Transactional
    public void deleteWithCancellationLogic(Long cabinId) {
        // Buscar la cabaña por su ID
        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() -> new NotFoundException("Cabaña no encontrada"));

        List<Booking> bookings = bookingRepository.findByCabin(cabin)
                .orElse(Collections.emptyList());

        for (Booking booking : bookings) {
            booking.setState(BookingState.CANCELADA);
            booking.setCabin(null);
            bookingRepository.save(booking);
        }

        // Eliminar la cabaña
        cabinRepository.delete(cabin);
    }

    public List<Cabin> saveCabins(List<Cabin> cabins) {
        return cabinRepository.saveAll(cabins);
    }

    public List<CabinDTO> getRandomCabins(int count) {
        List<Cabin> allCabins = cabinRepository.findAll();
        Collections.shuffle(allCabins); // Mezcla la lista de cabañas


        List<Cabin> randomCabins = allCabins.stream()
                .limit(count)
                .collect(Collectors.toList());

        return randomCabins.stream()
                .map(cabin -> {
                    CabinDTO dto = CabinMapper.toDTO(cabin);
                    return dto;
                }).collect(Collectors.toList());
    }

    public List<CabinDTO> getCabinsByCategories(List<CabinCategory> categories) {
        List<Cabin>cabins = cabinRepository.findByCategoryIn(categories);
        return cabins.stream()
                .map(cabin -> {
                    CabinDTO dto = CabinMapper.toDTO(cabin);
                    return dto;
                }).collect(Collectors.toList());
    }
    public List<CabinDTO> getCabinsByName(String name) {
        List<Cabin> cabins = cabinRepository.findByNameContaining(name);
        return cabins.stream()
                .map(cabin -> CabinMapper.toDTO(cabin))
                .collect(Collectors.toList());
    }


    public List<DetailDTO> removeDuplicateFeaturesKeepLast(List<DetailDTO> details) {
        Map<Long, DetailDTO> map = new LinkedHashMap<>();
        for (DetailDTO detail : details) {
            if(detail.getFeatureId() == null) continue;
            map.put(detail.getFeatureId(), detail);
        }
        return new ArrayList<>(map.values());
    }


    public List<Cabin> findCabinsByDate (LocalDate inicialDate, LocalDate endDate){
        return cabinRepository.findCabinsByDates(inicialDate,endDate);
    }

    public List<Cabin> findCabinsByFilters (String searchTerm, LocalDate inicialDate, LocalDate endDate){
        return cabinRepository.findCabinsByFilters(searchTerm, inicialDate, endDate);
    }

}
