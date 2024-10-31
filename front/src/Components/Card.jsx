import React, { useMemo, useState } from "react";

function Card({ title, children, price, images }) {
 
  const styles = useMemo(()=>{
    return images ? {
      backgroundImage: `linear-gradient(0deg, rgba(12, 17, 35, 0.85) 0%, rgba(0, 0, 0, 0) 80%), url(${images[1].url})`,
    } : {}
  }, [images]);
  

  return (
    <div 
      className=" relative card h-[32rem] rounded-[0.7rem] w-fit flex justify-end flex-col p-5 bg-cover bg-center bg-no-repeat transition-all  "
      style={images && styles}
    >
      <img src={images &&images[0].url} alt="cabaña" className="w-full h-full absolute top-0 left-0 object-cover hover:opacity-0 hover:scale-0 transition-all duration-300 " />
      <section className="mb-4 relative">
        <h3 className="text-[1.8rem] font-semibold montserrat">{title}</h3>
        <p className="text-[1.2rem]">{children}</p>
        <h2 className="text-[1.8rem] absolute bottom-1 right-0 font-semibold montserrat">
          $ {price}
        </h2>
      </section>
      <button className="text-[1.2rem] bg-secondary-color text-background-dark h-12 w-[18.3rem] rounded-[0.6rem] font-medium">
        Reserva
      </button>
    </div>
  );
}

export default Card;
