import React from "react";

function Card({ title, children, price, image }) {
  return (
    <div className="card text-light-text h-[32rem] rounded-[0.7rem] w-fit flex justify-end flex-col p-5">
      <section className="mb-4 relative">
        <h3 className="text-[1.8rem]">{title}</h3>
        <p className="text-[1.2rem]">{children}</p>
        <h2 className="text-[1.8rem] absolute bottom-1 right-0 font-semibold">
          $ {price}
        </h2>
      </section>
      <button className="text-[1.2rem] bg-secondary-color text-background-dark h-12 w-[18.3rem] rounded-[0.6rem] font-semibold">
        Reserva
      </button>
    </div>
  );
}

export default Card;
