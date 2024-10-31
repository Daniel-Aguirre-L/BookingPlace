import React from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
    { id: 1, url: "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/hmc4wsso1dnxos4cazae?_a=DAGAACAVZAA0" },
    { id: 2, url: "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/jll9uuuzp9r3ym49bzsn?_a=DAGAACAVZAA0" },
    { id: 3, url: "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/odvqmwc90hncx3jc5mjb?_a=DAGAACAVZAA0" },
    { id: 4, url: "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/tvxnjtbqa8qbjnt2taoa?_a=DAGAACAVZAA0" },
    { id: 5, url: "https://res.cloudinary.com/dmu6eqzqy/image/upload/v1/cabin%201/xvxsev6nndurbuxboqb2?_a=DAGAACAVZAA0" }
];

const Catalog = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full p-4 md:p-6 mx-auto">
            <div className="flex items-center mb-4">
                <button onClick={() => navigate('/')} className="flex items-center text-secondary">
                    <img src="/Icons/arrowleft.svg" alt="Snow Cottage" className="mr-2" />
                    <span className="text-white">Snow Cottage</span>
                </button>
            </div>

            <div className="relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Imggrabde */}
                    <div className="h-64 md:h-96 overflow-hidden rounded-[1.2rem]">
                        <img className="object-cover h-full w-full rounded-[1.2rem]" src={images[0].url} alt={`Cabin ${images[0].id}`} />
                    </div>
                    {/* Imgpeque */}
                    <div className="grid grid-rows-2 gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                <img className="object-cover h-full w-full rounded-[1.2rem]" src={images[1].url} alt={`Cabin ${images[1].id}`} />
                            </div>
                            <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                <img className="object-cover h-full w-full rounded-[1.2rem]" src={images[2].url} alt={`Cabin ${images[2].id}`} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                <img className="object-cover h-full w-full rounded-[1.2rem]" src={images[3].url} alt={`Cabin ${images[3].id}`} />
                            </div>
                            <div className="relative h-32 md:h-48 overflow-hidden rounded-[1.2rem] border-4 border-[#FBFFBD]">
                                <img className="object-cover h-full w-full rounded-[1.2rem]" src={images[4].url} alt={`Cabin ${images[4].id}`} />
                                <button className="absolute bottom-2 right-2 bg-[#088395] text-white py-1 px-3 rounded">
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
                        <h1 className="text-xl md:text-2xl font-bold text-[#088395] mb-1">Snow Cottage</h1>
                        <p className="text-[#EEEEEE] flex items-center">
                            <img src="/Icons/gps.svg" alt="gps" className="mr-2" />
                            Sierra Madre, Mexico
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
                        <span className="text-xl md:text-2xl">$700</span>
                        <span className="text-sm md:text-lg font-light"> p/noche</span>
                    </h2>
                    <button className="mt-2 bg-[#FBFFBD] text-[#0C1123] h-10 px-4 rounded font-semibold">
                        Reservar
                    </button>
                </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-[#088395] mb-1">Detalles</h1>
            <p className="p-4 text-[#EEEEEE] text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );
};

export default Catalog;
