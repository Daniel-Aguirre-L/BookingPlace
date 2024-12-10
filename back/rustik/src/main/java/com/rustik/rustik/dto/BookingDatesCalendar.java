package com.rustik.rustik.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDatesCalendar {

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}
