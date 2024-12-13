package com.rustik.rustik.service;

import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Favorite;
import com.rustik.rustik.model.User;
import com.rustik.rustik.repository.CabinRepository;
import com.rustik.rustik.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private CabinRepository cabinRepository;


    public Boolean addCabinFavourite (User user, Long cabinId){

        Cabin cabin = cabinRepository.findById(cabinId).orElseThrow(() -> new NotFoundException("Cabaña no existe"));

        Optional<Favorite> existingFavorite = favoriteRepository.findByUserAndCabin(user,cabin);

        if(existingFavorite.isPresent()){
            return true;
        }

        Favorite favorite = new Favorite(user, cabin);

        favoriteRepository.save(favorite);

        return true;
    }

    public List<Favorite> getFavoritesByUser (User user){
        return favoriteRepository.findByUser(user);
    }

    public Boolean deleteFavoriteCabin (User user, Long cabinId){

        Cabin cabin = cabinRepository.findById(cabinId).orElseThrow(() -> new NotFoundException("Cabaña no existe"));
        List<Favorite> favorites = favoriteRepository.findAllByUserAndCabin(user,cabin);
        for (Favorite favorite : favorites) {
            favoriteRepository.delete(favorite);
        }

        return true;
    }



}
