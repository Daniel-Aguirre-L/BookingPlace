package com.rustik.rustik.controller;


import com.rustik.rustik.dto.FavoriteDTO;
import com.rustik.rustik.mapper.FavoriteMapper;
import com.rustik.rustik.model.Favorite;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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


    @Operation(summary = "List all favorite cabins",
            description = "Devuelve la lista de los favoritos del usuario autenticado.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Favoritos obtenidos correctamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
    })
    @GetMapping
    public ResponseEntity<FavoriteDTO> getFavorites (@AuthenticationPrincipal CustomUserDetails userDetails){
        User user = userDetails.getUser();
        List<Favorite> favorites = favoriteService.getFavoritesByUser(user);


        FavoriteDTO favoriteDTO = FavoriteMapper.toDTO(favorites);
        return ResponseEntity.ok(favoriteDTO);
    }


    @Operation(summary = "Add cabin to favorites",
            description = "Permite al usuario agregar una cabaña a su lista de favoritos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cabaña agregada a favoritos correctamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
    })
    @PostMapping ("/{id}")
    public ResponseEntity<String>addFavorite (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id){
        User user = userDetails.getUser();
        favoriteService.addCabinFavourite(user,id);
        return ResponseEntity.ok("Se ha guardado la cabaña en favoritos");
    }


    @Operation(summary = "Delete a cabin from favorites list",
            description = "Permite al usuario eliminar una cabaña de su lista de favoritos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cabaña eliminada de favoritos correctamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
    })
    @DeleteMapping ("/{id}")
    public ResponseEntity<String> deleteFavorite (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id){
        User user = userDetails.getUser();
        favoriteService.deleteFavoriteCabin(user,id);
        return ResponseEntity.ok("Se ha eliminado la cabaña");

    }
}
