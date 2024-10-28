package com.rustik.rustik.model;


import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;



@Entity
@Data
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    private String imagePublicId;

    @ManyToOne // Relación muchos a uno con Cabin
    @JoinColumn(name = "cabin_id", nullable = false)
    private Cabin cabin; // Cabaña asociada


}