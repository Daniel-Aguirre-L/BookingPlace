import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import { rustikEndpoints } from "../services/rustkEndPoints";
import { rustikApiForm } from "../services/rustikApi";
import useNotificationStore from '../store/useNotificationStore';
import useLoaderModalStore from '../store/useLoaderModalStore';
import CloseButton from './CloseButton';
import FeatureItem from './FeatureItem';

const AddProductModal = ({onClose, isOpen, currentData, isEditing}) => {
    const { setNotification } = useNotificationStore();
    const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [initialFiles, setInitialFiles] = useState([]);
    const [imagesDeleted, setImagesDeleted] = useState([]);
    const [error, setError] = useState('');
    const [features, setFeatures] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      location: '',
      description: '',
      selectedFeatures: [],
      category: '',
      capacity: ''
    }); 

    useEffect(() => {
      if (isEditing && currentData) {
        const transformedFeatures = currentData.cabinFeatures.map(feature => ({
          featureId: feature.featureId,
          quantity: feature.quantity,
          hasQuantity: feature.hasQuantity
        }));
        setError('');
        setFormData({
          name: currentData.name || '',
          price: currentData.price || '',
          location: currentData.location || '',
          description: currentData.description || '',
          selectedFeatures: transformedFeatures || [],
          category: currentData.category || '',
          capacity:  currentData.capacity || '',
        });
        setInitialFiles(currentData.images)
      } else {
        setInitialFiles([]);
        setError('');
        setUploadedFiles([]);
        setFormData({
          name: '',
          price: '',
          location: '',
          description: '',
          selectedFeatures: [],
          category: '',
          capacity: ''
        });
      }
    }, [isEditing, currentData]);

    useEffect(() => {
      const getFeaturesData = async () => {
        try {
          const { data }  = await rustikApiForm.get(rustikEndpoints.features);
          setFeatures(data.sort((a, b) => b.hasQuantity - a.hasQuantity));
        } catch (error) {
          console.error("Error al llamar a la api", error);
        }
      };

      getFeaturesData();
    }, []);

    
    const handleFileChange = (newFiles, existingFiles, imageDeleted) => {
      setUploadedFiles(newFiles);
      setExistingFiles(existingFiles);
      if(imageDeleted){
        setImagesDeleted(prevDeleteFiles => [...prevDeleteFiles, parseInt(imageDeleted)]);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.currentTarget;

      if (name === 'selectedFeatures') {
        const featureId = Number(value);
        setFormData((prevState) => {
          let selectedFeatures = [...prevState.selectedFeatures];
          if (prevState.selectedFeatures.some(f => f.featureId === featureId)) {
            selectedFeatures = selectedFeatures.filter(f => f.featureId !== featureId);
          } else {
            selectedFeatures.push({ featureId, quantity: 0, /*hasQuantity: selectedFeatures.filter(f => f.featureId === featureId)[0].hasQuantity */ });
          }
    
          return {
            ...prevState,
            selectedFeatures,
          };
        });
      } else if (name === 'quantity') {
        const { featureId, action } = value; 
    
        setFormData((prevState) => {
          const updatedFeatures = prevState.selectedFeatures.map(feature => {
            if (feature.featureId === Number(featureId)) {
              return {
                ...feature,
                quantity: action === 'increase' ? feature.quantity + 1 : Math.max(feature.quantity - 1, 0),
                hasQuantity: true
              };
            }
            return feature;
          });

          if (!updatedFeatures.some(f => f.featureId === Number(featureId))) {
            updatedFeatures.push({ featureId: Number(featureId), quantity: action === 'increase' ?  1 : 0 });
          }
    
          return {
            ...prevState,
            selectedFeatures: updatedFeatures,
          };
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const handleClose = () => {
      onClose();
      setError('');
      setUploadedFiles([]);
      setInitialFiles([]);
      setFormData({
        name: '',
        price: '',
        location: '',
        description: '',
        selectedFeatures: [],
        category: '',
        capacity: ''
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (uploadedFiles.length + existingFiles.length  < 5) {
        setError('Debes seleccionar al menos 5 imágenes.');
      } else {
        setError('');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('capacity', formData.capacity);

        formData.selectedFeatures.forEach((feature, index) => {

          if (feature.hasQuantity) {
            data.append(`cabinFeatures[${index}].featureId`, feature.featureId);
            data.append(`cabinFeatures[${index}].quantity`, feature.quantity);
          }else {
            data.append(`cabinFeatures[${index}].featureId`, feature.featureId);
          }
        });
      
        uploadedFiles.forEach((file) => {
          data.append('imagesToUpload', file);
        });
  
        try {
          showLoaderModal();
          let response;
          if(isEditing) {
            response = await rustikApiForm.put(`${rustikEndpoints.cabins}/${currentData.id}`, data);
            if (response.ok) {
              console.log('el array de los id de las imagenes a eliminar son:');
              console.log(imagesDeleted)
            }
          } else {
             response = await rustikApiForm.post(rustikEndpoints.cabins, data);
          }
          setNotification({
            visibility: true,
            type: "success",
            text: "Cabaña agregada correctamente.",
          });
          console.log('Product added successfully:', response.data);
          setFormData({
            name: '',
            price: '',
            location: '',
            description: '',
          }); 
          handleClose();
        } catch (error) {
          setNotification({
            visibility: true,
            type: "error",
            text: "Ya existe una cabaña con ese nombre, elige uno nuevo.",
          });
          console.error('Error adding product:', error);
        }finally{
          hideLoaderModal();
        }
      }

    };

    if (!isOpen) return null;

    return (
      <div className="animate-fadeIn hs-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-8 z-50 backdrop-blur">
        <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col md:w-600 bg-[#EEE] border shadow-sm rounded-xl pointer-events-auto h-[85vh] overflow-auto">
            <div className="sticky top-0 flex justify-between items-center py-3 px-4 border-b bg-[#088395]  rounded-t-xl">
              <h3 className="font-bold text-[#EEEEEEEE]">{isEditing? 'Editar ':'Agregar '} Cabaña</h3>
              <CloseButton onClick={handleClose} /> 
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
                  <label htmlFor="input-label-cap" className="block text-base mb-2 text-[#088395]">Capacidad</label>
                  <input
                    type="number" 
                    id="input-label-cap"
                    name="capacity"
                    min={0}
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="py-3 px-4 h-11  block w-full  border-[#9CA3AF] text-[#9CA3AF] border  rounded-lg text-base bg-[#FFF] border-[#A9AEB9]"
                    placeholder="Ej. 10"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-label-cat" className="block text-base mb-2 text-[#088395]">Categoría</label>
                  <select
                    id="input-label-cat"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="py-3 px-4  block w-full border-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9] text-[#9CA3AF]"
                  >
                     <option value="" disabled defaultValue>Seleccione una opción</option>
                    <option value="GLAMPING">Glamping</option>
                    <option value="RUSTICA">Rustica</option>
                    <option value="INVIERNO">Invierno</option>
                    <option value="VERANO">Verano</option>
                    <option value="MODERNA">Moderna</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="input-label-carac" className="block text-base mb-2 text-[#088395]">Características</label>
                  {features.map((feature) => (
                    <FeatureItem
                      key={feature.id}
                      feature={feature}
                      isSelected={formData.selectedFeatures.some(f => f.featureId === feature.id)}
                      quantity={formData.selectedFeatures.find(f => f.featureId === feature.id)?.quantity || 0}
                      onToggle={handleInputChange}
                    />
                  ))}
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
                  <FileUpload onChange={handleFileChange} error={error} setError={setError} initialImages={ initialFiles}/>
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
        
      </div>
    )
}

export default AddProductModal;