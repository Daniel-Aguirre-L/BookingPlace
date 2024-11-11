package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Feature;

public class DetailMapper {

    public static DetailDTO toDTO(Detail detail) {
        DetailDTO dto = new DetailDTO();
        dto.setId(detail.getId());
        dto.setFeatureId(detail.getFeature().getId());
        dto.setQuantity(detail.getQuantity());
        return dto;
    }

    public static Detail toDetail(DetailDTO detailDto, Cabin cabin, Feature feature) {

        return toExistingEntity(detailDto, new Detail(), cabin, feature);
    }

    public static Detail toExistingEntity(DetailDTO detailDto, Detail detail, Cabin cabin, Feature feature) {

        detail.setCabin(cabin);
        detail.setFeature(feature);
        detail.setQuantity(detailDto.getQuantity());

        return detail;
    }
}