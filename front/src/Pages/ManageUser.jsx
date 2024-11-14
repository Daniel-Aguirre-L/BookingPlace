import { useEffect, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints"
import useNotificationStore from "../store/useNotificationStore";

import AddProductModal from "../Components/AddProductModal";
import useLoaderModalStore from "../store/useLoaderModalStore";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import Avatar from "../Components/Avatar";

const ManageUser = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();

    const handleOpenModal = () => {
        setModalOpen(true);
        window.scrollTo(0, 0);
    }
    const handleCloseModal = () => setModalOpen(false);

    const [users, setUsers] = useState([]);

    const handleDelete = async (id) => {
        const confirma = confirm("Confirmar eliminar usuario")
        if (!confirma) return;
        try {
            showLoaderModal();
            await rustikApi.delete(`${rustikEndpoints.users}/${id}`);
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.users);
                setUsers(data);
                console.log(data);

            } catch (error) {
                console.error("Error al llamar a la api", error);
            }
        };

        !isModalOpen && fetchUsers();

    }, [isModalOpen]);

    const toggleAdmin =  async (userId,isAdmin) => { 
       try {
        const { data } = await rustikApi.put(`${rustikEndpoints.users}/${userId}`,{isAdmin:!isAdmin});
        console.log(data);

        setUsers(prevUsers => prevUsers.map(user => user.id === userId ? 
            { ...data } : user ) ); 
        
       } catch (error) {
        console.error("Error al llamar a la api", error);
       }
       
    };

    return (
        <div className="animate-fadeIn" >
            <div className="container w-screen px-5" >
                <div className="py-8 animate-fadeIn">
                    <div className="flex w-full justify-between items-center">
                        <PageTitleAndBack title={`Usuarios`} />
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-lg p-2">
                            <thead className=" w-full h-full">
                                <tr>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-left">
                                        Usuario
                                    </th>

                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center">
                                        Email
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center">
                                        Teléfono
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white">
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200 border-[5px]">
                                        <td className="px-5 py-5 flex items-center justify-start gap-7">
                                            <div className="grid grid-cols-[auto_1fr] items-center gap-10" >                                                                        
                                                <Avatar name={user.name} size={'medium'}/>                                                 
                                                <div>
                                                    <p className="text-gray-900 whitespace-no-wrap">{`${user.name} ${user.surname}`}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <p className="text-gray-900 whitespace-no-wrap text-center">{user.email}</p>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <p className="text-gray-900 whitespace-no-wrap text-center">{user.phone}</p>
                                        </td>
                                        <td className="px-5 py-5 min-w-40">
                                            <div className="flex justify-center items-center gap-5 my-auto ">
                                                {/* <button
                                                    className="active:scale-90"
                                                >
                                                    <img src="/Icons/Editar.svg" alt="Editar usuario" />
                                                </button> */}
                                                <button
                                                    className="active:scale-90" onClick={() => toggleAdmin(user.id,user.isAdmin)}> <img src={user.isAdmin ? "/Icons/Admin.svg" : "/Icons/NoAdmin.svg"} alt={user.isAdmin ? "Admin icon" : "NoAdmin icon"} />
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}

export default ManageUser;