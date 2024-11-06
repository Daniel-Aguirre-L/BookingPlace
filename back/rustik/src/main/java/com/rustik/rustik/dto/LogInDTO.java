package com.rustik.rustik.dto;

import com.rustik.rustik.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LogInDTO {

    private String mail;

    private String password;

    public LogInDTO (User user){
        this.mail=user.getMail();
        this.password = user.getPassword();
    }



}
