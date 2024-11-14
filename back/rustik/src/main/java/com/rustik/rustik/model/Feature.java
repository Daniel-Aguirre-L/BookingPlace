package com.rustik.rustik.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String icon;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean hasQuantity = false;

    public Feature(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    public Feature(String name, String icon, Boolean hasQuantity) {
        this.name = name;
        this.icon = icon;
        this.hasQuantity = hasQuantity;
    }


}