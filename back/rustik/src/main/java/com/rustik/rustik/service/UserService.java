package com.rustik.rustik.service;

import com.rustik.rustik.dto.AuthUserDTO;
import com.rustik.rustik.dto.LogInDTO;
import com.rustik.rustik.exception.BadRequestException;
import com.rustik.rustik.model.Booking;
import com.rustik.rustik.model.BookingState;
import com.rustik.rustik.model.User;
import com.rustik.rustik.model.UserRole;
import com.rustik.rustik.repository.UserRepository;
import com.rustik.rustik.security.TokenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private BookingService bookingService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public static final Logger logger = Logger.getLogger(UserService.class);


    public AuthUserDTO registerUser (User user) {


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

    public AuthUserDTO logIn (LogInDTO logInDTO) throws BadRequestException {

        User user = userRepository.findByEmail(logInDTO.getEmail())
                .orElseThrow(() -> new BadRequestException("Credenciales incorrectas"));


        if (!encoder.matches(logInDTO.getPassword(), user.getPassword()) || !user.getIsActive()) {
            throw new BadRequestException("Credenciales incorrectas");
        }

        String token = tokenService.generateToken(user);
        return new AuthUserDTO(user, token);
    }

    public Boolean resetPassword (String email)  {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            System.out.println(email);
            String token = tokenService.generateToken(user.get());
            emailService.sendResetPasswordEmail(user.get().getEmail(), user.get().getUsername(), token);
        }

        return true;
    }


    public List<User> findUsers (){

        //logger.info(userRepository.findAll().toString());

        //trae solo a los usuarios activos
        return userRepository.findByIsActiveTrue();
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

    public Optional<User> findUserByPhone (String phone){
        return userRepository.findByPhone(phone);
    }

    public String encodePassword(String password) {
        return encoder.encode(password);
    }

    public Boolean deleteLogic (User user){
        user.setIsActive(false);
        User deleteUser = userRepository.save(user);

        List<Booking> bookings = bookingService.findBookingByUser(user);

        for (Booking booking : bookings) {
            if (booking.getState()== BookingState.ACTIVA){
                bookingService.cancelBooking(booking);
            }
        }
            return deleteUser.getIsActive();
    }

}
