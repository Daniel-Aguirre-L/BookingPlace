package com.rustik.rustik.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FavoriteDTO {

    private Long userId;
    private List<CabinDTO> cabinDTOS;


    public FavoriteDTO(Long id){
        this.userId = id;
        this.cabinDTOS = new ArrayList<>();
    }

}
