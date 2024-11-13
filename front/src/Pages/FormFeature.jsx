import { useState } from 'react';
import InputField from "../Components/InputField";

const FormFeature = () => {
  const [feature, setFeature] = useState({ name: '', icon: null, vistaPrevia: '' });
  const [formVisible, setFormVisible] = useState(true);

  const handleFeatureChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon") {
      const file = files[0];
      if (file && file.type === "image/svg+xml") {
        setFeature((prev) => ({
          ...prev,
          icon: file,
          vistaPrevia: URL.createObjectURL(file),
        }));
      } 
    } else {
      setFeature((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Característica agregada:", feature);
  };


  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="animate-fadeIn w-full mx-auto">
      {formVisible && (
        <div className="flex flex-col items-center justify-center p-6">
          {/* Formulario */}
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md relative z-10">
            <div className="absolute top-0 left-0 right-0 bg-primary-color p-4 rounded-t-lg text-white z-20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light font-monserrat ">Agregar Característica</h2>
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
                  <label className="block mb-1 text-primary-color">Nombrar Características</label>
                  <InputField
                    name="name"
                    label="Nombrar Característica"
                    placeholder="Ej. Lavandería"
                    value={feature.name}
                    onChange={handleFeatureChange}
                    className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black"
                  />
                </div>


                <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
                  <div className="w-full sm:w-1/2">
                    <label className="block mb-1 text-primary-color">Agregar Icono</label>
                    <div className="relative">
                      <InputField
                        type="file"
                        name="icon"
                        accept=".svg"
                        id="iconInput" 
                        onChange={handleFeatureChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="iconInput"
                        className="w-full flex items-center justify-between border border-[#A9AEB9] rounded p-2.5 cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          {!feature.vistaPrevia && (
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                          )}
                       
                          {feature.vistaPrevia && (
                            <img
                              src={feature.vistaPrevia}
                              alt="Vista previa del icono"
                              className="h-6 w-6 object-contain"
                            />
                          )}
                          <span className="text-sm text-gray-400">
                            {feature.vistaPrevia ? (
                              <div className="flex items-center space-x-2">
                                <img
                                  src="/Icons/selection.svg"
                                  alt="Icono seleccionado"
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                                />
                              </div>
                            ) : (
                              'Selecciona un archivo'
                            )}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>


                  <div className="w-full sm:w-1/2 ">
                    <label className="block mb-1 text-primary-color">Vista Previa</label>
                    <div
                      className={`w-full h-auto border border-[#A9AEB9] rounded p-2.5 flex items-center ${feature.vistaPrevia ? 'bg-[var(--dark-text)]' : 'bg-white'}`}
                    >

                      {feature.vistaPrevia ? (
                        <div className="flex items-center ">
                          <img
                            src={feature.vistaPrevia}
                            alt="Vista previa del icono"
                            className="h-6 w-6 object-contain mr-3"
                          />
                          <p className={`${feature.vistaPrevia ? 'text-white' : 'text-black'}`}>{feature.name}</p>
                        </div>
                      ) : (
                        <p className="text-gray-400">Vista previa</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-cente  pt-14 pb-5">
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
      )}
    </div>
  );
};

export default FormFeature;

