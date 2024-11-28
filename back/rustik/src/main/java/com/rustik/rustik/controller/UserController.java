package com.rustik.rustik.controller;



import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.exception.UnauthorizedException;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.EmailService;
import com.rustik.rustik.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private EmailService emailService;


    public static final Logger logger = Logger.getLogger(UserController.class);


    @Operation(summary = "List all users (Admin only)", description = "Lista todos los usuarios registrados")
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente."),
            @ApiResponse(responseCode = "400", description = "Usuario no autorizado."),
    }    )

    @GetMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<List<UserDTO>> getUser (){

        List<UserDTO> usersDTO = userService.findUsers().stream()
                .map(UserMapper::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(usersDTO);

    }

    @Operation(summary = "Get details of the authenticated user", description = "Devuelve la información del usuario logeado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Detalles del usuario obtenidos exitosamente."),
            @ApiResponse(responseCode = "401", description = "No autenticado.")
    })
    @GetMapping("/my-user")
    public ResponseEntity<UserDTO> getMyUser (@AuthenticationPrincipal CustomUserDetails userDetails){
        UserDTO myUser = UserMapper.userDetailsToUserDTO(userDetails);
        return ResponseEntity.ok(myUser);
    }

    @Operation(summary = "Update user details", description = "Permite acutlaizar los datos del usuario. \n " +
            "Para modificar la contraseña debe enviarse de la misma forma que en el registro. \n" +
            "En caso de ser solicitado por un admin, puede modificar tambien el rol enviando 'isAdmin': true")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente."),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta o error en los datos."),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado."),
            @ApiResponse(responseCode = "403", description = "No autorizado para realizar esta acción.")
    })
    @SecurityRequirement(name = "bearer")
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser (@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody @Valid UserDTO userDTO ) throws NotFoundException {
        Optional<User> userOptional = userService.findUserById(id);
        if (!userOptional.isPresent() || !userOptional.get().getIsActive()) {
            throw new NotFoundException("Usuario no existe");
        }

        String currentPassword =  userOptional.get().getPassword();
        User user = UserMapper.toExistingEntity(userDTO, userOptional.get());
        //si el put lo hace un admin, puede hacer admin o quitar privilegio de admin al user.

        if (userDetails.getIsAdmin()) {
            if (userDTO.getIsAdmin() != null) {
                user.setRole(userDTO.getIsAdmin() ? UserRole.ROLE_ADMIN : UserRole.ROLE_USER);


            }
        }else {
            if (userDetails.getUser().getId() != id) {
                throw new BadRequestException("Usuario no autorizado");
            }
        }

        if (user.getPassword()!= null) {
            user.setPassword(userService.encodePassword(user.getPassword()));
        }else{
            user.setPassword(currentPassword);
        }


        User updatedUser = userService.updateUser(user);

        // Si el admin se auto-revoca, forzar cierre de sesión
        if (userDetails.getIsAdmin() && userDetails.getUser().getId().equals(id) && !userDTO.getIsAdmin()) {

            throw new UnauthorizedException("Tu rol ha cambiado. Por favor, cierra sesión e inicia nuevamente.");
        }
        UserDTO updatedDTO = UserMapper.toDTO(updatedUser);
        return ResponseEntity.ok(updatedDTO);
    }


    @Operation(
            summary = "Delete user (Only for admin)",
            description = "Este endpoint elimina un usuario."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario eliminado correctamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud no autorizada"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado: el usuario no tiene permisos suficientes")
    })
    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
            Optional<User> user = userService.findUserById(id);
            if (user.isPresent()){
                userService.deleteLogic(user.get());
                return ResponseEntity.ok("Usuario eliminado");
            }
            throw new NotFoundException("usuario no existe");
    }

    @GetMapping("/confirmation-email")
    public String resendConfirmationEmail(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try{
            emailService.sendRegistrationConfirmationEmail(userDetails.getUser().getEmail(), userDetails.getUser().getName());
            return "email enviado a " + userDetails.getUser().getEmail();
        }catch (Exception e){
            throw new BadRequestException("no autorizado");
        }
    }


}
