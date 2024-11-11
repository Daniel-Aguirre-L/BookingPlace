package com.rustik.rustik.controller;



import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.mapper.UserMapper;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.security.CustomUserDetails;
import com.rustik.rustik.security.TokenService;
import com.rustik.rustik.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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


    @Operation(summary = "List all users (Admin only)", description = "Lista todos los usuarios registrados")
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente."),
            @ApiResponse(responseCode = "400", description = "Usuario no autorizado."),
    }    )
    @GetMapping
    public ResponseEntity<List<UserDTO>> getUser (@RequestHeader("Authorization") String authHeader){



        if (tokenService.subjectIsAdmin(authHeader)){

             List<UserDTO> usersDTO = userService.findUsers().stream()
                    .map(UserMapper::toDTO).collect(Collectors.toList());

            return ResponseEntity.ok(usersDTO);

        }


        throw new BadRequestException("Usuario no autorizado");



    }

    @Operation(summary = "Get details of the authenticated user", description = "Devuelve la información del usuario logeado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Detalles del usuario obtenidos exitosamente."),
            @ApiResponse(responseCode = "401", description = "No autenticado.")
    })
    @GetMapping("/my-user")
    public ResponseEntity<UserDTO> getMyUser (@AuthenticationPrincipal CustomUserDetails userDetails){
        // Para los User endpoints devolver el nombre y el apellido por separado
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
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser (@PathVariable Long id, @RequestHeader("Authorization") String authHeader, @RequestBody UserDTO userDTO ) throws NotFoundException {


        Optional<User> userOptional = userService.findUserById(id);


        if (!userOptional.isPresent()) {
            


            throw new NotFoundException("Usuario no existe");
        }

        User user = UserMapper.toExistingEntity(userDTO, userOptional.get());


        //si el put lo hace un admin, puede hacer admin o quitar privilegio de admin al user.
        if (tokenService.subjectIsAdmin(authHeader)){
            if (userDTO.getIsAdmin()){
                user.setRole(UserRole.ROLE_ADMIN);
            } else{ user.setRole(UserRole.ROLE_USER);
            }

        }



        User updatedUser = userService.updateUser(user);

        UserDTO updatedDTO = UserMapper.toDTO(updatedUser);


        return ResponseEntity.ok(updatedDTO);

    }
    






}
