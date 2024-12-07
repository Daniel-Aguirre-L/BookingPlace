package com.rustik.rustik.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    @NotBlank(message = "El nombre no puede estar en blanco")
    private String name;

    @NotBlank(message = "La ubicación no puede estar en blanco")
    private String location;

    @NotNull(message = "La capacidad no puede ser nula")
    @Min(value = 1, message = "La capacidad debe ser al menos 1")
    private Integer capacity;

    @Column(length = 500)
    @NotBlank(message = "La descripción no puede estar en blanco")
    private String description;

    @NotNull(message = "El precio no puede ser nulo")
    @Positive(message = "El precio debe ser un número positivo")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CabinCategory category; // Campo de categoría usando enum

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Detail> cabinFeatures = new ArrayList<>(); // Relación con CabinFeature

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Image> images = new ArrayList<>(); // Relación con Image

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "cabin", orphanRemoval = false)
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();

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

    public Cabin(Long id, String name, String location, Integer capacity, String description, Double price, CabinCategory category, List<Detail> cabinFeatures, List<Image> images) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
        this.category = category;
        this.cabinFeatures = cabinFeatures;
        this.images = images;
    }

    @Override
    public String toString() {
        return "Cabin{id=" + id + ", name='" + name + "', location='" + location + "', capacity=" + capacity + ", description='" + description + "', price=" + price + ", category=" + category + "}";
    }

}