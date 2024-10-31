import Card from "./Card";


const CatalogList = ({ myCabins, page, handleShowMore }) => {

  

  return (
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
  );
};

export default CatalogList;
