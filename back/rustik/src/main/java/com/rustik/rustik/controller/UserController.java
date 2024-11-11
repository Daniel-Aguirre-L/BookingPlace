package com.rustik.rustik.controller;



import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;



    public static final Logger logger = Logger.getLogger(UserController.class);


    @GetMapping // queda para listar todos los users para el admin (user personal en my-user
    public ResponseEntity<List<UserDTO>> getUser (@RequestHeader("Authorization") String authHeader){



        if (tokenService.subjectIsAdmin(authHeader)){

             List<UserDTO> usersDTO = userService.findUsers().stream()
                    .map(UserMapper::toDTO).collect(Collectors.toList());

            return ResponseEntity.ok(usersDTO);

        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();


    }

    @GetMapping("/my-user")
    public ResponseEntity<UserDTO> getMyUser (@AuthenticationPrincipal CustomUserDetails userDetails){
        // Para los User endpoints devolver el nombre y el apellido por separado
        UserDTO myUser = UserMapper.userDetailsToUserDTO(userDetails);
        return ResponseEntity.ok(myUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser (@PathVariable Long id, @RequestHeader("Authorization") String authHeader, @RequestBody UserDTO userDTO ) {
        String subject = tokenService.subjectFromHeader(authHeader);


        Optional<User> userOptional = userService.findUserById(id);


        if (!userOptional.isPresent() || !userOptional.get().getUsername().equals(subject)) {
            


            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = UserMapper.toExistingEntity(userDTO, userOptional.get());


        User updatedUser = userService.updateUser(user);

        UserDTO updatedDTO = UserMapper.toDTO(updatedUser);


        return ResponseEntity.ok(updatedDTO);

    }






}
