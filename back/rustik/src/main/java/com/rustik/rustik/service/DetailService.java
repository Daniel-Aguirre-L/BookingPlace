package com.rustik.rustik.service;


import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.mapper.DetailMapper;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Feature;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.DetailRepository;
import com.rustik.rustik.repository.FeatureRepository;
import io.vavr.control.Either;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DetailService {

    private final DetailRepository detailRepository;
    private final CabinRepository cabinRepository;
    private final FeatureRepository featureRepository;

    @Autowired
    public DetailService(DetailRepository detailRepository, CabinRepository cabinRepository, FeatureRepository featureRepository) {
        this.detailRepository = detailRepository;
        this.cabinRepository = cabinRepository;
        this.featureRepository = featureRepository;
    }

    public List<DetailDTO> findAll() {
        return detailRepository.findAll().stream().map(DetailMapper::toDTO).toList();
    }

    public DetailDTO findById(Long id) {
        return DetailMapper.toDTO(detailRepository.findById(id).orElse(null));
    }


    public Either<List<String>, DetailDTO> save(DetailDTO detailDto) {

        List<String> errors = new ArrayList<>();

        Detail existingDetail = null;

        if(detailDto.getId() != null && detailDto.getId() > 0) {
            existingDetail = detailRepository.findById(detailDto.getId()).orElse(null);

            if (existingDetail == null) {
                errors.add("Detalle no existente");
            }
        }

        if (!cabinRepository.existsById(detailDto.getCabinId())) {
            errors.add("Cabaña no existente");
        }

        if (!featureRepository.existsById(detailDto.getFeatureId())) {
            errors.add("Característica no existente");
        }

        if(!errors.isEmpty())
        {
            return Either.left(errors);
        }

        Detail detail = DetailMapper.toEntity(detailDto);

        return Either.right(DetailMapper.toDTO(detailRepository.save(detail)));
    }

    public List<Detail> save(Cabin cabin, List<DetailDTO> detailDtos) {
        List<Detail> details = new ArrayList<>();

        detailDtos.forEach(detailDTO -> {
            detailDTO.setCabinId(cabin.getId());
            Detail detail = DetailMapper.toEntity(detailDTO, cabin);
            detailRepository.save(detail);
            details.add(detail);
        });

        return details;
    }


    public void delete(Long id) {
        detailRepository.deleteById(id);
    }
}