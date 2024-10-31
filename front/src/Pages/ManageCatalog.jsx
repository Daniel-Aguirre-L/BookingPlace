import React, {useState} from "react";
import AddProductModal from "../Components/AddProductModal";

const ManageCatalog = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <>
           <button  type="button"  onClick={handleOpenModal} >Agregar Cabaña</button>
            <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}

export default ManageCatalog;