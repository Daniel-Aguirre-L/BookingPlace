package com.rustik.rustik.test.service.dataInitializer;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.ImageService;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * Esta clase ha sido creada a modo de back inicial para cargar las imagernes de las primeras 20 cabañas de la api.
 * Se ha decidido implementarla como un test ya que sera utilizada de forma manual solo 1 vez.
 * Solo sera utilizada nuevamente en caso de necesitar un back up o levantar nuevamente las imagenes en cloudinary.
 * **/

@SpringBootTest
public class ImageInitializerTest {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CabinService cabinService;

    private static Dotenv dotenv;

    @BeforeAll
    public static void init() {
        dotenv = Dotenv.load();
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("CLOUDINARY_URL", dotenv.get("CLOUDINARY_URL"));
    }





    //@Test -- Se comenta para solo sea utilizado de forma manual.

    public void uploadInitialCloudImages(){

        String baseDirectoryPath = "D:\\Proyecto Integrador\\Fotos\\";

        for (int i = 1; i <=20 ; i++) {

            Cabin cabin = cabinService.save(new Cabin());
            String folderName = "c" + i;
            String directoryPath = baseDirectoryPath + folderName + "\\";

            Long cabinId = cabin.getId();
            String[] imageNames = {"1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg"};

            for (String imageName : imageNames) {

                File imageFile = new File(directoryPath + imageName);

                if (imageFile.exists()){
                    try {
                        MultipartFile multipartFile =
                                new MockMultipartFile(
                                        "file",imageFile.getName(),
                                        "image/jpeg", Files.readAllBytes(imageFile.toPath())
                        );

                        imageService.uploadImage(cabinId,multipartFile);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    System.out.println("El archivo no existe en la ruta: " + imageFile);
                }


            }

        }

    }

}
