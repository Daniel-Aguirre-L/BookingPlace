package com.rustik.rustik.service;


import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.repository.CabinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}