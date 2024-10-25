package com.rustik.rustik.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class FeatureList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String featureName; // Nombre de la característica

    @ManyToMany(mappedBy = "features")
    private List<Detail> details; // Relación inversa con Detail
}