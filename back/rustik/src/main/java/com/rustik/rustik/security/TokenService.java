package com.rustik.rustik.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.rustik.rustik.model.User;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

/**
 * Esta clase Sera la encargada de generar y validar el JWT.
 * Clase en construcción sin aplicación en la API momentaneamente.
 * **/

@Service
public class TokenService {


    public String generateToken(User user){

        try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Secret temporal, se agregara como env en el momento de implementarlo.
            return JWT.create()
                    .withIssuer("Issuer") //Issuer temporal, se agregara como env en el momento de implementarlo.
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
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Secret temporal, se agregara como env en el momento de implementarlo.
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("Issuer") //Issuer temporal, se agregara como env en el momento de implementarlo.
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
        if (token !=null && getSubject(token)!= null){
            return true;
        }
        return false;

    }
}
