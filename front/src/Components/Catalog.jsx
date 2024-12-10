import { useEffect, useState, } from 'react';
import CarouselModal from './carousel/CarouselModal';
import PageTitleAndBack from './PageTitleAndBack';
import FeatureIcon from './icons/FeatureIcon'
import Policies from './Policies';
import Rating from './Rating';
import Reviews from './Reviews';
import ShareFavButtons from './ShareFavButtons';
import { rustikApi } from '../services/rustikApi';
import { rustikEndpoints } from '../services/rustkEndPoints';
import { getRatingDescription } from '../helpers/getRatingDescription';
import { usePagination } from '../hooks/usePagination';
import SelectDate from './SelectDate';
import { useUser } from '../hooks/useUser';
import ModalLogin from './ModalLogin';
import DetalleReserva from './DetalleReserva';
import useNotificationStore from '../store/useNotificationStore';
import useLoaderModalStore from '../store/useLoaderModalStore';


const Catalog = ({ cabin, getCabin }) => {

    const url = (import.meta.env.VITE_RUSTIK_WEB || "") + "/catalogo/" + (cabin.id ?? "");
    const [showModal, setShowModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [bookingDates, setBookingDates] = useState(["", ""]);
    const [showConfirmBooking, setShowConfirmBooking] = useState(false);
    const { currentData, PaginationControls, setPaginationData  } = usePagination(cabin.ratings);
    const { isLoggedIn } = useUser();
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();

    
    const getFavoritesData = async () => {
        try {
            const { data } = await rustikApi.get(rustikEndpoints.favorites);
            setIsFavorite(data.cabinDTOS.some(favorite => favorite.id === cabin.id));
        } catch (error) {
            console.error("Error al obtener favoritos", error);
        }
    };

    const handleCloseModalLogin = () => {
        setShowLoginModal(false);
    }

    const handleStartBooking = () => {
        if (!isLoggedIn){
            setShowLoginModal(true);
        }else if(bookingDates[0] === bookingDates[1]){
            setNotification({
                visibility: true,
                type: "warning",
                text: "La fecha de salida no puede ser igual a la de ingreso.",
            });
        }else if(bookingDates[0] !== "" && bookingDates[1] !== "" ) {
            let date1 = bookingDates[0].split(" ")[1];
            let date2 = bookingDates[1].split(" ")[1];
            date1 = date1.split("/")[2] + "-" + date1.split("/")[1] + "-" + date1.split("/")[0];
            date2 = date2.split("/")[2] + "-" + date2.split("/")[1] + "-" + date2.split("/")[0];
            setBookingDates([date1, date2]);
            setShowConfirmBooking(true);
        }
    }

    const getTotalBooking = () => {
        if(bookingDates[0] === "" || bookingDates[1] === ""){
            return -1;
        }
        const date1 = new Date(bookingDates[0] + " 12:00:00");
        const date2 = new Date(bookingDates[1] + " 12:00:00");
        const nights = Number((date2 - date1) / (1000 * 60 * 60 * 24)) 
        const total = nights * Number(cabin.price);
        
        return {total, nights, price: cabin.price} ;
    }

    const handleSaveBooking = async () => {
        showLoaderModal();
        try {
            const bookingData = {
                initialDate: bookingDates[0],
                endDate: bookingDates[1],
                totalPrice: Number(getTotalBooking().total.toFixed(2)),
            }
            await rustikApi.post(`${rustikEndpoints.bookings}/${cabin.id}`, bookingData);
            setNotification({
                visibility: true,
                type: "success",
                text: `Cabaña reservada correctamente.`,
              });
              setIsBooked(true);
        } catch (error) {
            setNotification({
                visibility: true,
                type: "error",
                text: `Error al reservar la cabaña. (${error.response.data})`,
              });
              console.error("Error al guardar, contacte a soporte técnico", error);
        }finally{
            hideLoaderModal();
        }

    }

    useEffect(() => {
        if(!cabin.ratings) return;
        setPaginationData(cabin.ratings.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt)
        }));

    }, [cabin])

    useEffect(() => {
        isLoggedIn && getFavoritesData();

    }, [])


    return (
        <div className="animate-fadeIn w-full py-[26px] px-4 md:px-24 mx-auto">
            <div className='transition-all' >
                <div className='w-full flex flex-col md:flex-row justify-between md:items-center mb-8'>
                    <PageTitleAndBack title={`${cabin.category} / ${cabin.name}`} />
                    <div className='self-end md:self-auto' >
                        <ShareFavButtons cabin={cabin} url={url} isFavorite={isFavorite} refreshFavoritos={getFavoritesData} />
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Imggrabde */}
                        <div className="h-64 md:h-96 overflow-hidden rounded-[1.2rem]">
                            <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[0].url} alt={`Foto 1`} />
                        </div>
                        {/* Imgpeque */}
                        <div className="grid grid-rows-2 gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[1].url} alt={`Foto 2`} />
                                </div>
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[2].url} alt={`Foto 3`} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[3].url} alt={`Foto 4`} />
                                </div>
                                <div className="relative h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[4].url} alt={`Foto 5`} />
                                    <button
                                        className="absolute bottom-2 right-2 bg-[#088395] text-white py-1 px-3 rounded"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Galería
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalles */}
                <div className="flex flex-col md:flex-row justify-between items-start  my-9 ">
                    <div className="mb-4 md:mb-0 w-full">
                        <div className="flex flex-col">
                            <h2 className="montserrat text-2xl md:text-[33px] font-bold text-[#088395] mb-1">
                                {cabin.name} <span className="block md:inline font-roboto text-base text-light-text md:ml-[10px]" >Categoria / <span className="font-roboto text-base text-secondary-color capitalize">{cabin.category.toLowerCase()}</span> </span>
                            </h2>
                            <div className='grid grid-cols-2' >
                            <p className="text-[#EEEEEE] flex items-center ">
                                <img src="/Icons/gps.svg" alt="gps" className="mr-2" />
                                {cabin.location}
                            </p>
                            <p className="text-[#EEEEEE] flex justify-end md:justify-start items-center ">
                               <span className='text-xl mr-2 text-secondary-color' ><FeatureIcon id="I3" /></span>  huéspedes: {cabin.capacity}
                            </p>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="border border-[#FBFFBD] text-[#088395] font-semibold p-2 rounded mr-2">
                                {cabin.averageScore && cabin.averageScore.toFixed(1)}
                            </span>
                            <span className="text-[#EEEEEE] montserrat text-sm ">{getRatingDescription(cabin.averageScore)} </span>
                            <span className="text-[#088395] ml-2 text-sm">{cabin.totalRatings} reseñas</span>
                        </div>
                        <div className="max-w-2xl mt-6  ">

                            <h2 className="text-xl md:text-2xl font-bold text-[#088395] mb-2">Detalles</h2>
                            <p className="py-4 text-[#EEEEEE] text-sm md:text-base">
                                {cabin.description}
                            </p>
                        </div>
                        <div className="flex  flex-col max-w-2xl   ">
                            <h2 className="text-xl md:text-2xl font-bold text-[#088395] my-4">Características</h2>
                            <div className='mb-14 ' >
                                <ul className='flex flex-wrap gap-x-10 gap-y-8 '>
                                    {cabin.cabinFeatures && cabin.cabinFeatures.sort((a, b) => b.hasQuantity - a.hasQuantity).map((feature) => (
                                        <li key={feature.id} className="text-light-text text-lg md:text-xl flex items-center">
                                            <span className='text-[2.5rem] text-secondary-color mr-[14px]' ><FeatureIcon id={feature.featureIcon} /></span>
                                            <p className='text-wrap' >
                                                {feature.featureName} {feature.quantity ? <span className='border border-secondary-color px-3 py-1 rounded-md max-h-12' > {feature.quantity}</span> : ''}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col items-start md:items-end relative top-[-31px] w-full">
                        {/* <h3 className="text-lg md:text-xl font-semibold text-[#088395]">
                            <span className="text-xl md:text-2xl">${cabin.price}</span>
                            <span className="text-sm md:text-lg font-light"> p/noche</span>
                        </h3> */}
                        {/* <button className="mt-2 bg-[#FBFFBD] text-[#0C1123] h-10 px-4 rounded font-semibold" onClick={setSelectDateIsOpen}>
                            Reservar
                        </button> */}

                        
                        {
                            !showConfirmBooking ? ( 
                                <SelectDate  cabin={cabin} bookingDates={bookingDates } setBookingDates={setBookingDates} handleStartBooking={handleStartBooking} /> 
                            ) : (
                                <DetalleReserva bookingDates={bookingDates} 
                                    totalBooking={getTotalBooking} 
                                    capacity={cabin.capacity}  
                                    onEdit={ ()=> setShowConfirmBooking(false) } 
                                    onConfirm = { handleSaveBooking }
                                    isBooked={isBooked}
                                />
                            )
                        }
                    </div>
                   
                </div>
                
               
              
                <Policies />
                <div className="mt-16">
                    <Rating score={cabin.averageScore} totalRatings={cabin.totalRatings} getCabin={getCabin} />
                </div>
                <div className='transition-all' >
                {
                    currentData.length > 0 && currentData.map(review => {
                        return (
                            <div key={review.id} >
                                <Reviews review={review} /></div>
                        )
                    })
                }
                </div>
                <PaginationControls />
                
            </div>
            
            <CarouselModal cabin={cabin} showCarousel={showModal} onClose={() => setShowModal(false)} />
            {showLoginModal && <ModalLogin onClose={handleCloseModalLogin} />}
            
        </div>
    );
};

export default Catalog;
