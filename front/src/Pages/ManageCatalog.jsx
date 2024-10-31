import { useEffect, useState } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints"


const ManageCatalog = () => {
    const [cabins, setCabins] = useState([]);

    useEffect(() => {
        const fetchCabins = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.cabins);
                setCabins(data);
            } catch (error) {
                console.error("Error al llamar a la api", error);
            }
        };
        fetchCabins();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Mis cabañas</h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                            <div className="relative">
                                <select
                                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <input placeholder="Search"
                                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-light-text bg-light-text text-left text-xs  text-primary-color  tracking-wider">
                                            Cabaña
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-light-text bg-light-text text-left text-xs  text-primary-color  tracking-wider">

                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-light-text bg-light-text text-left text-xs  text-primary-color  tracking-wider">
                                            Id Cabaña
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-light-text bg-light-text text-left text-xs  text-primary-color  tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cabins.map((cabin) => (
                                        <tr key={cabin.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="w-full h-full rounded-lg"
                                                            src={cabin.images[0].url}
                                                            alt={cabin.name}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{cabin.name}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{cabin.id}</p>
                                            </td>
                                            <td className="px-5 py-7 border-b border-gray-200 bg-white text-sm flex justify-between items-center">
                                                <span>
                                                    <img src="/Icons/Editar.svg" alt="Editar cabaña" />
                                                </span>
                                                <span>
                                                    <img src="/Icons/Eliminar.svg" alt="Eliminar cabaña" />
                                                </span>
                                            </td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </table>
                                <button
                                    className="bg-[#088395] rounded-xl py-2 px-9 max-sm:px-4 text-[#EEEEEEEE]"
                                    type="button"
                                >
                                    Agregar Cabaña
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageCatalog;