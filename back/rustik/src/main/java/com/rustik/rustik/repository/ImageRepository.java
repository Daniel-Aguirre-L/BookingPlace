package com.rustik.rustik.repository;


import com.rustik.rustik.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByCabinId(Long cabinId);
}