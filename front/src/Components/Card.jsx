import React from "react";

function Card() {
  return (
    <div className="card text-light-text h-[25rem] rounded-[0.7rem] w-fit flex justify-end flex-col p-5">
      <section className="mb-4 relative">
        <h3 className="text-[1.5rem]">Cottage</h3>
        <p className="text-[1rem]">An amazing journey</p>
        <h2 className="text-[1.4rem] absolute bottom-1 right-0 font-semibold">
          $ 700
        </h2>
      </section>
      <button className="bg-secondary-color text-background-dark h-10 w-[16rem] rounded-[0.6rem] font-semibold">
        Reserva
      </button>
    </div>
  );
}

export default Card;
