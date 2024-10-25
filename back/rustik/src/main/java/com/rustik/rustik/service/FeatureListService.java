package com.rustik.rustik.service;


import com.rustik.rustik.model.FeatureList;
import com.rustik.rustik.repository.FeatureListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureListService {

    private final FeatureListRepository featureRepository;

    @Autowired
    public FeatureListService(FeatureListRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<FeatureList> findAll() {
        return featureRepository.findAll();
    }

    public FeatureList findById(Long id) {
        return featureRepository.findById(id).orElse(null);
    }

    public FeatureList save(FeatureList feature) {
        return featureRepository.save(feature);
    }

    public void delete(Long id) {
        featureRepository.deleteById(id);
    }
}