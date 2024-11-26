import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselModal from './carousel/CarouselModal';
import PageTitleAndBack from './PageTitleAndBack';
import FeatureIcon from './icons/FeatureIcon'
import Comments from './Comments';

const Catalog = ({ cabin }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    // sort array cabin.cabinFeatures by booleano hasQuantity
    
    return (
        <div className="animate-fadeIn w-full p-4 md:p-6 mx-auto">
            <div className='transition-all' >
                <PageTitleAndBack title={`${cabin.category} / ${cabin.name}`} />

                <div className="relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Imggrabde */}
                        <div className="h-64 md:h-96 overflow-hidden rounded-[1.2rem]">
                            <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[0].url} alt={`Foto 1`} />
                        </div>
                        {/* Imgpeque */}
                        <div className="grid grid-rows-2 gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[1].url} alt={`Foto 2`} />
                                </div>
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[2].url} alt={`Foto 3`} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[3].url} alt={`Foto 4`} />
                                </div>
                                <div className="relative h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                    <img className="object-cover h-full w-full rounded-[1.2rem]" src={cabin.images[4].url} alt={`Foto 5`} />
                                    <button
                                        className="absolute bottom-2 right-2 bg-[#088395] text-white py-1 px-3 rounded"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Galería
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalles */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
                    <div className="mb-4 md:mb-0">
                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-bold text-[#088395] mb-1">{cabin.name}</h1>
                            <p className="text-[#EEEEEE] flex items-center">
                                <img src="/Icons/gps.svg" alt="gps" className="mr-2" />
                                {cabin.location}
                            </p>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="border border-[#FBFFBD] text-[#088395] font-semibold p-2 rounded mr-2">
                                4.2
                            </span>
                            <span className="text-[#EEEEEE]">Very Good </span>
                            <span className="text-[#088395] ml-2">371 reviews</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <h2 className="text-lg md:text-xl font-semibold text-[#088395]">
                            <span className="text-xl md:text-2xl">${cabin.price}</span>
                            <span className="text-sm md:text-lg font-light"> p/noche</span>
                        </h2>
                        <button className="mt-2 bg-[#FBFFBD] text-[#0C1123] h-10 px-4 rounded font-semibold">
                            Reservar
                        </button>
                    </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-[#088395] mb-1 ml-4">Detalles</h2>
                <p className="p-4 text-[#EEEEEE] text-sm md:text-base">
                    {cabin.description}
                </p>

                <h2 className="text-xl md:text-2xl font-bold text-[#088395] my-4 ml-4">Características</h2>
                <div className='px-4 mb-14' >

                    <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 '>
                        {cabin.cabinFeatures && cabin.cabinFeatures.sort((a, b) => b.hasQuantity - a.hasQuantity).map((feature) => (
                            <li key={feature.id} className="text-light-text text-lg md:text-xl flex items-center">
                                <span className='text-[2.5rem] text-secondary-color mr-[14px]' ><FeatureIcon id={feature.featureIcon}  /></span>
                                <p  className='text-wrap' >
                                {feature.featureName} {feature.quantity ? <span className='border border-secondary-color px-3 py-1 rounded-md max-h-12' > {feature.quantity}</span> : ''}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                {/** Resenias**/}
                <h2 className="text-xl md:text-2xl font-bold text-[#088395] mb-4 ml-4">Reseñas</h2>
                <Comments />
            </div>

             

            <CarouselModal cabin={cabin} showCarousel={showModal} onClose={() => setShowModal(false)} />
             

     
      

        </div>
    );
};

export default Catalog;
