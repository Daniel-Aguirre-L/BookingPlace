package com.rustik.rustik.test.Controller;

import com.rustik.rustik.controller.CabinController;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureMockMvc
public class CabinControllerTest {

    @Autowired
    private CabinService cabinService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CabinController cabinController;



    private static Dotenv dotenv;

    @BeforeAll
    public static void init() {
        dotenv = Dotenv.load();
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("CLOUDINARY_URL", dotenv.get("CLOUDINARY_URL"));
        System.setProperty("CORS", dotenv.get("CORS"));
    }

    @Test
    public void postCabin () {



    }
}
