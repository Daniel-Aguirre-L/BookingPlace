import { useEffect, useState } from "react";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import PaginationInitialControl from "../Components/PaginationInitialControl";
import Loader from "../Components/loaders/Loader";
import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import Warning from "../Components/Warning";
import useLoaderModalStore from "../store/useLoaderModalStore";
import useNotificationStore from "../store/useNotificationStore";

const ManageBooking = () => {

    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
    const { setNotification } = useNotificationStore();
    const [warningIsOpen, setWarningIsOpen] = useState({ status: false, message: "" });
    const [confirm, setConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleSetSearchTerm = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };


    const getBookings = async () => {
        try {
            setIsLoading(true);
            const searchParams = new URLSearchParams();
            searchParams.append("page", (currentPage - 1));
            searchParams.append("size", 10);
            searchParams.append("searchTerm", searchTerm);
            const { data } = await rustikApi.get(`${rustikEndpoints.adminBookings}?${searchParams}`);
            setBookings(data.content);
            setTotalPages(data.totalPages);
            
        } catch (error) {
            console.error("Error al llamar a la api", error);
        }finally{
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            showLoaderModal();
            await rustikApi.delete(`${rustikEndpoints.bookings}/${selectedId}`);
            await getBookings();
            
            setNotification({
                visibility: true,
                type: "success",
                text: "Reserva Cancelada correctamente.",
            });
        } catch (error) {
            setNotification({
                visibility: true,
                type: "error",
                text: `Error al cancelar la reserva. (${error.response.data})`,
            });
            console.error("Error al borrar, contacte a soporte técnico", error);
        } finally {
            hideLoaderModal();
            setSelectedId(null);
            getBookings();
        }
    };

    useEffect(() => {
        if (confirm) {
            handleDelete();
            setConfirm(false);
        }
    }, [confirm]);

    useEffect(() => {
        if (selectedId) {
            setWarningIsOpen({
                status: true,
                message: "¿Estás segur@ de que quieres Cancelar esta reserva?",
            });
        }
    }, [selectedId]);


    useEffect(() => {
         if (searchTerm) {
            setBookings([]);
            setIsLoading(true);
            const timer = setTimeout(() => {
                getBookings();
              }, 1500);
              return () => clearTimeout(timer);
         }else if (currentPage > 1){
            setBookings([]);
            setIsLoading(true);
            const timer = setTimeout(() => {
                getBookings();
              }, 500);
              return () => clearTimeout(timer);
         }else{
            getBookings();
         }
        
    }, [searchTerm, currentPage]);

    return (
        <div className="animate-fadeIn" >
            <div className="container w-full px-5" >
                <div className="py-8 animate-fadeIn">
                    <div className="flex w-full justify-between items-center mb-12">
                        <PageTitleAndBack title={`Reservas`} searchTerm={searchTerm} setSearchTerm={handleSetSearchTerm} />
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-3xl p-2">
                            <thead className=" w-full h-full ">
                                <tr>
                                    <th
                                        className="px-3 py-5 w-10 text-center  text-primary-color  tracking-wider font-montserrat">
                                        id-reserva
                                    </th>

                                    <th
                                        className="px-3 py-5   text-primary-color  tracking-wider text-center font-montserrat">
                                        Cabaña
                                    </th>
                                    <th
                                        className="px-3 py-5   text-primary-color  tracking-wider text-center font-montserrat">
                                        Usuario
                                    </th>
                                    <th
                                        className="px-3 py-5 w-32   text-primary-color  tracking-wider text-center font-montserrat">
                                        Fecha Ingreso
                                    </th>
                                    <th
                                        className="px-3 py-5 w-32   text-primary-color  tracking-wider text-center font-montserrat">
                                        Fecha Salida
                                    </th>
                                    <th
                                        className="px-3 py-5 w-40   text-primary-color  tracking-wider text-center font-montserrat">
                                        Precio Total
                                    </th>
                                    <th
                                        className="px-3 py-5 w-24   text-primary-color  tracking-wider text-center font-montserrat">
                                        Estado
                                    </th>
                                    <th className="px-3 py-5 w-14   text-primary-color  tracking-wider text-center font-montserrat">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white rounded-3xl">
                                {isLoading && 
                                    <tr className="animate-fadeIn" >
                                        <td colSpan="8" className="margin-auto w-full ">
                                            <div className="flex flex-col justify-center items-center h-24 text-background-dark">
                                                <Loader />
                                                <span>Cargando...</span>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {!isLoading && bookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-gray-200 border-[5px] animate-fadeIn">
                                        <td className="px-3 py-3 ">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.id}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 ">
                                            <Link 
                                                to={`${routeList.CATALOG_DETAIL}/${booking.cabin.id}`}
                                                className="relative text-gray-900 text-left whitespace-no-wrap font-montserrat grid grid-cols-[50px_1fr] items-center gap-10 hover:scale-105 transition-all"
                                            >
                                                <div
                                                    className="w-20 h-20 relative bg-cover bg-center bg-no-repeat rounded-lg hover:scale-[150%]"
                                                    style={{
                                                        backgroundImage: `url(${booking.cabin.images[0].url})`,
                                                    }}
                                                ></div>
                                                {booking.cabin.name}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-3 flex flex-col items-center">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.user.name} {booking.user.surname} 
                                            </p>
                                            <a href={`mailto:${booking.user.email}`} className="w-full text-gray-900 text-center whitespace-no-wrap font-montserrat hover:text-primary-color hover:scale-105 transition-all">
                                                {booking.user.email}
                                            </a>
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.user.phone}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 ">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.initialDate}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 ">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.endDate}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 ">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                ${booking.totalPrice ? booking.totalPrice.toFixed(2) : 0}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 ">
                                            <p className="text-gray-900 text-center whitespace-no-wrap font-montserrat">
                                                {booking.state}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <div className="flex justify-center items-center gap-5 my-auto ">
                                                <button
                                                    title="Cancelar Reserva"
                                                    className="active:scale-90"
                                                    onClick={() => setSelectedId(booking.id)}
                                                >
                                                    <img src="/Icons/Eliminar.svg" alt="Eliminar cabaña" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-background-dark">
                        <PaginationInitialControl currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={previousPage} firstPage={()=>{setCurrentPage(1)}} lastPage={()=>{setCurrentPage(totalPages)}} />
                    </div>
                </div>
            </div>
            <Warning
                isOpen={warningIsOpen}
                onClose={() => {
                    setWarningIsOpen({ status: false, message: "" });
                    setSelectedId(null);
                }}
                onSubmit={() => {
                    setWarningIsOpen({ status: false, message: "" });
                    setConfirm(true);
                }}
            />
        </div>
    )
}

export default ManageBooking;