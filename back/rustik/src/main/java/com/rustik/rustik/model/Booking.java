package com.rustik.rustik.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "cabin_id")
    @NonNull
    private Cabin cabin;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NonNull
    private User user;


    @NonNull
    private LocalDate initialDate;

    @NonNull
    private LocalDate endDate;



}
