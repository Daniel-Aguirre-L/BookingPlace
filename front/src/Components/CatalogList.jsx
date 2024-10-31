import Card from "./Card";


const CatalogList = ({myCabins}) => {
  


  return (
    <section className="pageMargin gap-5 flex justify-center flex-wrap max-[1600px]:max-w-[1050px] justify-self-center">
      {
        myCabins && myCabins.map(({id, name, description, price, images}) => (
          <Card key={id}  title={name} price={price} images={images} >
            {description}
          </Card>
        ))
      }
      <Card title={"Cottage 2"} price={"200"}>
        An amazing journey
      </Card>
      <Card title={"Cottage 3"} price={"300"}>
        An amazing journey
      </Card>
      <Card title={"Cottage 4"} price={"400"}>
        An amazing journey
      </Card>
    </section>
  );
};

export default CatalogList;
