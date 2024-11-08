package com.rustik.rustik.controller;

import com.rustik.rustik.dto.AuthUserDTO;
import com.rustik.rustik.dto.LogInDTO;
import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<AuthUserDTO> registrerUser (@RequestBody UserDTO userDTO){

        User user = UserMapper.toEntity(userDTO);
        if (!userService.findUserByEmail(user.getEmail()).isPresent() && user.getPassword() != null){
            AuthUserDTO authUserDTO = userService.registerUser(user);
            return ResponseEntity.ok(authUserDTO);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthUserDTO> logIn (@RequestBody LogInDTO logInDTO){

        try {
            AuthUserDTO authUserDTO = userService.logIn(logInDTO);

            return ResponseEntity.ok(authUserDTO);

        } catch (RuntimeException e){
            throw new RuntimeException( e);
        }

    }

    @GetMapping("/validate-token")
    public ResponseEntity<AuthUserDTO> validateToken (@RequestHeader ("Authorization") String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String token = authHeader.replace("Bearer ","");
        String email = tokenService.getTokenEmail(token);
        User user = userService.findUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(new AuthUserDTO( user, token));
    }


}
