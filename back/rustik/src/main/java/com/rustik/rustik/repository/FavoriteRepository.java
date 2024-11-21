package com.rustik.rustik.repository;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Favorite;
import com.rustik.rustik.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    void deleteByUserAndCabin (User user, Cabin cabin);


    Optional<Favorite> findByUserAndCabin(User user, Cabin cabin);
}
