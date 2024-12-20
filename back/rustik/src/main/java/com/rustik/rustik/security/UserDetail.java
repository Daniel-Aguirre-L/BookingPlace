package com.rustik.rustik.security;

import com.rustik.rustik.model.User;
import com.rustik.rustik.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetail implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()){
            return new CustomUserDetails(user.get(), user.get().getAuthorities());
        } else {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
}
