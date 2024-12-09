package com.rustik.rustik.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookingPageDto {

    private List<BookingDTO> content;
    private long totalElements;
    private int totalPages;
    private int pageNumber;
    private int pageSize;

}
