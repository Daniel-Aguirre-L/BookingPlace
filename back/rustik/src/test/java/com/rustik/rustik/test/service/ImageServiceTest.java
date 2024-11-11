package com.rustik.rustik.test.service;

import com.rustik.rustik.dto.CabinDTO;
import com.rustik.rustik.mapper.CabinMapper;
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
        System.setProperty("CORS", dotenv.get("CORS"));
    }

    @BeforeEach
    //Guardo una cabaña en BD para los test
    void cabinSetup(){
        CabinDTO cabin = new CabinDTO();

        cabin.setName("test");

        testCabin = CabinMapper.toEntity(cabinService.save(cabin).get());
    }



    @Test
    @Order(1)
    //Prueba de guardado de imagen positiva
    public void uploadImage () {

        //Configuro el archivo de la imagen cargada en "resources"
        //Path path = Paths.get("src/test/resources/test-image.jpeg");
        Path path = Paths.get("D:\\Proyecto Integrador\\Fotos\\c2\\1.jpeg");
        MultipartFile file;

        try {
            //Creo un archivo Multipartfile con la imagen configurada
            file = new MockMultipartFile("file", "1.jpeg", "image/jpeg", Files.readAllBytes(path));
        } catch (IOException e) {
            fail("Failed to read the test image: " + e.getMessage());
            return;
        }
        //Carlo la imagen a BD
        Image uploadImage = imageService.uploadImage(testCabin,file);

        //Verifico que la imagen cargada no sea nula,
        // que la url devuelta por claudinary no este vacia
        // y que la cabaña asosiada sea la configurada mas arriba.
        assertNotNull(uploadImage);
        assertFalse(uploadImage.getUrl().isEmpty());
        assertEquals(uploadImage.getCabin().getName(),testCabin.getName());


    }


    @Test
    //Prueba de guardado de archivo vacio
    public void uploadEmptyFileImage (){

        //Se crea un archivo multipartFile vacio (0 bytes)
        MultipartFile file = new MockMultipartFile("file", "test-image.jpeg", "image/jpeg", new byte[0]);

        //Se verifica que al intentar guardar ese archivo tira una excepción
        assertThrows(RuntimeException.class,() -> imageService.uploadImage(testCabin, file));

    }

    @Test
    //Prueba de guardado de imagen a una cabaña inexistente
    public void uploadCabinNotFound () {

        //Configuro de forma correcta la imagen (Como en el primer test)
        Path path = Paths.get("src/test/resources/test-image.jpeg");
        MultipartFile file;

        try {
            file = new MockMultipartFile("file", "test-image.jpeg", "image/jpeg", Files.readAllBytes(path));
        } catch (IOException e) {
            fail("Failed to read the test image: " + e.getMessage());
            return;
        }

        //Verifico que al asignarlo a una cabaña que no se encuentra en BD tira una excepción.
        assertThrows(RuntimeException.class, () -> imageService.uploadImage(testCabin,file));

    }

    @Test
    @Order(2)
    //Prueba listado de imagenes guardadas
    public void getAllImages () {

        List<Image> images = imageService.getAllImages();

        assertEquals(images.size(),1);
    }


    @Test
    @Order(3)
    //Prueba busqueda de imagen por Id
    public void findById (){

        Image image = imageService.findById(1l);

        assertNotNull(image);
    }


    @Test
    @Order(4)
    //Prueba eliminación de imagen de BD
    public void deleteImage (){

        //Verifico que al eliminar la imagen con id 1 retorna "true"
        assertTrue(imageService.deleteImage(1l));
    }

}
