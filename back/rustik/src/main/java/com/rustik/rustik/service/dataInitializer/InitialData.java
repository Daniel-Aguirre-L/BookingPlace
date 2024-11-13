package com.rustik.rustik.service.dataInitializer;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rustik.rustik.dto.UserDTO;
import com.rustik.rustik.model.*;
import com.rustik.rustik.repository.FeatureRepository;
import com.rustik.rustik.repository.ImageRepository;
import com.rustik.rustik.repository.UserRepository;
import com.rustik.rustik.service.CabinService;
import com.rustik.rustik.service.FeatureService;
import com.rustik.rustik.service.UserService;
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
    private UserService userService;

    @Autowired
    private CabinService cabinService;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private FeatureService featureService;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        User admin = new User("admin","admin","admin@admin.com","123","uy", UserRole.ROLE_ADMIN,"1234Admin!");
        userService.registerUser(admin);

        List<Cabin> cabins = new ArrayList<>();

        cabins.add(new Cabin("Cabaña del Bosque", "Mirador del Valle", 2,
                "Un refugio único para parejas, esta cabaña-carpa de glamping se encuentra en un mirador rodeado de bosque, ofreciendo una escapada íntima con vistas espectaculares. Disfruta de la tranquilidad de la naturaleza con comodidad, despertando cada mañana en medio de un entorno natural inigualable y paisajes de ensueño.",
                100.0, CabinCategory.GLAMPING));

        cabins.add(new Cabin("Casa de Campo Aurora", "Prados de Monte Verde", 6,
                "Encantadora cabaña tipo casa rodeada de prados y con vistas a majestuosas montañas. Disfruta de un jacuzzi exterior perfecto para relajarse bajo el cielo abierto, y un interior cálido y hogareño que invita a desconectar y descansar en plena naturaleza.",
                80.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Casa del Árbol Río", "Selva Tropical de Pucallpa", 4,
                "Una encantadora y acogedora casa del árbol en medio de un bosque tropical, ideal para grupos pequeños que buscan una experiencia única en la naturaleza. Disfruta de un jacuzzi al aire libre y vistas impresionantes en un ambiente íntimo rodeado de exuberante vegetación.",
                120.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Domo del Sol", "Playa del Paraíso", 2,
                "Este glamping tipo domo transparente ofrece una experiencia única cerca de la playa, con vistas a pequeñas montañas y un entorno ideal para parejas. Disfruta de un columpio exterior, un acogedor interior con pieles y un jacuzzi al aire libre para relajarse bajo las estrellas.",
                120.0, CabinCategory.GLAMPING));

        cabins.add(new Cabin("Rancho Montañés", "Cerro de las Montañas Negras", 8,
                "Esta cabaña de madera estilo vaquero es ideal para escapadas invernales. Con pieles de animales, decoración rústica y un ambiente cálido, es perfecta para quienes buscan una experiencia auténtica y acogedora en la montaña.",
                200.0, CabinCategory.INVIERNO));

        cabins.add(new Cabin("Cabaña del Viento", "Altos de San Gabriel", 5,
                "Esta moderna cabaña cuenta con ventanales gigantes que permiten una vista impresionante de los árboles y las montañas circundantes. Perfecta para estancias largas, ofrece un refugio acogedor en medio de la naturaleza, ideal para desconectar y disfrutar de la tranquilidad del entorno.",
                90.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Cabaña del Lago", "Bosque del Lago Espejo", 4,
                "Esta amplia y acogedora cabaña de madera se encuentra en un pequeño bosque, ofreciendo un balcón y mesas exteriores ideales para disfrutar de comidas al aire libre. Perfecta para pescadores y amantes de la naturaleza, es el refugio ideal para relajarse y explorar los alrededores.",
                110.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Cabaña Secreta", "Jardines de la Serenidad", 2,
                "Esta pequeña y acogedora cabaña está situada en una parcelación tranquila, rodeada de un prado y un encantador jardín, perfecta para una escapada mágica. Ideal para uso de Airbnb, ofrece un refugio íntimo para dos personas que buscan relajarse y desconectar en la naturaleza.",
                85.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Cabaña Urbana", "Centro Histórico de Valle Verde", 2,
                "Esta encantadora cabaña tipo choza redonda está rodeada de jardines urbanos y flora local, ideal para parejas que desean celebrar fechas especiales. Disfruta de un acogedor jacuzzi para una experiencia romántica en un entorno natural y privado.",
                75.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Cabaña Rústica", "Campo Abierto de San Pedro", 2,
                "Cabaña de madera pequeña tipo glamping con balcón y vistas al paisaje rural disperso. Perfecta para una escapada romántica, donde puedes disfrutar de la tranquilidad y la belleza de la naturaleza en un entorno sereno.",
                90.0, CabinCategory.GLAMPING));

        cabins.add(new Cabin("Cabaña de Pinos", "Refugio Natural de Valle Verde", 4,
                "Cabaña en un bosque de pinos, situada en un resguardo natural con ríos y fuentes de agua cercanas. Ideal para actividades al aire libre, esta cabaña está rodeada de otras cabañas y cuenta con un restaurante en el complejo comunitario, perfecto para disfrutar de la naturaleza sin renunciar a la comodidad.",
                110.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Cabaña Moderna", "Mirador de la Montaña", 6,
                "Cabaña de madera con un moderno amoblado, amplia y con grandes vistas a la montaña. Disfruta de un balcón con hamacas, ideal para relajarte mientras contemplas el paisaje. Perfecta para familias o grupos que buscan comodidad y conexión con la naturaleza.",
                150.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Domo Nevado", "Comunidad de Montaña Blanca", 2,
                "Cabaña tipo domo pequeña, ubicada en una comunidad tranquila rodeada de nieve. Ideal para escapadas románticas o retiros relajantes, donde puedes disfrutar de la serenidad del entorno nevado y la calidez del interior.",
                120.0, CabinCategory.INVIERNO));

        cabins.add(new Cabin("Cabaña del Horizonte", "Mirador del Valle", 4,
                "Cabaña de construcción moderna, amplia y con jacuzzi exterior. Ofrece excelentes vistas, perfecta para estancias largas donde puedes disfrutar de la comodidad y la belleza del paisaje. Ideal para familias o grupos que buscan relajarse y desconectar en un entorno natural.",
                180.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Cabaña Rústica del Jardín", "San Juan de los Jardines", 4,
                "Cabaña de madera estilo rústico, con un precioso jardín y un interior hogareño. Ideal para Airbnb, esta cabaña ofrece un ambiente acogedor y natural, perfecto para quienes buscan desconectar y disfrutar de la tranquilidad del entorno.",
                130.0, CabinCategory.RUSTICA));

        cabins.add(new Cabin("Cabaña Eco Moderna", "Bosque Verde", 2,
                "Cabaña pequeña de aspecto muy moderno, rodeada de árboles. Cuenta con un pequeño jacuzzi y excelentes vistas, todo con energía provista por paneles solares. Ideal para escapadas sostenibles en un entorno natural, perfecta para parejas que buscan relajarse y desconectar.",
                140.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Casa Natural Moderna", "Ladera del Bosque", 6,
                "Casa moderna con amplio balcón, rodeada de naturaleza. Su interior simula a la perfección una cabaña, combinando un estilo moderno y prolijo. Ideal para estancias largas, esta casa ofrece un ambiente acogedor y tranquilo, perfecto para disfrutar de la naturaleza sin sacrificar comodidad.",
                200.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Cabaña del Lago Espléndido", "Valle del Lago", 10,
                "Cabaña amplia de gran tamaño, con piscina y lago cercano. Ofrece mucho espacio tanto en el interior como en el exterior, perfecta para reuniones familiares o escapadas con amigos. Ideal para disfrutar de actividades al aire libre y relajarse en un entorno natural.",
                350.0, CabinCategory.VERANO));

        cabins.add(new Cabin("Cabaña Luminar", "Clearwater", 2,
                "Cabaña con balcón y una sola habitación grande sin paredes, que permite una excelente entrada de luz solar. Perfecta para un picnic, esta cabaña ofrece un ambiente fresco y aireado, ideal para disfrutar de la naturaleza y momentos íntimos al aire libre.",
                120.0, CabinCategory.MODERNA));

        cabins.add(new Cabin("Cabaña Búnker Vista Lago", "Laguna Clara", 4,
                "Cabaña tipo búnker con luces que destacan su estilo moderno y un balcón con vistas al lago. Ideal para quienes buscan una experiencia única y privada en la naturaleza, esta cabaña combina confort y diseño contemporáneo en un entorno sereno.",
                150.0, CabinCategory.MODERNA));

        cabinService.saveCabins(cabins);

        List<Feature> features = new ArrayList<>();
        features.add(new Feature("Wi-Fi", "wifi-icon"));
        features.add(new Feature("Baños", "bathroom-icon"));
        features.add(new Feature("Habitaciones", "bedroom-icon"));
        features.add(new Feature("Cocina", "kitchen-icon"));
        features.add(new Feature("Parqueadero", "parking-icon"));
        features.add(new Feature("TV", "tv-icon"));
        features.add(new Feature("Aire Acondicionado", "ac-icon"));
        features.add(new Feature("Calentador", "heater-icon"));
        features.add(new Feature("Jacuzzi", "jacuzzi-icon"));
        features.add(new Feature("Lavadora", "washing-machine-icon"));
        features.add(new Feature("Pet-Friendly", "pet-friendly-icon"));
        features.add(new Feature("Calefacción", "heating-icon"));
        features.add(new Feature("Chimenea", "fireplace-icon"));
        features.add(new Feature("Refrigerador", "fridge-icon"));
        features.add(new Feature("Horno", "oven-icon"));
        features.add(new Feature("Asador", "bbq-icon"));

        featureService.save(features);


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
