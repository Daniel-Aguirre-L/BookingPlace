

function ImageCard({ src }) {
  return (
    <img
      className="h-fit w-fit bg-slate-500 rounded-[0.7rem] border-[3px] border-secondary-color"
      src={src}
    />
  );
}

function DisplayCard({cabin, handleOnClick}) {
  if (!cabin) return null;
  
  return (
    <section className="pageMargin relative grid grid-cols-2 gap-6 mb-10 max-xl:grid-cols-1 max-xl:max-w-[600px] justify-self-center">
      <div className="relative bg-primary-color rounded-[1.2rem] p-8 flex flex-col">
        <h2 className="text-[2.5rem] font-bold mb-10 montserrat w-10/12">
          {cabin.name}
        </h2>
        <p>
        {cabin.description }
        </p>
        <span className="absolute mt-6 mr-6 flex p-2 rounded-[0.6rem] flex-col justify-center items-center w-fit top-0 right-0 bg-secondary-color text-black montserrat">
          <p className="w-fit text-[1.1rem]">From</p>
          <h2 className="text-[1.5rem] bottom-1 right-0 font-semibold w-fit">
            ${cabin.price}
          </h2>
        </span>
        <button 
          className="justify-self-end bottom-0 text-[1.2rem] bg-secondary-color text-background-dark h-12 rounded-[0.6rem] font-semibold mt-10"
          onClick={handleOnClick}
        >
          Reserva
        </button>
      </div>
      <aside className="relative rounded-[1.2rem] grid grid-cols-2 gap-y-6 gap-x-5">
        <ImageCard src="./img/displaycard1.png" />
        <ImageCard src="./img/displaycard2.png" />
        <ImageCard src="./img/displaycard3.png" />
        <ImageCard src="./img/displaycard4.png" />
      </aside>
    </section>
  );
}


export default DisplayCard;