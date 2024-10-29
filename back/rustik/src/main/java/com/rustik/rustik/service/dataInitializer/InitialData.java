package com.rustik.rustik.service.dataInitializer;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.repository.ImageRepository;
import com.rustik.rustik.service.CabinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class InitialData implements ApplicationRunner {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CabinService cabinService;


    @Autowired
    private Cloudinary cloudinary;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<Cabin> cabins = new ArrayList<>();

        cabins.add(new Cabin("Cabaña del Bosque", "Valle de la Luna", 4, "Ideal para familias que buscan tranquilidad.", 100.0));
        cabins.add(new Cabin("Cabaña Rústica", "Lago Espejo", 2, "Cabaña acogedora con vistas al lago.", 80.0));
        cabins.add(new Cabin("Cabaña del Río", "Río Colorado", 6, "Perfecta para grupos grandes y actividades al aire libre.", 150.0));
        cabins.add(new Cabin("Cabaña del Sol", "Costa del Sol", 4, "Cerca de la playa y actividades acuáticas.", 120.0));
        cabins.add(new Cabin("Cabaña Montañosa", "Cerro de los Abetos", 5, "Excelente para escapadas en invierno.", 200.0));
        cabins.add(new Cabin("Cabaña del Viento", "Pueblo de las Nubes", 3, "Rodeada de montañas y naturaleza.", 90.0));
        cabins.add(new Cabin("Cabaña del Lago", "Lago Azul", 4, "Ideal para pescadores y amantes de la naturaleza.", 110.0));
        cabins.add(new Cabin("Cabaña del Jardín", "Valle Verde", 2, "Rodeada de jardines y flora local.", 75.0));
        cabins.add(new Cabin("Cabaña Secreta", "Bosque Encantado", 2, "Un lugar mágico y tranquilo.", 85.0));
        cabins.add(new Cabin("Cabaña del Faro", "Costa del Mar", 5, "Con vistas impresionantes al océano.", 250.0));
        cabins.add(new Cabin("Cabaña del Campista", "Montañas de Oro", 3, "Ideal para acampar y explorar la naturaleza.", 95.0));
        cabins.add(new Cabin("Cabaña del Desierto", "Desierto Blanco", 2, "Experiencia única en el desierto.", 70.0));
        cabins.add(new Cabin("Cabaña del Norte", "Pueblo del Ártico", 6, "Perfecta para ver auroras boreales.", 300.0));
        cabins.add(new Cabin("Cabaña Tropical", "Islas del Caribe", 4, "Rodeada de palmeras y playas de arena blanca.", 180.0));
        cabins.add(new Cabin("Cabaña del Explorador", "Montañas Verdes", 4, "Ideal para aventureros y excursionistas.", 130.0));
        cabins.add(new Cabin("Cabaña Familiar", "Bosque de Pinos", 8, "Espaciosa y cómoda para familias grandes.", 160.0));
        cabins.add(new Cabin("Cabaña del Refugio", "Cerro Nevado", 3, "Cerca de las pistas de esquí.", 220.0));
        cabins.add(new Cabin("Cabaña del Atardecer", "Playa de la Luz", 4, "Espectaculares puestas de sol desde la terraza.", 140.0));
        cabins.add(new Cabin("Cabaña Histórica", "Pueblo Antiguo", 5, "Conservada con el encanto de antaño.", 115.0));
        cabins.add(new Cabin("Cabaña de la Selva", "Selva Mística", 4, "Sumérgete en la naturaleza selvática.", 130.0));

        cabinService.saveCabins(cabins);


        for (int i = 1; i <= 20; i++) {
            String folder = "cabin " + i; // Crea el nombre de la carpeta
            System.out.println("Listando imágenes en la carpeta: " + folder);
            listImagesInFolder(i);
        }
    }

    public void listImagesInFolder( int i ) {
        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "type", "upload",
                    "prefix", "cabin " + i + "/",
                    "max_results", 5 //
            );

            Map<String, Object> result = cloudinary.api().resources(options);
            List<Map> resources = (List<Map>) result.get("resources");

            Cabin cabin = cabinService.findById((long) i);
            for (Map resource : resources) {
                String publicId = (String) resource.get("public_id");
                String imageUrl = cloudinary.url().generate(publicId);
                Image image = new Image();
                image.setUrl(imageUrl);
                image.setImagePublicId(publicId);
                image.setCabin(cabin);

                imageRepository.save(image);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }
}
