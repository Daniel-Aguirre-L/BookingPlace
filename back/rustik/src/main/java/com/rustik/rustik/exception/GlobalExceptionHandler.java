package com.rustik.rustik.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();

        // Extraer solo los mensajes de error
        List<String> errorMessages = bindingResult.getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());

        return new ResponseEntity<>(errorMessages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> badRequest (BadRequestException bre){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("mensaje: " + bre.getMessage());
    }

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<String> notFound (NotFoundException nfe){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("mensaje: " + nfe.getMessage());
    }


}