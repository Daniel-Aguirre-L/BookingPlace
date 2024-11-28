package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.dto.FavoriteDTO;
import com.rustik.rustik.model.Favorite;

import java.util.List;

public class FavoriteMapper {

    public static FavoriteDTO toDTO (List<Favorite> favorites){

        if (favorites == null || favorites.isEmpty()) {
            return new FavoriteDTO(null);
        }

        FavoriteDTO favoriteDTO = new FavoriteDTO(favorites.get(0).getUser().getId());

        for (Favorite favorite : favorites) {

            CabinDTO cabinDTO = CabinMapper.toDTO(favorite.getCabin());

            favoriteDTO.getCabinDTOS().add(cabinDTO);



        }

        return favoriteDTO;
    }
}
