package com.rustik.rustik.repository;

import com.rustik.rustik.model.FeatureList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureListRepository extends JpaRepository<FeatureList, Long> {

}