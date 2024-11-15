package com.rustik.rustik.service;


import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Feature;
import com.rustik.rustik.repository.DetailRepository;
import com.rustik.rustik.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;
    private final DetailRepository detailRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository, DetailRepository detailRepository) {
        this.featureRepository = featureRepository;
        this.detailRepository = detailRepository;
    }

    public List<Feature> findAll() {
        return featureRepository.findAll();
    }

    public Feature findById(Long id) {
        return featureRepository.findById(id).orElse(null);
    }

    public Feature save(Feature feature) {
        return featureRepository.save(feature);
    }

    public void delete(Long id) {
        List<Detail> details = detailRepository.findByFeatureId(id);
        detailRepository.deleteAll(details);
        featureRepository.deleteById(id);
    }

    public void save(List<Feature> features) {
        featureRepository.saveAll(features);
    }
}