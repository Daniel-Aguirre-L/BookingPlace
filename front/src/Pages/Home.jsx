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
        }
        apicall();

    }, [])

    return (
        <>
            <CatalogList />
        </>
    )
}

export default Home;