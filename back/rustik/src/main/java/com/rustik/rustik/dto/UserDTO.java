package com.rustik.rustik.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
            message = "La password debe tener: \n *Mínimo 8 caracteres \n *Una mayúscula \n *Una minúscula \n *Un simbolo"
    )
    private String password;

    private String repeatPassword;

    private String country;

    private Boolean isAdmin;

}
