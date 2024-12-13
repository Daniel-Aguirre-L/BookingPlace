package com.rustik.rustik.repository;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Favorite;
import com.rustik.rustik.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    void deleteByUserAndCabin (User user, Cabin cabin);

    void deleteById(Long id);



    Optional<Favorite> findByUserAndCabin(User user, Cabin cabin);
    List<Favorite> findAllByUserAndCabin(User user, Cabin cabin);
}
