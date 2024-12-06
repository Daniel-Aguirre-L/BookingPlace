import { useState } from "react";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import { usePagination } from "../hooks/usePagination";

const ManageBooking = () => {

    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { currentData: currentCabinList, setPaginationData, PaginationControls, setFirstPage } = usePagination(bookings, 5);


    return (
        <div className="animate-fadeIn" >
            <div className="container w-full px-5" >
                <div className="py-8 animate-fadeIn">
                    <div className="flex w-full justify-between items-center mb-12">
                        <PageTitleAndBack title={`Reservas`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                    <div className="container mx-auto my-4  bg-light-text rounded-3xl shadow-lg">
                        <table className="w-full rounded-3xl p-2">
                            <thead className=" w-full h-full">
                                <tr>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-left font-montserrat">
                                        id-reserva
                                    </th>

                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Cabaña
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Usuario
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Fecha Ingreso
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Fecha Salida
                                    </th>
                                    <th
                                        className="px-5 py-7 text-lg  text-primary-color  tracking-wider text-center font-montserrat">
                                        Precio Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="px-5 bg-white rounded-3xl">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageBooking;