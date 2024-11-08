package com.rustik.rustik.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.rustik.rustik.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;


@Service
public class TokenService {


    public String generateToken(User user){

        try {
            Algorithm algorithm = Algorithm.HMAC256("${SECRET}");
            return JWT.create()
                    .withIssuer("${ISSUER}")
                    .withSubject(user.getUsername())
                    .withClaim("id",user.getId())
                    .withExpiresAt(getExpirationDate())
                    .sign(algorithm);

        } catch (JWTCreationException e){
            throw new RuntimeException("Error al generar el token", e);
        }
    }

    public String getSubject(String token){

        try{
            Algorithm algorithm = Algorithm.HMAC256("${SECRET}");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("${ISSUER}")
                    .build();

            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject();

        }catch (JWTVerificationException e){
            throw new RuntimeException("Token invalido", e);
        }

    }

    private Instant getExpirationDate (){
        Instant now = Instant.now();
        return now.plus(Duration.ofHours(24));
    }

    public Boolean validateToken (String token){
        if (token == null || getSubject(token) == null){
            return false;
        }
        Date expirationDate = getExpritationDateFromToken(token);
        return expirationDate != null && !expirationDate.before(new Date());
    }

    public String getTokenEmail (String token){
        Date expirationDate = getExpritationDateFromToken(token);
        if (expirationDate == null || expirationDate.before(new Date())){
            return null;
        }
        return getSubject(token);
    }

    private Date getExpritationDateFromToken (String token){
        try{
            Algorithm algorithm = Algorithm.HMAC256("${SECRET}");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("${ISSUER}")
                    .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getExpiresAt();
        }catch (JWTVerificationException e){
            return null;
        }
    }

    public String refreshToken(String expiredToken, User user) {
        if (validateToken(expiredToken)) {
            return generateToken(user);
        }
        throw new RuntimeException("El token ha expirado y no puede ser renovado");
    }

    public String tokenFromHeader (String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer")){
            return "Token missing or invalid";
        }

        String token = authHeader.replace("Bearer ","");

        return token;
    }

    public  String subjecjFromHeader (String authHeader) {
        String token = tokenFromHeader(authHeader);

        String subject = getSubject(token);

        return subject;
    }
}
