import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApi } from "../services/rustikApi";
import LoaderModal from './loaders/LoaderModal';

const AddProductModal = ({onClose, isOpen}) => {
    
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      location: '',
      description: '',
    }); 

    const [showLoader, setShowLoader] = useState(false);
  
    const handleFileChange = (files) => {
      setUploadedFiles(files);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (uploadedFiles.length < 5) {
        setError('Debes seleccionar al menos 5 imágenes.');
      } else {
        setError('');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('description', formData.description);
        
        uploadedFiles.forEach((file) => {
          data.append('imagesToUpload', file);
        });
  
        try {
          setShowLoader(true);
          const response = await rustikApi.post(rustikEndpoints.cabins, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          });
          alert('Datos guardados con exito.')
          console.log('Product added successfully:', response.data);
          onClose();
        } catch (error) {
          alert('Ha ocurrido un error, intenta de nuevo.')
          console.error('Error adding product:', error);
        }finally{
          setShowLoader(false);
        }
      }

    };

    if (!isOpen) return null;

    return (
      <div className="hs-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-8 z-50 ">
        <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col md:w-600 bg-[#EEE] border shadow-sm rounded-xl pointer-events-auto h-[85vh] overflow-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b bg-[#088395]  rounded-t-xl">
              <h3 className="font-bold text-[#EEEEEEEE]">Agregar Cabaña</h3>
              <button 
                type="button" 
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full  border-2 border-[#FBFFBD] bg-[#088395] text-gray-800" 
                aria-label="Close" 
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="#FBFFBD" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-4 flex gap-3 flex-col overflow-y-visible ">
                {/** form */}
                <div className="flex gap-2 items-end">
                  <div className="w-9/12">
                    <label htmlFor="input-label-name" className="block text-base mb-2 text-[#088395]">Nombre de cabaña</label>
                    <input 
                      type="text"
                      id="input-label-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="py-3 px-4 h-11 block w-full border-[#9CA3AF] text-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9]"
                      placeholder="Ej. Cabaña Fortuna"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="input-label-price" className="block text-base mb-2 text-[#088395]">Precio</label>
                    <input
                      type="number" 
                      id="input-label-price"
                      name="price"
                      min={0}
                      value={formData.price}
                      onChange={handleInputChange}
                      className="py-3 px-4 h-11  block w-full  border-[#9CA3AF] text-[#9CA3AF] border  rounded-lg text-base bg-[#FFF] border-[#A9AEB9]"
                      placeholder="Ej. 700"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="input-label-location" className="block text-base mb-2 text-[#088395]">Ubicación</label>
                  <input
                    type="text"
                    id="input-label-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="py-3 px-4 h-11 block w-full border-[#9CA3AF] text-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9]"
                    placeholder="Ej. Playa Caño Limones"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-label-desc" className="block text-base mb-2 text-[#088395]">Descripción</label>
                  <textarea
                    id="input-label-desc"
                    name="description"
                    rows={5}
                    cols={30}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="py-3 px-4  block w-full border-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9] text-[#9CA3AF]"
                    placeholder="Texto"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base mb-2 text-[#088395]">Agregar imágenes</label>
                  <FileUpload onChange={handleFileChange} error={error} setError={setError} />
                </div>
                {/** */}
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                <button type="submit" className=" w-44 text-center py-2 px-4 block items-center text-base rounded-lg border border-transparent h-11 bg-[#088395] text-[#EEE] focus:outline-none">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        {showLoader && <LoaderModal />}
      </div>
    )
}

export default AddProductModal;