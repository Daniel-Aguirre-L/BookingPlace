package com.rustik.rustik.service;


import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.dto.ImageDTO;
import com.rustik.rustik.mapper.CabinMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.repository.CabinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;

    @Autowired
    public CabinService(CabinRepository cabinRepository) {
        this.cabinRepository = cabinRepository;
    }

    public List<Cabin> findAll() {
        return cabinRepository.findAll();
    }

    public Cabin findById(Long id) {
        return cabinRepository.findById(id).orElse(null);
    }

    public Cabin save(Cabin cabin) {
        return cabinRepository.save(cabin);
    }

    public void delete(Long id) {
        cabinRepository.deleteById(id);
    }

    public void saveCabins(List<Cabin> cabins) {
        cabinRepository.saveAll(cabins);
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
                    if (!cabin.getImages().isEmpty()) {
                        dto.setImages(Collections.singletonList(new ImageDTO(cabin.getImages().get(0).getUrl())));
                    }
                    return dto;
                }).collect(Collectors.toList());
    }
}
