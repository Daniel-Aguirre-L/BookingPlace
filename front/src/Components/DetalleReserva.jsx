import React from 'react';

const DetalleReserva = () => {
  return (
    <div className="max-w-[460px] mx-auto">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="p-0 overflow-hidden ">
          <div className="mb-4 mx-auto p-4  border-b border-slate-200 pt-7 pb-7 text-center bg-background-light rounded-xl bg-clip-border  ">
            <h2 className="text-xl font-bold text-primary-color font-monserrat  ">Detalles de reserva</h2>
          </div>

          <table className="w-full mt-3 text-left table-auto">
            <tbody>
              <tr className="shadow-md">
                <td className="p-4 border-b border-slate-200 ">
                  <div className="font-semibold text-background-dark">Fechas</div>
                  <div className="text-background-dark ">8-20 de Ene</div>
                </td>
                <td className="p-4 border-b border-slate-200 text-center ">
                  <button className="active:scale-90">
                    <img src="/Icons/Editar.svg" alt="Editar fechas" />
                  </button>
                </td>
              </tr>

              <tr className="shadow-md">
                <td className="p-4 border-b border-slate-200 ">
                  <div className="font-semibold text-background-dark">Huéspedes</div>
                  <div className=" text-background-dark">2 huéspedes</div>
                </td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <button className="active:scale-90">
                    <img src="/Icons/Editar.svg" alt="Editar huéspedes" />
                  </button>
                </td>
              </tr>

                <td className="p-4">
                  <div className="font-semibold">Precio</div>
                  <div className="text-background-dark">$700.00 x 12 noches</div>
                </td>
            

            </tbody>

        
          </table>
          <div className="flex justify-center items-center py-5">
            <button className="bg-secondary-color text-black-dark h-10 px-4 rounded font-semibold shadow-md">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;
