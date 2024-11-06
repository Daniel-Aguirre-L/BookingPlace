package com.rustik.rustik.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private String password;

    private String repeatPassword;

    private String country;

    private Boolean isAdmin;

}
