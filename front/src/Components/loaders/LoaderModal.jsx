import Loader from './Loader'

const LoaderModal = () => {
  return (
    <div className='animate-fadeIn fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur z-[51]' >
        <div className='bg-black bg-opacity-70 p-10 rounded-xl'>
          <h3 className='text-xl font-bold text-center'>Cargando...</h3>
          <Loader />
        </div>
    </div>
  )
}

export default LoaderModal