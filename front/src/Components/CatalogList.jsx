import Card from "./Card";

const CatalogList = ({ myCabins, page, handleShowMore, continuar, filter, handleOnClick }) => {


  return (
    <>
      <section className="pageMargin gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center" id="cabañas">
        {
          myCabins && myCabins.map(({ id, name, description, price, images }) => (
            <Card key={id} title={name} price={price} images={images} id={id} >
              {`${description.slice(0, 100)}`.slice(0, 37)}{description.length > 35 && '...'}
            </Card>
          ))
        }
        {
          !myCabins && filter && (
            <div className="flex w-full items-center justify-center col-span-full h-full"  >
              <p className="text-4xl">No hay cabañas que coincidan con la búsqueda</p>
            </div>
          )
        }
        <div className="flex w-full justify-center col-span-full"  >
          {
            page >= 1 && !continuar && !filter && (
              <button
                className="px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
                onClick={handleShowMore}
              >
                Mostrar más
              </button>

            )
          }
          {
            filter && (
              <button
                className="px-[0.8rem] py-[0.6rem] border-[2px] border-light-text rounded-[0.4rem]"
                onClick={handleOnClick}
              >
                Quitar Filtro
              </button>
            )
          }
          {
            continuar && !filter && (<p className="text-xl">¡Estas son todas nuestras cabañas!</p>)
          }
        </div>
      </section>
    </>
  );
};

export default CatalogList;
