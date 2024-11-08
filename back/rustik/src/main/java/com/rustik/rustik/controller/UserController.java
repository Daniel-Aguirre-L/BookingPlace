package com.rustik.rustik.controller;



import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping ("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;



    public static final Logger logger = Logger.getLogger(UserController.class);


    @GetMapping
    public ResponseEntity<UserDTO> getUser (@RequestHeader("Authorization") String authHeader){

        String subject = tokenService.subjecjFromHeader(authHeader);

        User user = userService.findUserByEmail(subject).get();

        UserDTO userDTO = UserMapper.toDTO(user);


        return ResponseEntity.ok(userDTO);


    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser (@PathVariable Long id, @RequestHeader("Authorization") String authHeader, @RequestBody UserDTO userDTO ) {
        String subject = tokenService.subjecjFromHeader(authHeader);


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
