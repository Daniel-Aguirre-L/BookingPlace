package com.rustik.rustik.controller;


import com.rustik.rustik.dto.FavoriteDTO;
import com.rustik.rustik.mapper.FavoriteMapper;
import com.rustik.rustik.model.Favorite;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;


    @GetMapping
    public ResponseEntity<FavoriteDTO> getFavorites (@AuthenticationPrincipal CustomUserDetails userDetails){
        User user = userDetails.getUser();
        List<Favorite> favorites = favoriteService.getFavoritesByUser(user);

        FavoriteDTO favoriteDTO = FavoriteMapper.toDTO(favorites);
        return ResponseEntity.ok(favoriteDTO);
    }


    @PostMapping ("/{id}")
    public ResponseEntity<String>addFavorite (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id){
        User user = userDetails.getUser();
        favoriteService.addCabinFavourite(user,id);
        return ResponseEntity.ok("Se ha guardado la cabaña en favoritos");
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<String> deleteFavorite (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id){
        User user = userDetails.getUser();
        favoriteService.deleteFavoriteCabin(user,id);
        return ResponseEntity.ok("Se ha eliminado la cabaña");

    }
}
