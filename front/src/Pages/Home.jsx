import Landing from "../Components/Landing";
import Headline from "../Components/Headline";
import CatalogList from "../Components/CatalogList";
import DisplayCard from "../Components/DisplayCard";
import { useEffect, useMemo, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";

const Home = () => {
  
  const [cabins, setCabins] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const apicall = async () => {
      try {
        const { data } = await rustikApi.get(`${rustikEndpoints.cabinsRandom}?count=20`);
        setCabins(data);
      } catch (error) {
        console.error("Error al llamar a la api", error);
      }
    };
    apicall();
  }, []);

  const myCabins =  useMemo(() => cabins.slice(0, (4 * page)), [page, cabins]);
  console.log({cabins});
  console.log({myCabins});

  return (
    <>
      <Landing></Landing>
      <Headline title="Nuestras Cabañas" handleOnClick={() => setPage(page + 1)} >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <CatalogList myCabins={myCabins} ></CatalogList>
      <Headline title="El más reservado">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <DisplayCard></DisplayCard>
    </>
  );
};

export default Home;
