import { useEffect, useState } from 'react';
import InputField from "./InputField";
import FeatureIcon from './icons/FeatureIcon';
import IconDropdown from './IconDropdown';
import useNotificationStore from '../store/useNotificationStore';
import useLoaderModalStore from '../store/useLoaderModalStore';
import { rustikApi } from '../services/rustikApi';
import { rustikEndpoints } from '../services/rustkEndPoints';

const FormFeature = ({ onClose, isOpen, currentData, isEditing }) => {
  const { setNotification } = useNotificationStore();
  const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();

  const [feature, setFeature] = useState({ id: null, name: '', icon: null, hasQuantity: false, });
  const [errors, setErrors] = useState({ name: '', icon: null, hasQuantity: false, });


  useEffect(() => {
    if (isEditing && currentData.id) {
      setFeature({ ...currentData });
    }
  }, [isEditing, currentData]);

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeature((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', icon: '', };
    if (!feature.name) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }
    if (feature.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    if (!feature.icon) {
      newErrors.icon = 'El icono es obligatorio';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      showLoaderModal();
      try {
        if (isEditing) {
          await rustikApi.put(`${rustikEndpoints.features}/${feature.id}`, feature);
        }else{
          await rustikApi.post(`${rustikEndpoints.features}`, feature);
        }

        setNotification({
          visibility: true,
          type: "success",
          text: `Característica ${feature.name} guardada correctamente.`,
        });
        setFeature({ id: null, name: '', icon: null, hasQuantity: false, });
        onClose();
      } catch (error) {
        setNotification({
          visibility: true,
          type: "error",
          text: "Error al guardar, intente más tarde.",
        });
        console.error("Error al guardar, contacte a soporte técnico", error);
      } finally {
        hideLoaderModal();
      }

    }

  };


  const handleCloseForm = () => {
    setFeature({ name: '', icon: null, hasQuantity: false, });
    onClose();
  };


  const handleSelectIcon = (icon) => {
    setFeature((prev) => ({
      ...prev,
      icon,
    }));
  }

  const toggleHasQuantity = () => {
    setFeature((prev) => ({
      ...prev,
      hasQuantity: !prev.hasQuantity,
    }));
  }


  if (!isOpen) return null;

  return (
    <div className="animate-fadeIn hs-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-8 z-50 backdrop-blur">
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">

        <div className="flex flex-col items-center justify-center p-6">
          {/* Formulario */}
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md relative z-10">
            <div className="absolute top-0 left-0 right-0 bg-primary-color p-4 rounded-t-lg text-white z-20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light font-monserrat ">{isEditing ? "Editar" : "Agregar"} Característica</h2>
                <button
                  onClick={handleCloseForm}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-primary font-semibold"
                >
                  <img
                    src="/Icons/cerrar.svg"
                    alt="Cerrar"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>

            <div className="pt-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <label htmlFor='name' className="block mb-1 text-primary-color">Nombre Características</label>
                  <InputField
                    id="name"
                    name="name"
                    label="Nombrar Característica"
                    placeholder="Ej. Lavandería"
                    value={feature.name}
                    onChange={handleFeatureChange}
                    className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
                  <div className="w-full sm:w-1/2">
                    <label className="block mb-1 text-primary-color">Agregar Icono</label>
                    <div className="text-black">
                      <IconDropdown onSelect={handleSelectIcon} defaultValue={currentData.icon || ""} />
                    </div>
                    {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}
                  </div>
                  <div className=" sm:w-1/2 ">
                    <label className="block mb-1 w-full text-center text-primary-color">Require cantidad</label>
                    <button
                      type="button"
                      className="cursor-pointer w-full flex justify-center pt-3 "
                      onClick={toggleHasQuantity}
                    >
                      {
                        feature.hasQuantity ? (
                          <img  src="/Icons/check-color.svg" alt="Seleccionar característica" className="animate-fadeIn w-6 h-6" />
                        ) : (
                          <img  src="/Icons/cancel-color.svg" alt="Seleccionar característica" className="animate-fadeIn w-6 h-6" />
                        )
                      }
                    </button>
                  </div>
                </div>
                <div className="mb-6 flex flex-col items-center ">
                  <h3 className="block mb-1 text-primary-color">Vista previa</h3>
                  {(feature.icon || feature.name) && (
                    <div className="animate-fadeIn grid grid-cols-[45px_auto] border border-[#A9AEB9] rounded py-2.5 px-3 font-normal text-light-text bg-dark-text" >
                      <div className='text-3xl text-secondary-color ' >
                        {feature.icon && <FeatureIcon id={feature.icon} />}
                      </div>
                      <p className='text-xl' >{feature.name} {feature.hasQuantity && <span className=' ml-2 border border-secondary-color px-3 py-1 rounded-md max-h-12' >2</span>} </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center  pt-5 pb-5">
                  <button
                    type="submit"
                    className="w-full py-2 px-6 rounded-lg bg-primary-color text-background-white"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FormFeature;

