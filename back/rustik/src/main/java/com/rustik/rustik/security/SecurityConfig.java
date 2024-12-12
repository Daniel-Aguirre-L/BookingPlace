package com.rustik.rustik.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {


    @Autowired
    private SecurityFilter securityFilter;

    @Value("${CORS}")
    private String CORS;

    private static final String PREFIX = "/api/v1";

    List<String> publicPost = List.of(
            PREFIX + "/auth/login",
            PREFIX + "/auth/register",
            PREFIX + "/auth/reset-password"
    );

    List<String> publicGet = List.of(
            PREFIX + "/cabins/**",
            PREFIX + "/cabins/search",
            PREFIX + "/details",
            PREFIX + "/details/{id}",
            PREFIX + "/features"
    );

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(List.of(CORS)); // Permite solicitudes desde tu frontend
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos HTTP permitidos
                    corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept")); // Permite encabezados como Authorization y Content-Type
                    corsConfiguration.setAllowCredentials(true); // Permite el uso de credenciales (cookies, tokens)
                    return corsConfiguration;
                }))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll()
                        .requestMatchers(HttpMethod.POST, publicPost.toArray(new String[0])).permitAll()
                        .requestMatchers(HttpMethod.GET,publicGet.toArray(new String[0]) ).permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);


        return httpSecurity.build();


    }



    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
        }



    @Bean
    public BCryptPasswordEncoder encoder (){
        return new BCryptPasswordEncoder();
    }



}



                /*
                .cors()
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST,"/auth/login","/auth/singup")
                .permitAll()
                .requestMatchers(HttpMethod.GET,"/auth/validate-token", "/auth/validate-username", "/auth/validate-email")
                .permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasAnyRole("USER","ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
                */