package com.rustik.rustik.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
public class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cabin_id", nullable = false)
    private Cabin cabin; // Relación con Cabin

    @ManyToOne
    @JoinColumn(name = "feature_id", nullable = false)
    private Feature feature; // Relación con Feature

    private Integer quantity;
}