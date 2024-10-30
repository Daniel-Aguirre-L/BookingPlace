import Landing from "../Components/Landing";
import Headline from "../Components/Headline";
import CatalogList from "../Components/CatalogList";
import DisplayCard from "../Components/DisplayCard";
import { useEffect } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import CatalogList from "../Components/CatalogList";

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
      <Landing></Landing>
      <Headline title="Lo mas visitado">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <CatalogList></CatalogList>
      <Headline title="El mas reservado">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <DisplayCard></DisplayCard>
    </>
  );
};

export default Home;
