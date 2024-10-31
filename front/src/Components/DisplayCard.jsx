import React from "react";

function ImageCard({ src }) {
  return (
    <img
      className="h-fit w-fit bg-slate-500 rounded-[0.7rem] border-[3px] border-secondary-color"
      src={src}
    />
  );
}

function DisplayCard() {
  return (
    <section className="pageMargin relative grid grid-cols-2 gap-6 mb-10">
      <div className="relative bg-primary-color rounded-[1.2rem] p-8 flex flex-col">
        <h2 className="text-[2.5rem] font-bold mb-10">Snow Cottage</h2>
        <p>
          Traveling is a unique experience as it's the best way to unplug from
          the pushes and pulls of daily life. It helps us to forget about our
          problems, frustrations, and fears at home. During our journey, we
          experience life in different ways. We explore new places, cultures,
          cuisines, traditions, and ways of living.
        </p>
        <span className="absolute mt-6 mr-6 flex p-2 rounded-[0.6rem] flex-col justify-center items-center w-fit top-0 right-0 bg-secondary-color text-black">
          <p className="w-fit text-[1.1rem]">From</p>
          <h2 className="text-[1.5rem] bottom-1 right-0 font-semibold w-fit">
            $700
          </h2>
        </span>
        <button className="bottom-0 text-[1.2rem] bg-secondary-color text-background-dark h-12 rounded-[0.6rem] font-semibold mt-10">
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