package com.rustik.rustik.test.service;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ImageServiceTest {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CabinService cabinService;


    private static Cabin testCabin;


    private static Dotenv dotenv;

    @BeforeAll
    public static void init() {
        dotenv = Dotenv.load();
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("CLOUDINARY_URL", dotenv.get("CLOUDINARY_URL"));

    }

    @BeforeEach
    void cabinSetup(){
        Cabin cabin = new Cabin();

        cabin.setName("test");

        testCabin = cabinService.save(cabin);
    }



    @Test
    @Order(1)
    public void uploadImage () {


        Path path = Paths.get("src/test/resources/test-image.jpeg");
        MultipartFile file;

        try {
            file = new MockMultipartFile("file", "test-image.jpeg", "image/jpeg", Files.readAllBytes(path));
        } catch (IOException e) {
            fail("Failed to read the test image: " + e.getMessage());
            return;
        }
        Image uploadImage = imageService.uploadImage(testCabin.getId(),file);

        assertNotNull(uploadImage);
        assertFalse(uploadImage.getUrl().isEmpty());
        assertEquals(uploadImage.getCabin().getName(),testCabin.getName());


    }


    @Test
    public void uploadEmptyFileImage (){

        MultipartFile file = new MockMultipartFile("file", "test-image.jpeg", "image/jpeg", new byte[0]);

        assertThrows(RuntimeException.class,() -> imageService.uploadImage(testCabin.getId(), file));

    }

    @Test
    public void uploadCabinNotFound () {

        Path path = Paths.get("src/test/resources/test-image.jpeg");
        MultipartFile file;

        try {
            file = new MockMultipartFile("file", "test-image.jpeg", "image/jpeg", Files.readAllBytes(path));
        } catch (IOException e) {
            fail("Failed to read the test image: " + e.getMessage());
            return;
        }

        assertThrows(RuntimeException.class, () -> imageService.uploadImage(999l,file));

    }

    @Test
    @Order(2)
    public void getAllImages () {

        List<Image> images = imageService.getAllImages();

        assertEquals(images.size(),1);
    }


    @Test
    @Order(3)
    public void findById (){

        Image image = imageService.findById(1l);

        assertNotNull(image);
    }


    @Test
    @Order(4)
    public void deleteImage (){

        assertTrue(imageService.deleteImage(1l));
    }

}
