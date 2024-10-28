package com.rustik.rustik.test.service;

import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.service.CabinService;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CabinServiceTest {

    @Autowired
    private CabinService cabinService;

    private static Dotenv dotenv;

    @BeforeAll
    public static void init() {
        dotenv = Dotenv.load();
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
    }



    @Test
    @Order(1)
    //Pueba de guardado de cabaña.
    public void saveCabin () {

        Cabin cabin = new Cabin();
        //Se define los datos de la cabaña.
        cabin.setName("cabaña 1");
        cabin.setLocation("cordoba");
        cabin.setCapacity(6);
        cabin.setDescription("Cabaña para 6 personas");
        cabin.setPrice(12.0);

        //Se guarda el retorno desde la persistencia
        Cabin cabinSaved= cabinService.save(cabin);

        //Se verifica si se le ha agregado el id esperado.
        Assertions.assertEquals(1l,cabinSaved.getId());

    }


    @Test
    @Order(2)
    //Prueba de listado de cabañas en BD
    public void findAll (){

        Cabin cabin = new Cabin();
        //Se define una nueva cabaña.
        cabin.setName("cabaña 2");
        cabin.setLocation("cordoba");
        cabin.setCapacity(6);
        cabin.setDescription("Cabaña para 6 personas");
        cabin.setPrice(12.0);

        //Se guarad esta segunda cabaña.
        cabinService.save(cabin);


        //Se lista las cabañas
        List<Cabin> cabins = cabinService.findAll();

        //Se espera que La lista de cabañas tenga 2 componentes
        Assertions.assertEquals(2,cabins.size());

    }

    @Test
    @Order(3)
    //Prueba de busqueda por id de cabaña
    public void findById(){

        //Se trae la cabaña con id=2
        Cabin cabin = cabinService.findById(2l);

        //Se indica el nombre que deberia tener la casbaña con id 2
        String nameExpected = "cabaña 2";


        // Se verifica que sea el mismo nombre
        Assertions.assertEquals(nameExpected,cabin.getName());


    }

    @Test
    @Order(4)
    //Prueba de eliminación de cabaña de BD
    public void deleteCabin() {

        //Primero se verifica que sean 2 cabañas en BD
        List<Cabin> cabinsBefore = cabinService.findAll();

        //Se elimina la cabaña con id 2
        cabinService.delete(2l);

        //Se trae la nueva lista de cabañas en BD
        List<Cabin> cabinsAfter = cabinService.findAll();

        //se verifica que la cantidad de elementos no sea la misma
        Assertions.assertNotEquals(cabinsBefore.size(),cabinsAfter.size());
    }







}
