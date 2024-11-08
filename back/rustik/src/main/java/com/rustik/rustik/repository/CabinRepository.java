package com.rustik.rustik.repository;


import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.CabinCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface CabinRepository extends JpaRepository<Cabin, Long> {

    List<Cabin> findAll();

    boolean existsByName (String name);

    List<Cabin> findByCategoryIn(List<CabinCategory> categories);
}
