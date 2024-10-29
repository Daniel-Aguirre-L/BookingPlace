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


    //Se crea constructor especifico para data inicial manual.
    public Cabin(String name, String location, Integer capacity, String description, Double price) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
    }
}