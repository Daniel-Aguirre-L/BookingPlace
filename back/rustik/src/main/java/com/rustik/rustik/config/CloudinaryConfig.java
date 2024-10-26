package com.rustik.rustik.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${CLOUDINARY_URL}")
    private String cloudinaryUrl;

    @Bean
    public Cloudinary cloudinary() {
        String[] urlParts = cloudinaryUrl.replace("cloudinary://", "").split("@");
        String[] credentials = urlParts[0].split(":");
        String cloudName = urlParts[1];

        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", credentials[0]);
        config.put("api_secret", credentials[1]);

        return new Cloudinary(config);
    }
}