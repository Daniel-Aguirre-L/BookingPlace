import LoginForm from "./LoginForm"


const ModalLogin = ({onClose = () => {}}) => {
  return (
    <div className='animate-fadeIn fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur z-[51] overflow-visible' >
        <div className='bg-black bg-opacity-70 p-10 rounded-xl relative'>
        <button
        type="button"
        className="absolute top-3 right-3 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 active:scale-95"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
            <h3 className="text-center text-2xl my-5">Inicia sesión para continuar</h3>
            <LoginForm onLogin={onClose} />

        </div>
    </div>
  )
}

export default ModalLogin