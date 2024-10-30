import Card from "./Card";

const CatalogList = () => {
  return (
    <section className="pageMargin gap-5 flex justify-between">
      <Card title={"Cottage 1"} price={"100"}>
        An amazing journey
      </Card>
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
