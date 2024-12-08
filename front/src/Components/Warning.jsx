

const Warning = ({ onClose, isOpen, onSubmit }) => {
  const handleSubmit = async (e) => {
    onSubmit();
  };

  const handleCloseForm = () => {
    onClose();
  };

  if (!isOpen.status) return null;

  return (
    <div className="animate-fadeIn hs-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-8 z-50 backdrop-blur">
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full sm:w-full max-w-lg bg-white py-2 rounded-lg shadow-md relative z-10">
            <div className="absolute top-0 left-0 right-0 bg-primary-color px-4 py-2 rounded-t-lg text-white z-20">
              <div className="flex items-center gap-3 justify-normal">
              <div className="inline-flex items-center justify-center flex-shrink-0 text-white bg-primary-color rounded-lg">
                  <svg
                    className="w-[1.6rem] h-[1.6rem]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                  </svg>
                </div>
                <h2 className="text-xl font-light font-montserrat">
                  Advertencia
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-primary font-semibold absolute right-3"
                >
                  <img
                    src="/Icons/cerrar.svg"
                    alt="Cerrar"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>

            <div className="pt-16 px-4 w-full">
              <form className="relative space-y-6 w-full">
                <div className=" flex flex-col gap-4 justify-center items-center text-center">
                  <h1 className="text-black font-montserrat text-[1rem]">{isOpen.message}</h1>
                </div>
                <div className="flex justify-center pb-4 px-5 gap-4">
                  <button
                    type="button"
                    className="w-full py-2 px-6 rounded-lg bg-primary-color text-background-white"
                    onClick={handleSubmit}
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    className="w-full py-[0.7rem] px-6 rounded-lg bg-background-dark text-background-white"
                    onClick={handleCloseForm}
                  >
                    Cancelar
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

export default Warning;