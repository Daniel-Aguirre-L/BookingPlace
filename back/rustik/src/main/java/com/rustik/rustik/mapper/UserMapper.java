package com.rustik.rustik.mapper;

import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.security.CustomUserDetails;

public class UserMapper {

    public static UserDTO toDTO (User user){
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setEmail(user.getEmail());
        dto.setCountry(user.getCountry());
        dto.setPhone(user.getPhone());
        dto.setIsAdmin(user.getRole()== UserRole.ROLE_ADMIN);

        return dto;

    }


    public static User toEntity (UserDTO dto) {
        User user = new User();

        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        if (dto.getPassword().equals(dto.getRepeatPassword())) {
            user.setPassword(dto.getPassword());
        } else {
            throw new RuntimeException("Las contraseñas no coinciden");
        }
        user.setPhone(dto.getPhone());
        user.setCountry(dto.getCountry());
        user.setRole(UserRole.ROLE_USER);


        return user;
    }

    public static User toExistingEntity (UserDTO dto, User user) {

        if(dto.getName() != null){
                user.setName(dto.getName());
        }
        if(dto.getSurname() != null){
            user.setSurname(dto.getSurname());
        }
        if (dto.getPhone()!= null){
            user.setPhone(dto.getPhone());
        }
        if (dto.getPassword() != null ) {
            if (dto.getPassword().equals(dto.getRepeatPassword())) {
                user.setPassword(dto.getPassword());
            } else {
                throw new BadRequestException("Las contraseñas no coinciden");
            }
        }else{
            user.setPassword(null);
        }
        if (dto.getCountry() != null){
            user.setCountry(dto.getCountry());
        }

        return user;
    }


    public static UserDTO userDetailsToUserDTO (CustomUserDetails userDetails) {
        UserDTO user = new UserDTO();
        user.setId(userDetails.getUser().getId());
        user.setName(userDetails.getUser().getName());
        user.setSurname(userDetails.getUser().getSurname());
        user.setEmail(userDetails.getUser().getEmail());
        user.setPhone(userDetails.getUser().getPhone());
        user.setCountry(userDetails.getUser().getCountry());
        user.setIsAdmin(userDetails.getUser().getRole() == UserRole.ROLE_ADMIN);
        return user;
    }



}
