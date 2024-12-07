import { useEffect, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints"
import useNotificationStore from "../store/useNotificationStore";
import AddProductModal from "../Components/AddProductModal";
import useLoaderModalStore from "../store/useLoaderModalStore";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import Warning from "../Components/Warning";
import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import { usePagination } from "../hooks/usePagination";


const ManageCatalog = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [cabins, setCabins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [warningIsOpen, setWarningIsOpen] = useState({ status: false, message: "" });
    const [confirm, setConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // Nuevo estado para el ID seleccionado
    const { currentData: currentCabinList, setPaginationData, PaginationControls, setFirstPage } = usePagination(cabins, 5);

    const handleOpenModal = (cabin) => {
        if (cabin && cabin.id) {
            setIsEditing(true);
            setCurrentData(cabin);
        } else {
            setIsEditing(false);
            setCurrentData(null);
        }
        setModalOpen(true);
        window.scrollTo(0, 0);
    };

    const handleCloseModal = () => setModalOpen(false);

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            showLoaderModal();
            await rustikApi.delete(`${rustikEndpoints.cabins}/${selectedId}`);
            const updatedCabins = cabins.filter((cabin) => cabin.id !== selectedId);
            setCabins(updatedCabins);
            setNotification({
                visibility: true,
                type: "success",
                text: "Cabaña eliminada correctamente.",
            });
        } catch (error) {
            console.error("Error al borrar, intente más tarde", error);
        } finally {
            hideLoaderModal();
            setSelectedId(null); // Limpiar el ID seleccionado
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
                message: "¿Estás seguro de que quieres eliminar esta cabaña?",
            });
        }
    }, [selectedId]);

    useEffect(() => {
        const fetchCabins = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.cabins);
                setCabins([...data.reverse()]);
                setPaginationData(data);
            } catch (error) {
                console.error("Error al llamar a la api", error);
            }
        };

        !isModalOpen && fetchCabins();
    }, [isModalOpen]);

    useEffect(() => {
        if (searchTerm) {
            const filter = cabins.filter((cabin) =>
                `${cabin.id} ${cabin.name} ${cabin.category} ${cabin.description}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase().trim())
            );
            if (filter.length > 0) {
                setFirstPage();
                setPaginationData(filter, 1);
            }
        } else {
            setPaginationData(cabins);
        }
    }, [searchTerm]);

    return (
        <div className="animate-fadeIn">
            <div className="container w-full px-5">
                <div className="py-8 animate-fadeIn">
                    <div className="w-full mb-12">
                        <PageTitleAndBack
                            title={`Mis cabañas`}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            buttonText={"Agregar Cabaña"}
                            buttonOnClick={handleOpenModal}
                        />
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-3xl p-2">
                            <thead className=" w-full h-full">
                                <tr>
                                    <th className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-left font-montserrat">
                                        Cabaña
                                    </th>
                                    <th className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Id Cabaña
                                    </th>
                                    <th className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white rounded-3xl">
                                {currentCabinList.map((cabin) => (
                                    <tr key={cabin.id} className="border-b border-gray-200 border-[5px] animate-fadeIn">
                                        <td className="px-5 py-5 flex items-center justify-start gap-7">
                                            <Link
                                                to={`${routeList.CATALOG_DETAIL}/${cabin.id}`}
                                                className="grid grid-cols-[auto_1fr] items-center gap-10"
                                            >
                                                <div
                                                    className="w-32 h-20 relative bg-cover bg-center bg-no-repeat rounded-lg"
                                                    style={{
                                                        backgroundImage: `url(${cabin.images[0].url})`,
                                                    }}
                                                ></div>
                                                <div>
                                                    <p className="text-gray-900 whitespace-no-wrap font-montserrat">
                                                        {cabin.name}
                                                    </p>
                                                    <p className="text-gray-900 whitespace-no-wrap text-xs font-montserrat">
                                                        {cabin.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <Link to={`${routeList.CATALOG_DETAIL}/${cabin.id}`}>
                                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                                    {cabin.id}
                                                </p>
                                            </Link>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <div className="flex justify-center items-center gap-5 my-auto ">
                                                <button
                                                    className="active:scale-90"
                                                    onClick={() => {
                                                        handleOpenModal(cabin);
                                                    }}
                                                >
                                                    <img src="/Icons/Editar.svg" alt="Editar cabaña" />
                                                </button>
                                                <button
                                                    className="active:scale-90"
                                                    onClick={() => setSelectedId(cabin.id)}
                                                >
                                                    <img src="/Icons/Eliminar.svg" alt="Eliminar cabaña" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="h-5 bg-transparent"></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-background-dark">
                        <PaginationControls />
                    </div>
                </div>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                currentData={currentData}
                isEditing={isEditing}
            />
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
    );
};

export default ManageCatalog;
