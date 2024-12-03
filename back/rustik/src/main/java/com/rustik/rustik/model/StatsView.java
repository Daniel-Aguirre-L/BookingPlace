package com.rustik.rustik.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "stats_view")
public class StatsView {
    @Id
    private String id;

    private String group;

    private String description;

    private Double val1;

    private Long itemId;

    private Double val2;


}
