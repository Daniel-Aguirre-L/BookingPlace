package com.rustik.rustik.repository;


import com.rustik.rustik.model.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailRepository extends JpaRepository<Detail, Long> {
    boolean existsByCabinIdAndFeatureId(Long cabinId, Long featureId);

    List<Detail> findByFeatureId(Long id);
}