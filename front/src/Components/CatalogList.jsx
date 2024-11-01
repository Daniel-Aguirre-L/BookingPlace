import Card from "./Card";


const CatalogList = ({ myCabins, page, handleShowMore }) => {



  return (
    <>
      <div className="pageMargin flex justify-space-evenly items-center gap-5 mb-5">
        <div className="w-full">
          <label htmlFor="input-label-name" className="block text-base mb-2 text-[#088395]">Buscar Cabaña</label>
          <div className="w-full relative">
            <input
              type="text"
              id="input-label-name"
              name="cabinSerach"
              // value={formData.name}
              // onChange={handleInputChange}
              className="py-3 px-4 h-11 block w-full border-[#9CA3AF] text-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9]"
              placeholder="Ej. Cabaña Fortuna"
            />
            <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center cursor-pointer border-l-2 border-l-background-dark pl-2">
              🔍
            </div>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="input-label-name" className="block text-base mb-2 text-[#088395]">Filtrar por categoría</label>
          <div className="w-full relative">
            <input
              type="text"
              id="input-label-name"
              name="cabinSerach"
              // value={formData.name}
              // onChange={handleInputChange}
              className="py-3 px-4 h-11 block w-full border-[#9CA3AF] text-[#9CA3AF] border rounded-lg text-base  border-[#A9AEB9]"
              placeholder="Ej. Cabaña Familiar"
            />
            <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center cursor-pointer border-l-2 border-l-background-dark pl-2">
              ⛺
            </div>
          </div>
        </div>
      </div>
      <section className="pageMargin gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center">
        {
          myCabins && myCabins.map(({ id, name, description, price, images }) => (
            <Card key={id} title={name} price={price} images={images} id={id} >
              {description}
            </Card>
          ))
        }
        <div className="flex w-full justify-center col-span-full"  >
          {
            page > 1 && (
              <button
                className="px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
                onClick={handleShowMore}
              >
                Mostrar más
              </button>

            )
          }
        </div>
      </section>
    </>
  );
};

export default CatalogList;
