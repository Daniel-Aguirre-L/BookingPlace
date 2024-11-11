package com.rustik.rustik.controller;

import com.rustik.rustik.dto.AuthUserDTO;
import com.rustik.rustik.dto.LogInDTO;
import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.EmailService;
import com.rustik.rustik.service.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO userDTO, @RequestParam(required = false) boolean resendConfirmationEmail) {

        User user = UserMapper.toEntity(userDTO);

        // Verificar si el correo no existe
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado.");
        }

        // Registrar al usuario
        AuthUserDTO authUserDTO = userService.registerUser(user);

        // Enviar correo de confirmación de registro
        emailService.sendRegistrationConfirmationEmail(user.getEmail(), user.getName());

        // Si se requiere reenviar el correo, lo hacemos
        if (resendConfirmationEmail) {
            return ResponseEntity.ok("El correo de confirmación ha sido reenviado.");
        }

        return ResponseEntity.ok(authUserDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUserDTO> logIn (@RequestBody LogInDTO logInDTO)  {

        try {
            AuthUserDTO authUserDTO = userService.logIn(logInDTO);

            return ResponseEntity.ok(authUserDTO);

        } catch (BadRequestException | NotFoundException e){
            throw e;
        }

    }

    @GetMapping("/validate-token")
    public ResponseEntity<AuthUserDTO> validateToken (@RequestHeader ("Authorization") String authHeader, @AuthenticationPrincipal CustomUserDetails userDetails){

        if (authHeader == null || !authHeader.startsWith("Bearer") || userDetails.getUser().getEmail() == null ){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String token = authHeader.replace("Bearer ","");


        return ResponseEntity.ok(new AuthUserDTO( userDetails.getUser(), token));
    }


    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin (@RequestHeader ("Authorization") String authHeader,@AuthenticationPrincipal CustomUserDetails userDetails){

        if (authHeader == null || !authHeader.startsWith("Bearer") || userDetails.getUser().getEmail() == null ){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(tokenService.subjectIsAdmin(authHeader));
    }


}
