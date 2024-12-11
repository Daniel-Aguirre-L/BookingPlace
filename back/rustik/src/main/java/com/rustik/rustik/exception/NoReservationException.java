package com.rustik.rustik.exception;

public class NoReservationException extends RuntimeException {
    public NoReservationException(String message) {
        super(message);
    }
}