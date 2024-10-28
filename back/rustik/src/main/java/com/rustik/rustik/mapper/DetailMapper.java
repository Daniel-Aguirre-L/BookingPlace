package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.model.Detail;

public class DetailMapper {

    public static DetailDTO toDTO(Detail detail) {
        DetailDTO dto = new DetailDTO();
        dto.setId(detail.getId());
        dto.setFeatureId(detail.getFeature().getId());
        dto.setFeatureName(detail.getFeature().getName());
        dto.setQuantity(detail.getQuantity());
        return dto;
    }
}