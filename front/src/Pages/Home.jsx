import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "../Components/Landing";
import Headline from "../Components/Headline";
import CatalogList from "../Components/CatalogList";
import DisplayCard from "../Components/DisplayCard";
import { rustikApi } from "../services/rustikApi";
import { routeList } from "../helpers/routeList";
import { rustikEndpoints } from "../services/rustkEndPoints";
import EmblaCategoryCarousel from "../Components/carousel/EmblaCategoryCarousel";


const Home = () => {
  const navigate = useNavigate();
  const [cabins, setCabins] = useState([]);
  const [page, setPage] = useState(1);

  const handleShowMore = () => {
    setPage(page + 1);
    window.scrollTo(0, window.scrollY + 300);
  };

  const handleOnClick = () => {
    setPage(page + 1);
    window.scrollTo(0, window.scrollY + 700);
  }

  const handleVisitMasReservado = () => {
    navigate(`${routeList.CATALOG_DETAIL}/${cabins[8].id}`); 
  };
  
  useEffect(() => {
    const apicall = async () => {
      try {
        const { data } = await rustikApi.get(`${rustikEndpoints.cabinsRandom}?count=50`);
        setCabins(data);
      } catch (error) {
        console.error("Error al llamar a la api", error);
      }
    };
    apicall();
  }, []);

  const myCabins =  useMemo(() => cabins.slice(0, (4 * page)), [page, cabins]);

  const SLIDES = [
    {
      title: "Glamping",
      description: "Encuentra y reserva espacios de glamping en nuestros destinos más populares",
      src: "/img/glamping.png"
    },
    {
      title: "Rustica",
      description: "Descubre y reserva cabañas rústicas en nuestros destinos favoritos",
      src: "/img/rustica.png"
    },
    {
      title: "Invierno",
      description: "Descubre y reserva cabañas rústicas en nuestros destinos favoritos",
      src: "/img/invierno.png"
    },
    {
      title: "Verano",
      description: "Encuentra y reserva espacios de glamping en nuestros destinos más populares",
      src: "/img/verano.png"
    },
    {
      title: "Moderna",
      description: "Encuentra y reserva espacios de glamping en nuestros destinos más populares",
      src: "/img/moderna.png"
    }
  ];

  return (
    <div className="animate-fadeIn " >
      <Landing></Landing>
      <EmblaCategoryCarousel slides={SLIDES} options={{ loop: true }} />
      <Headline title="Nuestras Cabañas" handleOnClick={handleOnClick} >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <CatalogList myCabins={myCabins} page={page} handleShowMore={handleShowMore} continuar={myCabins.length === cabins.length} ></CatalogList>
      <Headline title="El más reservado"  handleOnClick={handleVisitMasReservado}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Headline>
      <DisplayCard cabin={cabins[8]} handleOnClick={handleVisitMasReservado} ></DisplayCard>
      
    </div>
    
  );
};

export default Home;
