package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    private String name;

    private String surname;

    private String mail;

    private String telefono;

    private String password;

    private String repeatPassword;

    private Boolean itsAdmin;

    private String pais;

}
