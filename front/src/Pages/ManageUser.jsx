import { useEffect, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints"
import useNotificationStore from "../store/useNotificationStore";

import AddProductModal from "../Components/AddProductModal";
import useLoaderModalStore from "../store/useLoaderModalStore";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import Avatar from "../Components/Avatar";
import { usePagination } from "../hooks/usePagination";

const ManageUser = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
    const [users, setUsers] = useState([]);
    const { currentData, setPaginationData, PaginationControls } = usePagination(users, 4);

    const handleOpenModal = () => {
        setModalOpen(true);
        window.scrollTo(0, 0);
    }
    const handleCloseModal = () => setModalOpen(false);


    const handleDelete = async (id) => {
        const confirma = confirm("Confirmar eliminar usuario")
        if (!confirma) return;
        try {
            showLoaderModal();
            await rustikApi.delete(`${rustikEndpoints.users}/${id}`);
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.filter((user) => user.id !== id);
                setPaginationData(updatedUsers);
                return updatedUsers;
            });
            setNotification({
                visibility: true,
                type: "success",
                text: "Usuario eliminado correctamente.",
            });
        } catch (error) {
            console.error("Error al borrar, intente más tarde", error);
        } finally {
            hideLoaderModal();
        }
    };

    const handleRsendConfirmationEmail = async () => {
        try {
            showLoaderModal();
            const { data } = await rustikApi.post(`${rustikEndpoints.resendConfirmationEmail}`);
            setNotification({
                visibility: true,
                type: "success",
                text: "Se ha enviado un correo de confirmación a tu correo electrónico.",
            });
        } catch (error) {
            console.error("Error al enviar el correo de confirmación, intente más tarde", error);
        } finally {
            hideLoaderModal();
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.users);
                setUsers(data);
                setPaginationData(data);

            } catch (error) {
                console.error("Error al llamar a la api", error);
            }
        };

        !isModalOpen && fetchUsers();

    }, [isModalOpen]);

    const toggleAdmin = async (userId, isAdmin) => {
        try {
            showLoaderModal();
            const { data: updatedUser } = await rustikApi.put(`${rustikEndpoints.users}/${userId}`, { isAdmin: !isAdmin });

            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) =>
                    user.id === userId ? { ...user, isAdmin: updatedUser.isAdmin } : user
                );
                setPaginationData(updatedUsers);
                return updatedUsers;
            });

            setNotification({
                visibility: true,
                type: "success",
                text: "El rol de administrador se actualizó correctamente.",
            });
        } catch (error) {
            console.error("Error al actualizar el rol de administrador", error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || "No puedes revocar tu propio rol de administrador.";
                setNotification({
                    visibility: true,
                    type: "error",
                    text: errorMessage,
                });
            } else {
                setNotification({
                    visibility: true,
                    type: "error",
                    text: "Error al procesar la solicitud, intente más tarde.",
                });
            }
        } finally {
            hideLoaderModal();
        }
    };

    return (
        <div className="animate-fadeIn" >
            <div className="container w-screen px-5" >
                <div className="py-8 animate-fadeIn">
                    <div className="flex w-full justify-between items-center mb-8">
                        <PageTitleAndBack title={`Usuarios`} />
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-lg p-2">
                            <thead className=" w-full h-full">
                                <tr>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-left font-montserrat">
                                        Usuario
                                    </th>

                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Email
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Teléfono
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white">
                                {currentData.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200 border-[5px] animate-fadeIn ">
                                        <td className="px-5 py-5 flex items-center justify-start gap-7">
                                            <div className="grid grid-cols-[auto_1fr] items-center gap-10" >
                                                <Avatar name={user.name} size={'medium'} />
                                                <div>
                                                    <p className="text-gray-900 whitespace-no-wrap capitalize font-montserrat">{`${user.name.toLowerCase()} ${user.surname.toLowerCase()}`}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <p className="text-gray-900 whitespace-no-wrap text-center font-montserrat">{user.email}</p>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <p className="text-gray-900 whitespace-no-wrap text-center font-montserrat">{user.phone}</p>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <div className="flex justify-center items-center gap-5 my-auto ">
                                                {/* <button
                                                    className="active:scale-90"
                                                >
                                                    <img src="/Icons/Editar.svg" alt="Editar usuario" />
                                                </button> */}
                                                <button
                                                    className="active:scale-90" onClick={() => toggleAdmin(user.id, user.isAdmin)}> <img src={user.isAdmin ? "/Icons/Admin.svg" : "/Icons/NoAdmin.svg"} alt={user.isAdmin ? "Admin icon" : "NoAdmin icon"} />
                                                </button>
                                                <button
                                                    className="active:scale-90"
                                                    onClick={() => handleDelete(user.id)}
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
                    </div>
                    <div className="text-background-dark">
                        <PaginationControls />
                    </div>
                </div>
            </div>

            <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}

export default ManageUser;