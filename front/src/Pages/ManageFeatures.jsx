import { useEffect, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints"
import useNotificationStore from "../store/useNotificationStore";

import useLoaderModalStore from "../store/useLoaderModalStore";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import FeatureIcon from "../Components/icons/FeatureIcon";
import FormFeature from "../Components/FormFeature";
import { usePagination } from "../hooks/usePagination";

const ManageFeatures = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
    const [features, setFeatures] = useState([]);
    const { currentData: currentCabinList, setPaginationData,  PaginationControls } = usePagination(features, 5);    
    const handleOpenModal = () => {
        setModalOpen(true);
        window.scrollTo(0, 0);
    }
    const handleCloseModal = () => {
        setCurrentData({});
        setModalOpen(false)

    };


    const handleEditFeature = (feature) => {
        setCurrentData(feature);
        setModalOpen(true);
    }
    
    const handleDelete = async (id) => {
        const confirma = confirm("Confirmar eliminar característica")
        if (!confirma) return;
        try {
            showLoaderModal();
            await rustikApi.delete(`${rustikEndpoints.features}/${id}`);
            const updateFeatures = features.filter((feature) => feature.id !== id);
            setFeatures(updateFeatures);
            setNotification({
                visibility: true,
                type: "success",
                text: "Característica eliminada correctamente.",
            });
        } catch (error) {
            setNotification({
                visibility: true,
                type: "error",
                text: "Error al borrar, intente más tarde.",
            });
            console.error("Error al borrar, contacte a soporte técnico", error);
        } finally {
            hideLoaderModal();
        }
    };

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.features);
                setFeatures(data);
                setPaginationData(data.sort((a,b)=> a.name.localeCompare(b.name)));

            } catch (error) {
                console.error("Error al llamar a la api", error);
            }
        };

        !isModalOpen && fetchFeatures();

    }, [isModalOpen]);


    return (
        <div className="animate-fadeIn" >
            <div className="container w-screen px-5" >
                <div className="py-8 animate-fadeIn">
                    <div className="flex w-full justify-between items-center ">
                        <PageTitleAndBack title={`Mis caracteristicas`} />
                        <div className="px-5 py-4 flex justify-end">
                            <button
                                className="bg-[#088395] rounded-xl py-2 px-9 max-sm:px-4 text-[#EEEEEEEE]"
                                type="button"
                                onClick={handleOpenModal}
                            >
                                Agregar Característica
                            </button>
                        </div>
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-3xl p-6">
                            <thead className=" w-full h-full">
                                <tr>
                                    <th
                                        className="px-5 py-7 text-xl  text-primary-color tracking-wider text-center font-montserrat">
                                        Icono
                                    </th>

                                    <th
                                        className="px-5 py-7 text-xl  text-primary-color tracking-wider text-center font-montserrat">
                                        Nombre de características
                                    </th>
                                    
                                    <th
                                        className="px-5 py-7 text-xl  text-primary-color tracking-wider text-center font-montserrat">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white rounded-3xl">
                                {currentCabinList.map((feature) => (
                                    <tr key={feature.id} className="border-b border-gray-200 border-[5px] animate-fadeIn ">
                                        <td className="px-5 py-10 flex items-center justify-center gap-7">
                                            <div className=" text-background-dark text-5xl " >                                                                        
                                                <FeatureIcon id={feature.icon} />                                               
                                            </div>
                                        </td>
                                            <td className="px-5 py-5 min-w-40">
                                                <div>
                                                    <p className="text-gray-900 whitespace-no-wrap text-center font-montserrat">{feature.name}</p>
                                                </div>
                                            </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <div className="flex justify-center items-center gap-5 my-auto ">
                                                <button
                                                    className="active:scale-90"
                                                    onClick={() => handleEditFeature(feature)}
                                                >
                                                    <img src="/Icons/Editar.svg" alt="Editar usuario" />
                                                </button>                                             
                                                <button
                                                    className="active:scale-90"
                                                    onClick={() => handleDelete(feature.id)}
                                                >
                                                    <img src="/Icons/Eliminar.svg" alt="Eliminar usuario" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="h-5 bg-transparent"></tr>
                            </tbody>
                        </table>
                        <div className="text-background-dark">
                            <PaginationControls />
                        </div>
                    </div>
                </div>
            </div>

            <FormFeature isOpen={isModalOpen} onClose={handleCloseModal} currentData={currentData} isEditing={currentData.id || false }  /> 
        </div>
    )
}

export default ManageFeatures;