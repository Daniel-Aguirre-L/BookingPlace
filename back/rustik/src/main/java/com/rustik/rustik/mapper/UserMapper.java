package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;

public class UserMapper {

    public static UserDTO toDTO (User user){
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName() + " " + user.getSurname());
        dto.setMail(user.getMail());
        dto.setPais(user.getPais());
        dto.setTeléfono(user.getTelefono());
        dto.setItsAdmin(user.getRole()== UserRole.ROLE_ADMIN);

        return dto;

    }


    public static User toEntity (UserDTO dto) {
        User user = new User();


        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setMail(dto.getMail());
        if (dto.getPassword().equals(dto.getRepeatPassword())) {
            user.setPassword(dto.getPassword());
        } else {
            throw new RuntimeException("Las contraseñas no coinciden");
        }
        user.setTelefono(dto.getTelefono());
        user.setPais(dto.getPais());
        user.setRole(dto.getItsAdmin()? UserRole.ROLE_ADMIN : UserRole.ROLE_USER);

        return user;
    }



}
