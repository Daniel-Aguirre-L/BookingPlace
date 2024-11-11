package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Detail;
import com.rustik.rustik.model.Feature;

public class DetailMapper {

    public static DetailDTO toDTO(Detail detail) {

        if(detail == null) {
            return null;
        }

        DetailDTO dto = new DetailDTO();
        dto.setId(detail.getId());
        dto.setCabinId(detail.getCabin().getId());
        dto.setFeatureId(detail.getFeature().getId());
        dto.setQuantity(detail.getQuantity());
        return dto;
    }

    public static Detail toEntity(DetailDTO detailDto, Cabin cabin) {
        Detail detail = new Detail();
        detail.setId(detailDto.getId());

        if(cabin == null) {
            cabin = new Cabin();
        }

        cabin.setId(detailDto.getCabinId());
        detail.setCabin(cabin);

        Feature feature = new Feature();
        feature.setId(detailDto.getFeatureId());
        detail.setFeature(feature);

        detail.setQuantity(detailDto.getQuantity());

        return detail;
    }

    public static Detail toEntity(DetailDTO detailDto) {
        return toEntity(detailDto, null);
    }
}