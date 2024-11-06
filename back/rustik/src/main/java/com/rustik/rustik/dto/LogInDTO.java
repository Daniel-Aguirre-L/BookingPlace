package com.rustik.rustik.dto;

import com.rustik.rustik.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LogInDTO {

    private String email;

    private String password;

    public LogInDTO (User user){
        this.email=user.getEmail();
        this.password = user.getPassword();
    }



}
