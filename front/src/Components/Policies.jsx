import React, { useState } from "react";

const Policies = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className="flex justify-between items-center py-4">
                <h2 className="text-2xl text-primary-color font-bold font-montserrat">Políticas</h2>
                <button
                    onClick={handleExpandToggle}
                    className="mt-2 border border-secondary-color text-text-light-color h-10 px-4 rounded font-semibold font-montserrat"
                >
                    {expanded ? "Ver menos" : "Ver todo"}
                </button>
            </div>

            <h3 className="text-lg font-montserrat py-2 ">
                Políticas de Uso de Cabañas Arrendadas
            </h3>

            <div className="mt-2 text-sm text-light-text">
                <span className="text-secondary-color font-semibold font-montserrat ">Políticas de Uso</span>
                <ul className="list-inside list-disc pl-4 my-3">
                    <li className="font-normal leading-[125%]">
                        <span>Capacidad:</span> Cada cabaña tiene una capacidad máxima de ocupantes que debe ser respetada.
                    </li>
                    <li className="font-normal leading-[125%]">
                        <span>Respeto y Convivencia:</span> Pedimos a nuestros huéspedes que mantengan un comportamiento respetuoso hacia otros huéspedes y el entorno.
                    </li>
                    <li className="font-normal leading-[125%]">
                        <span>Prohibiciones:</span> No se permite fumar dentro de las cabañas ni el uso de sustancias ilícitas. Las mascotas solo están permitidas en cabañas designadas{" "}
                        {expanded ? (
                            <span>como "pet-friendly".</span>
                        ) : (
                            <>
                                designadas...{" "}
                                <span
                                    onClick={handleExpandToggle}
                                    className="text-light-color underline cursor-pointer"
                                >
                                    Leer más
                                </span>
                            </>
                        )}
                    </li>
                </ul>


                {expanded && (
                    <>
                        <span className="text-secondary-color font-semibold font-montserrat">Política de Entrada y Salida</span>
                        <ul className="list-inside list-disc pl-4 my-3">
                            <li className="font-normal text-sm">
                                <span>Hora de Entrada (Check-in):</span> A partir de las 15:00 horas.
                            </li>
                            <li className="font-normal text-sm">
                                <span>Hora de Salida (Check-out):</span> Hasta las 11:00 horas.
                            </li>
                            <li className="font-normal text-sm">
                                <span>Llegadas Tardías:</span> Si planeas llegar después de las 18:00 horas, por favor avísanos con antelación.
                            </li>
                        </ul>

                        <span className="text-secondary-color font-semibold font-montserrat">Política de Limpieza</span>
                        <ul className="list-inside list-disc pl-4 my-3">
                            <li className="font-normal text-sm">
                                <span>Mantenimiento:</span> Las cabañas deben mantenerse en buen estado durante la estancia.
                            </li>
                            <li className="font-normal text-sm">
                                <span>Limpieza Final:</span> Incluimos un servicio de limpieza final en tu tarifa de arrendamiento. Sin embargo, agradecemos que los huéspedes dejen la cabaña recogida, sin basura y con los utensilios <span className="inline-block ml-5">de cocina lavados.</span>
                            </li>
                            <li className="font-normal text-sm">
                                <span>Servicio de Limpieza Adicional:</span> Ofrecemos servicios de limpieza diaria por un costo adicional. Por favor, contacta con nuestro equipo para más detalles.
                            </li>
                        </ul>

                        <span className="text-secondary-color font-semibold font-montserrat">Política de Cancelación y Reembolso</span>
                        <ul className="list-inside list-disc pl-4 my-3">
                            <li className="font-normal text-sm">
                                <span>Cancelaciones:</span> Las cancelaciones deben realizarse al menos 7 días antes de la fecha de llegada para obtener un reembolso completo.
                            </li>
                            <li className="font-normal text-sm">
                                <span>Modificaciones:</span> Las modificaciones en las reservas están sujetas a disponibilidad y pueden implicar cargos adicionales.
                            </li>
                        </ul>

                        <span className="text-secondary-color font-semibold font-montserrat">Contacto de Emergencia</span>
                        <ul className="list-inside list-disc pl-4 my-3">
                            <li className="font-normal text-sm">
                                <span>Teléfono de Emergencia:</span> Para cualquier emergencia durante tu estancia, por favor contacta con nosotros al [número de emergencia].
                            </li>
                        </ul>

                        <span className="text-secondary-color font-semibold font-montserrat">Responsabilidades del Huésped</span>
                        <ul className="list-inside list-disc pl-4 my-3">
                            <li className="font-normal text-sm">
                                Daños: Cualquier daño causado a la propiedad debe ser reportado y puede incurrir en costos adicionales.
                            </li>
                            <li className="font-normal text-sm">
                                <span>Pérdidas:</span> No nos hacemos responsables por pérdidas de objetos personales.
                            </li>
                        </ul>

                        <p className="montserrat" >¡Disfruta tu estancia y si necesitas algo, no dudes en contactarnos!</p>
                    </>
                )}
            </div>
        </>
    );
};

export default Policies;
