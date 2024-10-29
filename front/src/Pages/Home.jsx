import Navbar from "../Components/Navbar";
import CatalogList from "../Components/CatalogList";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";

const Home = () => {
  // Ejemplo del uso de rustikApi para hacer llamados al BACK
  useEffect(() => {
    const apicall = async () => {
      try {
        const { data } = await rustikApi.get(rustikEndpoints.cabins);
        console.log("Llamado exitoso a la api", data);
      } catch (error) {
        console.error("Error al llamar a la api", error);
      }
    };
    apicall();
  }, []);

  return (
    <>
      <Navbar />
      <CatalogList />
      <h1 className="text-3xl font-bold underline text-red-700 h-screen ">
        prueba Tailwind
      </h1>
      <Footer />
    </>
  );
};

export default Home;
