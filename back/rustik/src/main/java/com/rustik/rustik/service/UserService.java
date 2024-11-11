package com.rustik.rustik.service;

import com.rustik.rustik.dto.AuthUserDTO;
import com.rustik.rustik.dto.LogInDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.exception.NotFoundException;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.repository.UserRepository;
import com.rustik.rustik.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder encoder;



    public AuthUserDTO registerUser (User user){
        String codedPass = encoder.encode(user.getPassword());
        String upperName = user.getName().toUpperCase();
        String upperSurname = user.getSurname().toUpperCase();

        user.setPassword(codedPass);
        user.setName(upperName);
        user.setSurname(upperSurname);

        User savedUser = userRepository.save(user);

        String token = tokenService.generateToken(savedUser);
        return new AuthUserDTO(savedUser, token);
    }


    public Optional<User> findUserById (Long id) {
        return userRepository.findById(id);
    }

    public AuthUserDTO logIn (LogInDTO logInDTO) throws NotFoundException, BadRequestException {

        User user = userRepository.findByEmail(logInDTO.getEmail())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        if (!encoder.matches(logInDTO.getPassword(), user.getPassword())) {
            throw new BadRequestException("Credenciales incorrectas");
        }


        String token = tokenService.generateToken(user);
        return new AuthUserDTO(user, token);
    }


    public List<User> findUsers (){
        return userRepository.findAll();
    }

    public User setAdmin (Long id){
        User userSelected = new User();
        if(userRepository.findById(id).isPresent()){
            userSelected = userRepository.findById(id).get();
            if (userSelected.getRole() != UserRole.ROLE_ADMIN) {
                userSelected.setRole(UserRole.ROLE_ADMIN);

            }else {
                userSelected.setRole(UserRole.ROLE_USER);
            }
            return userRepository.save(userSelected);
        }
        return null;

    }


    public Optional<User> findUserByEmail (String email){
        return userRepository.findByEmail(email);
    }



    public User updateUser (User user) {

        String upperName = user.getName().toUpperCase();
        String upperSurname = user.getSurname().toUpperCase();

        user.setName(upperName);
        user.setSurname(upperSurname);

        return userRepository.save(user);}




}
