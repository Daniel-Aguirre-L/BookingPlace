import React from "react";

const styles = {
  background: 'linear-gradient(0deg, rgba(12, 17, 35, 1) 0%, rgba(0, 0, 0, 0) 30%), url("./img/landing.png")',
  backgroundSize: 'cover'
};

function Landing() {
  return (
    <section className="bg-background-dark w-full max-md:mt-[-7rem] mt-[-6rem] h-[100vh] max-h-[60rem] flex flex-col justify-center montserrat " style={styles} >
      <h1 className="pageMargin text-primary-color font-bold text-[3.3rem] w-fit leading-[4rem] max-sm:text-[2.5rem]">
        Escapa a la Naturaleza y <br />
        Reserva tu Cabaña ideal
      </h1>
      <p className="pageMargin mt-4 text-light-text text-[1.5rem] w-fit">
        Tu refugio natural, a un clic de distancia.
      </p>
      <div className="pageMargin relative rounded-md bg-white flex text-[1.4rem] items-center mt-[2rem] h-[3rem] max-w-[25rem] overflow-hidden">
        <input type="text" className="w-full bg-transparent ml-6 text-dark-text h-[50%] outline-none  " placeholder="Search"/>
        <button className="bg-primary-color flex justify-center items-center h-full w-[7rem]"><img src="./Icons/search.svg" alt="" /></button>
      </div>
    </section>
  );
}

export default Landing;
