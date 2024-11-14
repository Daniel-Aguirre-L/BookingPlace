package com.rustik.rustik.security;

import com.rustik.rustik.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    @Getter
    private User user;

    @Getter
    @Setter
    private String token;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User user, String token, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.token = token;
        this.authorities = authorities;
    }
    public CustomUserDetails(User user,  Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.token = token;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }


}
