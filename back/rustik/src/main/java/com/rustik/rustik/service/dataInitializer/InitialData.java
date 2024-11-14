package com.rustik.rustik.service.dataInitializer;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rustik.rustik.model.*;
import com.rustik.rustik.repository.DetailRepository;
import com.rustik.rustik.repository.ImageRepository;
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
import java.util.Random;


@Component
public class InitialData implements ApplicationRunner {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private DetailRepository detailRepository;

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
        //CREA USUARIO ADMIN
        User admin = new User("admin","admin","admin@admin.com","123","uy", UserRole.ROLE_ADMIN,"1234Admin!");
        userService.registerUser(admin);

        //CREA LISTADO DE FEATURES
        List<Feature> features = new ArrayList<>();
        features.add(new Feature("Wi-Fi", "I1"));
        features.add(new Feature("Baños", "I2", true));
        features.add(new Feature("Habitaciones", "I3", true));
        features.add(new Feature("Cocina", "I4"));
        features.add(new Feature("Parqueadero", "I5", true));
        features.add(new Feature("TV", "I6"));
        features.add(new Feature("Aire Acondicionado", "I7"));
        features.add(new Feature("Calentador", "I8"));
        features.add(new Feature("Jacuzzi", "I9"));
        features.add(new Feature("Lavadora", "I10"));
        features.add(new Feature("Pet-Friendly", "I11"));
        features.add(new Feature("Calefacción", "I12"));
        features.add(new Feature("Chimenea", "I13"));
        features.add(new Feature("Refrigerador", "I14"));
        features.add(new Feature("Horno", "I15"));
        features.add(new Feature("Asador", "I16"));

        featureService.save(features);

        //CREA LISTADO DE CABANAS
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

        List<Cabin> saveCabins = cabinService.saveCabins(cabins);


        //Crea las Imagenes consultando Cloudinary
        /*
        for (int i = 1; i <= 20; i++) {
            String folder = "cabin " + i; // Crea el nombre de la carpeta
            System.out.println("Listando imágenes en la carpeta: " + folder);
            listImagesInFolder(i);
        }
        */

        crearImagenesYCaracteristicas(saveCabins, features);

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


    public void crearImagenesYCaracteristicas(List<Cabin> saveCabins, List<Feature> features) {

        Random random = new Random();
        List<String> urls = List.of("https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/hmc4wsso1dnxos4cazae?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/jll9uuuzp9r3ym49bzsn?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/odvqmwc90hncx3jc5mjb?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/tvxnjtbqa8qbjnt2taoa?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/xvxsev6nndurbuxboqb2?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%202/fhievbbp496ta3gmyk0u?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%202/sceyvbltbkeydxybpyjc?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%202/sjprvz3x8lr8dwmwk9lt?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%202/xciy0fdpmkssfkydxhwz?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%202/zi4dzoeklw6dlvhvwiva?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%203/afu1ktzzn3f6axqqzkwr?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%203/bhipor7ipq9kfaqpxxzl?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%203/hgqnd6k2jhztqumh3xhm?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%203/il6ohwmolf3pabme9n8r?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%203/zjwbwyepbb3lfqcxagqw?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%204/gmceg8rw9c7u2tp7b9h1?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%204/kajt5kwjr1qj5xmiklrr?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%204/qdebwkakdhwzhpkyk0nt?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%204/t5qmnwhbgymdl3kmlw1p?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%204/udpqgbhy2metcfz8t2ov?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%205/bkdyqfxcgq2vokkkcobi?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%205/eggjjdklc8fzb5mw5lw8?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%205/fy7xtt0g7w9zfchai80i?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%205/k9ot0j5sg3qcwstxfxhi?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%205/rsnjpk5fjabihb6mteq0?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%206/abo6tlm3echbdriroloc?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%206/dflyrwvpwhc29m6wlhug?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%206/mtn8caosvq0wf3phktbi?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%206/wfhlm4uk1bzb0xu7m6xe?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%206/zomoy9dx6rnomeexukdy?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%207/jvrkz0g7tinwuerpx0xp?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%207/kbsyqcvr6gwij3fxmaby?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%207/w7vcby8orptn4s0cqxdi?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%207/xvb30k8qdqyms6rlkbhn?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%207/ymvpmqnalhk8ikfqqpt6?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%208/ngapbp2gacjxnnxsbseb?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%208/nygkze87py3kfl5wzhpd?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%208/pszf2dhr8jtxnnrizq3w?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%208/vgwvef2phzkjxk5ytk4c?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%208/wiaiyebenbvxsrp6insu?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%209/dioxn2u8kg8m4kyfyv66?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%209/qkrcx7h9j4omizb9v1dt?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%209/ug010dnxltml6unn4hz6?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%209/y0mfrgt1j3atfu6thhco?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%209/zkrok54gjwx40avk5qel?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2010/hdnn8w2gnkxtr0zo1vsw?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2010/jdkv6acef9xugu8gorsl?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2010/k36jwoodyckyrrolnadr?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2010/kasnvuetqewa1seudm6w?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2010/lccykdtfs5an8fwxpmkp?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2011/cqnaxs6zmjlswwreunrz?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2011/hgkaccurhm1ojukjftgp?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2011/jrtj70bkyfriqdewmm93?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2011/lzgr6hil9bjrgwk3x7mc?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2011/ot7lchhpc57giiizzswi?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2012/ghppexxhnkpc93vuxy8l?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2012/ktn9z9yaf1bfgmvavvff?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2012/s2ou0syb1ogcgxggzhoj?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2012/u1e3qwn4kpfh2f3unwsz?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2012/y6dcut5kamsqfxu2heom?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2013/atdfebiycksufqgidj8r?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2013/noc9okgpjaozbwwy95xd?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2013/nsw6n0dyu4mczjfggbl3?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2013/zgbh6tckssl80lvqaa3j?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2013/zrzaxgeravoszvw1w3dl?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2014/ddhk8w8zakwmphssaroh?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2014/f74gzhmdggjlfmjecdbz?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2014/im4nmkov9ozi8rnevp7i?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2014/jwloezfol0nq7ehy2838?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2014/vasddpks5wzxsma9dvkh?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2015/lnpwsalql0jwclvbvpy2?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2015/qvh0l8nztdov6nplnb79?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2015/skvkotcemnyadceke1tj?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2015/ti7vvvqox9lkf2jbjcxt?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2015/xhcumrepe4hevpochgjn?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2016/gfmtaetblhjdkwd6itv2?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2016/oimt2j4nyktplohdwmok?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2016/pzwymyglnr7cbpmnvgea?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2016/t4icpm9fkoqe4hk0uevd?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2016/zs4psubjimr002ejyzgq?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2017/egnllycijw7pnkdnb1sg?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2017/jopn5893ygukxzt45b8m?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2017/sg0o2whlwyhw7ykhdvp9?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2017/v4btkrdtlruejvlfhq5z?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2017/vntsrjzawmjtma42owez?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2018/bsaiic8u7hmsl0rexmi5?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2018/cyfbdoikhes8uz3mcztg?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2018/pwxw7sbwogenh2rzps7i?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2018/tkxxctvq8ygeb6jybrxu?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2018/zuaz6sixrhptf0icmtt8?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2019/bxztptfijomccd7wqv2o?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2019/cymkofvlyafclqgnejrh?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2019/gyrlqhhq9pvkl8eriawq?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2019/rwwsufyohrtsmkmwme9u?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2019/xbsbxazg0ui50bar5szy?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2020/gnsucunzsmrdrkw473ms?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2020/jzaxaun0bcbzxxyv3s5g?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2020/swlfl24a8kgfpsmizje4?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2020/uxvpjrkt3mpznauo9udh?_a=DAGAACCciZAA0", "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%2020/vakvfy1vol4bcbjcnkfg?_a=DAGAACCciZAA0");
        System.out.println(urls.size());
        List<Image> newImages = new ArrayList<>();
        List<Detail> newDetails = new ArrayList<>();

        for (int i = 0; i <= 19; i++) {
            // Agrega Imagenes
            for (int j = 0; j <= 4; j++) {
                Image image = new Image();
                image.setUrl(urls.get(5 * i + j));
                image.setImagePublicId(String.format("cabin %d/%d", i, j));
                image.setCabin(saveCabins.get(i));
                newImages.add(image);
            }

            int characteristicsCount = random.nextInt(7) + 5;

            for (int j = 0; j < characteristicsCount; j++) {
                Detail detail = new Detail();
                detail.setCabin(saveCabins.get(i));
                Feature addFeature = features.get(random.nextInt(16));
                detail.setFeature(addFeature);
                if (addFeature.getHasQuantity()) {
                    detail.setQuantity(random.nextInt(5)+1);
                }
                newDetails.add(detail);
            }

            imageRepository.saveAll(newImages);
            detailRepository.saveAll(newDetails);
        }
    }
}
