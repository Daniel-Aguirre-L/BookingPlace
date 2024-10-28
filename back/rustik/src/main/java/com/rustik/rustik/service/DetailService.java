package com.rustik.rustik.service;


import com.rustik.rustik.model.Detail;
import com.rustik.rustik.repository.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailService {

    private final DetailRepository detailRepository;

    @Autowired
    public DetailService(DetailRepository detailRepository) {
        this.detailRepository = detailRepository;
    }

    public List<Detail> findAll() {
        return detailRepository.findAll();
    }

    public Detail findById(Long id) {
        return detailRepository.findById(id).orElse(null);
    }

    public Detail save(Detail detail) {
        return detailRepository.save(detail);
    }

    public void delete(Long id) {
        detailRepository.deleteById(id);
    }
}