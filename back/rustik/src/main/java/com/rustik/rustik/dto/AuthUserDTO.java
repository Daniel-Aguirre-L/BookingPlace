package com.rustik.rustik.dto;

import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import lombok.Data;

@Data
public class AuthUserDTO {
    private Long id;

    private String name;

    private String token;

    private Boolean itsAdmin;

    public AuthUserDTO(User user, String token){
        this.id = user.getId();
        this.name = user.getName() + " " + user.getSurname();
        this.itsAdmin = user.getRole() == UserRole.ROLE_ADMIN;
        this.token = token;


    }
}
