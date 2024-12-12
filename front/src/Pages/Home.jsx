import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [filter, setFilter] = useState('');
  const [recommendedIsShown, setRecommendedIsShown] = useState(true);
  const [recomendedCabin, setRecommendedCabin] = useState({});
  

  const handleShowMore = () => {
    setPage(page + 1);
    window.scrollTo(0, window.scrollY + 300);
  };

  const handleOnClick = () => {
    if (filter) {
      getRandonCabins();
      setFilter('');
      setRecommendedIsShown(true);
      window.history.pushState("", document.title, window.location.pathname);

    } else {
      setPage(page + 1);
      window.scrollTo(0, window.scrollY + 700);
    }
  }

  const handleVisitMasReservado = () => {
    navigate(`${routeList.CATALOG_DETAIL}/${recomendedCabin.id}`);
  };


  const getRandonCabins = useCallback(async () => {
    try {
      const { data } = await rustikApi.get(`${rustikEndpoints.cabinsRandom}?count=50`);
      setCabins(data);
      setRecommendedCabin(data[Math.floor(Math.random() * data.length)]);
      setPage(1);
    } catch (error) {
      console.error("Error al llamar a la api", error);
    }
  }, []);


  const getCategoryCabins = useCallback(async (category) => {
    try {
      const { data } = await rustikApi.get(`${rustikEndpoints.cabinsFilter}${category}`);
      setCabins(data);
      setRecommendedCabin(data[Math.floor(Math.random() * data.length)]);
      setPage(10);
      setFilter(category);
    } catch (error) {
      console.error("Error al llamar a la api", error);
    }
  }, []);

  const getNameCabins = useCallback(async (name="", date1="", date2="") => {
    try {
      let initialDate = date1 ? date1.split(" ")[1] : "";
      let endDate = date2 ? date2.split(" ")[1] : "";
      initialDate = initialDate ? initialDate.split("/")[2] + "-" + initialDate.split("/")[1] + "-" + initialDate.split("/")[0]: ""; 
      endDate = endDate ? endDate.split("/")[2] + "-" + endDate.split("/")[1] + "-" + endDate.split("/")[0]: "";
      const {data} = await rustikApi.get(`${rustikEndpoints.cabinsSearch}searchTerm=${name}&initialDate=${initialDate}&endDate=${endDate}`);
      setCabins(data);
      setRecommendedCabin(data[Math.floor(Math.random() * data.length)]);
      setPage(20);
      setFilter(`${name}`);
      data.length==0 ? setRecommendedIsShown(false) : (setRecommendedIsShown(true));
    } catch (error) {
      console.error("Error al llamar a la api", error);
    }
  }, []);


  useEffect(() => {
    getRandonCabins();

  }, []);

  const myCabins = useMemo(() => cabins.slice(0, (4 * page)), [page, cabins]);

  const SLIDES = useMemo(() =>
    [
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
    ], [])



  return (
    <div className="animate-fadeIn " >
      <Landing filter={filter} setFilter={setFilter} getNameCabins={getNameCabins} cabinHelper={cabins.length > 0 ? cabins.map(cabin => cabin.name) : []} ></Landing>
      <EmblaCategoryCarousel slides={SLIDES} options={{ loop: true }} getCategoryCabins={getCategoryCabins} />
      {recommendedIsShown ? (
      <Headline title={filter ? `Resultados de la búsqueda: "${filter.toLowerCase()}"` : "Nuestras Cabañas"} handleOnClick={handleOnClick} filter={filter}   >
        Estos son los resultados que hemos encontrado utilizando los filtros que seleccionaste.
      </Headline>
      ): 
      <Headline title={"No se encontraron cabañas"} handleOnClick={handleOnClick} filter={filter} >
        No se encontraron cabañas disponibles con los filtros especificados.
         Por favor, intenta nuevamente con diferentes criterios de búsqueda.
      </Headline>
    }
      <CatalogList myCabins={myCabins} page={page} continuar={myCabins.length === cabins.length} filter={filter} handleShowMore={handleShowMore} handleOnClick={handleOnClick} ></CatalogList>
      {(recommendedIsShown && myCabins.length>1) && (
      <Headline
      handleOnClick={handleVisitMasReservado}
      title={filter ? `La recomendada de "${filter.toLowerCase()}"` : "La más reservada"}
      >
        {filter ? 'Hemos encontrado la mejor opción para ti: Sabemos lo importante que es encontrar un lugar que se ajuste a tus necesidades y preferencias, por eso hemos revisado cuidadosamente las opciones disponibles para presentarte esta increíble cabaña.' : `Descubre la cabaña más reservada del sitio: el refugio preferido para escapadas,
         vacaciones y momentos inolvidables, donde cada detalle está pensado para ofrecer 
         la máxima comodidad y relajación, rodeado de paisajes impresionantes y la tranquilidad que solo la naturaleza puede brindar.`}
      </Headline>
    )}
      <DisplayCard cabin={recomendedCabin} handleOnClick={handleVisitMasReservado} ></DisplayCard>
    </div>

  );
};

export default Home;
