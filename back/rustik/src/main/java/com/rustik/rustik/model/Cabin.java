package com.rustik.rustik.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Cabin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private Integer capacity;
    private String description;
    private Double price;

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Detail> cabinFeatures = new ArrayList<>(); // Relación con CabinFeature

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>(); // Relación con Image
}