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

    @Column(unique = true)
    private String name;
    private String location;
    private Integer capacity;

    @Column(length = 500)
    private String description;
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CabinCategory category; // Campo de categoría usando enum

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Detail> cabinFeatures = new ArrayList<>(); // Relación con CabinFeature

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>(); // Relación con Image


    public Cabin(String name, String location, Integer capacity, String description, Double price, CabinCategory category) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    public Cabin(String name, String location, Integer capacity, String description, Double price, CabinCategory category, List<Image> images) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
        this.category = category;
        this.images = images;
    }

    public Cabin(String name, String location, Integer capacity, String description, Double price, CabinCategory category, List<Image> images, List<Detail> cabinFeatures) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
        this.category = category;
        this.images = images;
        this.cabinFeatures = cabinFeatures;
    }

}