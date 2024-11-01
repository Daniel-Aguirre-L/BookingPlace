import React from 'react'
import Loader from './Loader'

const LoaderModal = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 ' >
        <Loader />
    </div>
  )
}

export default LoaderModal