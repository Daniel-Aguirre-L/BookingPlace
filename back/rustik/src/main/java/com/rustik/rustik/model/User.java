package com.rustik.rustik.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres")
    private String name;


    @Size(min = 3, message = "El apellido debe tener al menos 3 caracteres")
    private String surname;

    @NotBlank(message = "El email debe estar completo")
    @Email
    @Column(unique = true)
    private String email;


    @Pattern(
            regexp = "^\\+?\\d{7,}$",
            message = "El número de teléfono debe tener al menos 7 dígitos y puede empezar con '+'."
    )
    @Column(unique = true)
    private String phone;

    @NotBlank(message = "Debe indicar su pais")
    private String country;


    //Rol del usuario.
    private UserRole role = UserRole.ROLE_USER;


    @NotBlank
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
            message = "La password debe tener: \n *Mínimo 8 caracteres \n *Una mayúscula \n *Una minúscula \n *Un simbolo"
    )
    private String password;

    private Boolean isActive = true;

    public User(String name, String surname, String email, String phone, String country, UserRole role, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.role = role;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {  //el userName sera el Email.
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
